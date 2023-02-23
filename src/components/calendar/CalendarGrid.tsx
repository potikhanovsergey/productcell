import { Group, Stack, StackProps, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo } from "react";
import Day from "./Day";
import TooltipLabel from "./TooltipLabel";

const months = 36;

export const monthsArray = Array(months).fill(null);
export const daysArray = Array(31).fill(null);

const dataMock = {
  id: "373367",
  name: "Rizz!",
  votesCount: 751,
  thumbnail: {
    url: "https://ph-files.imgix.net/0c89d100-5f55-4785-925b-a4a563ec54b3.png?auto=format",
  },
  tagline: "The world's most powerful AI, built into your keyboard",
  url: "https://www.producthunt.com/posts/rizz?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+PH+API+Explorer+%28ID%3A+9162%29",
  topics: {
    nodes: [
      {
        name: "Productivity",
      },
      {
        name: "Custom Keyboards",
      },
      {
        name: "Artificial Intelligence",
      },
    ],
  },
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
  return (
    <Tooltip.Floating
      multiline
      position="top"
      offset={24}
      sx={{
        maxWidth: 240,
      }}
      label={
        <TooltipLabel
          tagline={dataMock.tagline}
          thumbnailUrl={dataMock.thumbnail.url}
          topics={dataMock.topics.nodes.map((n) => n.name)}
          name={dataMock.name}
          votesCount={dataMock.votesCount}
        />
      }
      color="blue"
    >
      <Stack spacing={4} {...props}>
        {rows.map((row, rowIndex) => (
          <Group
            grow
            sx={{ flexDirection: "row-reverse" }}
            noWrap
            key={rowIndex}
            spacing={4}
          >
            {daysArray.map((day, dayIndex) =>
              dayIndex < row.length ? (
                <Day
                  url={dataMock.url}
                  key={dayIndex}
                  index={
                    rowIndex === 0
                      ? dayIndex
                      : rows
                          .slice(0, rowIndex)
                          .reduce((acc, curr) => acc + curr.length, 0) +
                        dayIndex
                  }
                />
              ) : (
                <span key={dayIndex}></span>
              )
            )}
          </Group>
        ))}
      </Stack>
    </Tooltip.Floating>
  );
};

export default CalendarGrid;
