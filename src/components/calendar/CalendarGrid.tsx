import { Box, BoxProps, Tooltip } from "@mantine/core";
import { observer, useComputed } from "@legendapp/state/react";
import { drawerDetails, hoveredRowCell } from "@/store/LegendStore";
import CalendarRow from "./CalendarRow";
import { rows } from "@/pages/_app";
import dynamic from "next/dynamic";

const TooltipLabel = dynamic(() => import("./TooltipLabel"), { ssr: false });

const CalendarGrid = (props: BoxProps) => {
  const tooltipVisible = useComputed(() => {
    return hoveredRowCell.get() !== null && !drawerDetails.opened.get();
  });
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
      <Box display="grid" {...props} sx={{ gridAutoRows: "1fr" }}>
        {rows.map((cells, rowIndex) => (
          <CalendarRow key={rowIndex} rowIndex={rowIndex} cells={cells} />
        ))}
      </Box>
    </Tooltip.Floating>
  );
};

export default observer(CalendarGrid);
