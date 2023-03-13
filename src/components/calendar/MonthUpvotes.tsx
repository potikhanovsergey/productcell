import { observer, useComputed, useObserve } from "@legendapp/state/react";
import { Chart, ChartProps } from "react-chartjs-2";
import dayjs from "dayjs";
import { primaryColor } from "@/MantineTheme";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, DEFAULT_THEME } from "@mantine/core";
import { filterBy, monthProductsHash } from "@/store/LegendStore";
import { useEffect } from "react";
import { fetchProductsAndSet } from "@/queries/getProducts";
import { MonthProductsApiResponse } from "@/store/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface MonthUpvotesProps {
  rowIndex: number;
}

const data = {
  datasets: [
    {
      label: "Upvotes",
      fill: false,
      tension: 0.4,
      backgroundColor: primaryColor,
      borderColor: primaryColor,
    },
    {
      label: "Comments",
      fill: false,
      tension: 0.4,
      backgroundColor: DEFAULT_THEME.colors.blue[5],
      borderColor: DEFAULT_THEME.colors.blue[5],
    },
  ],
};

const config: Omit<ChartProps, "data"> = {
  type: "line",
  options: {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Upvotes",
        },
        suggestedMin: 0,
        suggestedMax: 200,
      },
    },
  },
};

const MonthUpvotes = ({ rowIndex }: MonthUpvotesProps) => {
  const month = dayjs().startOf("month").subtract(rowIndex, "month");
  const labels = useComputed(() => {
    const curr = dayjs();
    const days = month.isSame(curr, "month")
      ? curr.date()
      : month.daysInMonth();
    return Array.from(Array(days)).map((_, i) => ({
      dayIndex: i,
      label: month.add(i, "day").format("dddd D"),
    }));
  });
  const stats = useComputed(
    () => monthProductsHash.get()?.[filterBy.get()]?.[rowIndex]
  );

  const grouppedByDay = useComputed(() => {
    const statsValue = stats.get();
    if (statsValue) {
      const hash = statsValue.posts.reduce(
        (acc: { [key: string]: MonthProductsApiResponse[] }, e) => {
          const dayIndex = dayjs(e.featuredAt).date() - 1;
          if (!acc[dayIndex]) acc[dayIndex] = [];
          acc[dayIndex].push(e);
          return acc;
        },
        {}
      );
      const output = labels.get().map((day) => hash[day.dayIndex] || null);
      return output;
    } else return [];
  });

  const upvotes = useComputed(() => {
    return grouppedByDay
      .get()
      .map((day) =>
        day ? day.reduce((acc, item) => acc + item.votesCount, 0) : null
      );
  });
  const comments = useComputed(() => {
    return grouppedByDay
      .get()
      .map((day) =>
        day ? day.reduce((acc, item) => acc + item.commentsCount, 0) : null
      );
  });

  useEffect(() => {
    const getData = async () => {
      let endCursor: string | null = null;
      let hasNextPage = true;
      for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]) {
        if (hasNextPage) {
          const response:
            | {
                endCursor: string | null;
                hasNextPage: boolean;
              }
            | undefined = await fetchProductsAndSet({
            index: rowIndex.toString(),
            date: month,
            endCursor,
          });
          if (response?.endCursor) endCursor = response.endCursor;
          if (typeof response?.hasNextPage === "boolean") {
            hasNextPage = response.hasNextPage;
          }
        }
      }
    };

    if (!stats.get()) {
      getData();
    }
  }, []);

  useObserve(() => {
    console.log("Groupped by day", grouppedByDay.get());
  });

  return (
    <Box
      miw={600}
      w="100%"
      sx={{ canvas: { width: "100% !important", height: "auto !important" } }}
    >
      <Chart
        {...config}
        options={{
          ...config.options,
          plugins: {
            title: {
              display: true,
              text: `Product Hunt ${month.format("MMMM")} stats based on ${
                grouppedByDay.get().flat().length
              } best products`,
            },
            tooltip: {
              callbacks: {
                title: (tooltipItems) => {
                  const dayNumber = Number(tooltipItems[0].parsed.x) as number;
                  const date = month.add(dayNumber, "day");
                  return date.format("MMMM D, dddd");
                },
              },
            },
          },
          scales: {
            y: {
              display: true,
              title: {
                display: true,
                text: "Upvotes",
              },
              suggestedMin: 0,
              suggestedMax: 600,
            },
            x: {
              display: true,
              title: {
                display: true,
                text: month.format("MMMM"),
              },
            },
          },
        }}
        data={{
          labels: labels.get().map((l) => l.label),
          datasets: [
            {
              ...data.datasets[0],
              data: upvotes.get(),
            },
            {
              ...data.datasets[1],
              data: comments.get(),
            },
          ],
        }}
      />
    </Box>
  );
};

export default observer(MonthUpvotes);
