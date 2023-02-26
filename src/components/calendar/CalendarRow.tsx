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
import { modals } from "@mantine/modals";

const useStyles = createStyles((theme) => ({
  row: {
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
  const openStatsModal = () => {
    modals.open({
      title: "Month's Statistics",
      centered: true,
      returnFocus: false,
      lockScroll: false,
      size: "xl",
      children: <>...</>,
    });
  };
  return (
    <SimpleGrid
      className={classes.row}
      cols={31}
      key={rowIndex}
      spacing={0}
      pos="relative"
    >
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
      <Tooltip label="See month's stats">
        <ActionIcon
          onClick={openStatsModal}
          className={classes.stats}
          size="sm"
          variant="transparent"
          pos="absolute"
          right={-28}
        >
          <IconTimeline />
        </ActionIcon>
      </Tooltip>
    </SimpleGrid>
  );
};

export default observer(CalendarRow);
