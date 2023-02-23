import { AppStore } from "@/store/AppStore";
import { SimpleGrid, Stack, StackProps, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import Day from "./Day";
import TooltipLabel from "./TooltipLabel";

const months = 36;

export const monthsArray = Array(months).fill(null);
export const daysArray = Array(31).fill(null);

const dataMock = {
  id: "375220",
  name: "HyperSwitch",
  votesCount: 2229,
  thumbnail: {
    url: "https://ph-files.imgix.net/77190f49-18e0-4d2a-bb14-0f0e1ba9a4bb.png?auto=format",
  },
  tagline: "Fast, reliable, and affordable open source payments switch",
  url: "https://www.producthunt.com/posts/hyperswitch-2?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+PH+API+Explorer+%28ID%3A+9162%29",
  topics: {
    nodes: [
      {
        name: "API",
      },
      {
        name: "Open Source",
      },
      {
        name: "User Experience",
      },
      {
        name: "Fintech",
      },
      {
        name: "Payments",
      },
      {
        name: "Developer Tools",
      },
      {
        name: "GitHub",
      },
      {
        name: "Tech",
      },
      {
        name: "SDK",
      },
    ],
  },
  commentsCount: 449,
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
      label={<TooltipLabel />}
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
                rowIndex={rowIndex}
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
