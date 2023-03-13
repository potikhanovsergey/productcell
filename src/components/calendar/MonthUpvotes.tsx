import { observer, useComputed } from "@legendapp/state/react";
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
    return Array.from(Array(days)).map((_, i) => i + 1);
  });
  const upvotes = useComputed(() => {
    return labels.map((l) => Math.floor(Math.random() * (1500 - 0 + 1) + 0));
  });
  const comments = useComputed(() => {
    return labels.map((l) => Math.floor(Math.random() * (300 - 0 + 1) + 0));
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
              text: "Chart.js Line Chart - Cubic interpolation mode",
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
          labels: labels.get(),
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
