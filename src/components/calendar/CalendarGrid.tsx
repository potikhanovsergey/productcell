import { Stack, StackProps, Tooltip } from "@mantine/core";
import TooltipLabel from "./TooltipLabel";
import { Computed, observer, useComputed } from "@legendapp/state/react";
import { hoveredRowCell } from "@/store/LegendStore";
import CalendarRow from "./CalendarRow";
import { rows } from "@/pages/_app";

const CalendarGrid = (props: StackProps) => {
  const visible = useComputed(() => hoveredRowCell.get() !== null);

  return (
    <Tooltip.Floating
      multiline
      radius="sm"
      offset={32}
      width={240}
      sx={{
        maxWidth: 240,
        display: visible.get() ? undefined : "none !important",
      }}
      label={<TooltipLabel />}
      color="blue"
    >
      <Stack spacing={0} {...props}>
        <Computed>
          {() =>
            rows.map((cells, rowIndex) => (
              <CalendarRow key={rowIndex} rowIndex={rowIndex} cells={cells} />
            ))
          }
        </Computed>
      </Stack>
    </Tooltip.Floating>
  );
};

export default observer(CalendarGrid);
