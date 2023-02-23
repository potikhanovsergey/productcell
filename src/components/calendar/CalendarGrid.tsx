import { AppStore } from "@/store/AppStore";
import { Group, SimpleGrid, Stack, StackProps, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import Day from "./Day";
import TooltipLabel from "./TooltipLabel";

const months = 36;

export const monthsArray = Array(months).fill(null);
export const daysArray = Array(31).fill(null);

const dataMock = {
  id: "376395",
  name: "First 100 Users V2",
  votesCount: 747,
  thumbnail: {
    url: "https://ph-files.imgix.net/b5cd07be-173c-4266-8b8d-700d29166ea0.gif?auto=format",
  },
  tagline: "Step-by-step marketing ideas for your first 100 users",
  url: "https://www.producthunt.com/posts/first-100-users-v2?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+PH+API+Explorer+%28ID%3A+9162%29",
  topics: {
    nodes: [
      {
        name: "Marketing",
      },
      {
        name: "Maker Tools",
      },
      {
        name: "Growth Hacks ",
      },
    ],
  },
  commentsCount: 135,
};

const CalendarGrid = (props: StackProps) => {
  const rows = useMemo(() => {
    const output: number[][] = [];
    for (let i = 0; i < months; i++) {
      let daysInMonth = dayjs()
        .startOf("month")
        .subtract(i, "month")
        .daysInMonth();

      if (i === 0) {
        daysInMonth = dayjs().date() - 1;
      }
      const monthArray = Array.from(Array(daysInMonth).keys());
      output.push(monthArray);
    }
    return output;
  }, []);

  const onRowMouseEnter = (index: number) => {
    AppStore.setHoveredRow(index);
  };
  return (
    <Tooltip.Floating
      multiline
      radius="sm"
      offset={32}
      width={240}
      sx={{
        maxWidth: 240,
        display:
          typeof AppStore.hoveredRowCell !== "number" ||
          typeof AppStore.hoveredRow !== "number"
            ? "none !important"
            : undefined,
      }}
      label={
        <TooltipLabel
          tagline={dataMock.tagline}
          thumbnailUrl={dataMock.thumbnail.url}
          topics={dataMock.topics.nodes.map((n) => n.name)}
          name={dataMock.name}
          votesCount={dataMock.votesCount}
          commentsCount={dataMock.commentsCount}
        />
      }
      color="blue"
    >
      <Stack spacing={0} {...props}>
        {rows.map((row, rowIndex) => (
          <SimpleGrid
            onMouseEnter={() => onRowMouseEnter(rowIndex)}
            cols={31}
            key={rowIndex}
            spacing={0}
          >
            {row.map((day, dayIndex) => (
              <Day
                dayIndex={dayIndex}
                url={dataMock.url}
                key={dayIndex}
                index={
                  rowIndex === 0
                    ? dayIndex
                    : rows
                        .slice(0, rowIndex)
                        .reduce((acc, curr) => acc + curr.length, 0) + dayIndex
                }
              />
            ))}
          </SimpleGrid>
        ))}
      </Stack>
    </Tooltip.Floating>
  );
};

export default observer(CalendarGrid);
