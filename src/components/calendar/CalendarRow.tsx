import { Computed, observer, Show } from "@legendapp/state/react";
import {
  ActionIcon,
  Box,
  createStyles,
  SimpleGrid,
  getStylesRef,
  useMantineTheme,
  Tooltip,
  Button,
  TextInput,
} from "@mantine/core";
import { IconTimeline } from "@tabler/icons-react";
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
    </Box>
  );
};

export default observer(CalendarRow);
