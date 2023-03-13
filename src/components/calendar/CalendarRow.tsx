import { observer } from "@legendapp/state/react";
import {
  ActionIcon,
  Box,
  createStyles,
  getStylesRef,
  Group,
  Tooltip,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconTimeline } from "@tabler/icons-react";
import Cell from "./Cell";
import PulsatingCircle from "./PulsatingCircle";
import StatsButton from "./StatsButton";

const useStyles = createStyles((theme) => ({
  wrapper: {
    [`&:hover .${getStylesRef("stats")}`]: {
      opacity: 1,
    },
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(31, minmax(25px, auto))",
    position: "relative",
    flex: 1,
  },
  stats: {
    ref: getStylesRef("stats"),
    opacity: 0,
    width: 24,
    height: 24,
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
    <Group noWrap spacing={4} className={classes.wrapper}>
      <Box className={classes.row} key={rowIndex} pos="relative">
        {cells.map((_, cellIndex) => (
          <Cell rowIndex={rowIndex} cellIndex={cellIndex} key={cellIndex} />
        ))}
        {rowIndex === 0 && <PulsatingCircle />}
      </Box>
      <StatsButton rowIndex={rowIndex} />
    </Group>
  );
};

export default observer(CalendarRow);
