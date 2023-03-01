import { observer, Show } from "@legendapp/state/react";
import { Box, createStyles, getStylesRef } from "@mantine/core";
import Cell from "./Cell";
import PulsatingCircle from "./PulsatingCircle";

const useStyles = createStyles((theme) => ({
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(31, minmax(25px, auto))",
    [`&:hover .${getStylesRef("stats")}`]: {
      opacity: 1,
    },
  },
  stats: {
    ref: getStylesRef("stats"),
    opacity: 0,
    "&:hover, &:focus": {
      color: theme.colors[theme.primaryColor][5],
      opacity: 1,
    },
  },
}));

const CalendarRow = ({
  rowIndex,
  cells,
}: {
  rowIndex: number;
  cells: number[];
}) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.row} key={rowIndex} pos="relative">
      {cells.map((_, cellIndex) => (
        <Cell rowIndex={rowIndex} cellIndex={cellIndex} key={cellIndex} />
      ))}
      {rowIndex === 0 && <PulsatingCircle />}
    </Box>
  );
};

export default observer(CalendarRow);
