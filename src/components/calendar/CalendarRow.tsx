import { hoveredRow } from "@/store/LegendStore";
import { Computed, observer, Show } from "@legendapp/state/react";
import { SimpleGrid } from "@mantine/core";
import Cell from "./Cell";
import PulsatingCircle from "./PulsatingCircle";

const CalendarRow = ({
  rowIndex,
  cells,
}: {
  rowIndex: number;
  cells: number[];
}) => {
  return (
    <SimpleGrid cols={31} key={rowIndex} spacing={0}>
      <Computed>
        {() =>
          cells.map((_, cellIndex) => (
            <Cell rowIndex={rowIndex} cellIndex={cellIndex} key={cellIndex} />
          ))
        }
      </Computed>
      <Show if={rowIndex === 0}>
        <PulsatingCircle />
      </Show>
    </SimpleGrid>
  );
};

export default observer(CalendarRow);
