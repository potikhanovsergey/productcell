import { Box, BoxProps, Group, Stack, Tooltip } from "@mantine/core";
import { observer, Show, useComputed } from "@legendapp/state/react";
import { drawerDetails, hoveredRowCell, mode } from "@/store/LegendStore";
import CalendarRow from "./CalendarRow";
import { currentYearWeeksArray, rows, weeksArray, years, yearsArray } from "@/pages/_app";
import dynamic from "next/dynamic";

const TooltipLabel = dynamic(() => import("./TooltipLabel"), { ssr: false });

const CalendarGrid = (props: BoxProps) => {
  const tooltipVisible = useComputed(() => {
    return hoveredRowCell.get() !== null && !drawerDetails.opened.get();
  });

  const isDaysMode = useComputed(() => {
    return mode.get() === "days"
  })
  return (
    <Tooltip.Floating
      multiline
      radius="sm"
      offset={32}
      width={240}
      sx={{
        maxWidth: 240,
        display: tooltipVisible.get() ? undefined : "none !important",
      }}
      label={<TooltipLabel />}
      color="blue"
      position="top"
    >
      <Group noWrap spacing={4}>
        <Box display="grid" {...props} sx={{ gridAutoRows: "1fr" }}>
          <Show if={isDaysMode} else={      [currentYearWeeksArray, ...yearsArray].map((cells, rowIndex) => (
            <CalendarRow key={rowIndex} rowIndex={rowIndex} cells={cells} />
          ))}>
          {rows.map((cells, rowIndex) => (
            <CalendarRow key={rowIndex} rowIndex={rowIndex} cells={cells} />
          ))}
          </Show>

        </Box>
      </Group>

    </Tooltip.Floating>
  );
};

export default observer(CalendarGrid);
