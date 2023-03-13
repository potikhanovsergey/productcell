import {
  createStyles,
  getStylesRef,
  Tooltip as MantineTooltip,
  ActionIcon,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconTimeline } from "@tabler/icons-react";

import { observer } from "@legendapp/state/react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@mantine/hooks";

const MonthUpvotes = dynamic(() => import("./MonthUpvotes"));
const useStyles = createStyles((theme) => ({
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

interface StatsButtonProps {
  rowIndex: number;
}

const StatsButton = ({ rowIndex }: StatsButtonProps) => {
  const isMobile = useMediaQuery("(max-width: 50em)");

  const showMonthStats = () =>
    openModal({
      children: <MonthUpvotes rowIndex={rowIndex} />,
      title: "hi",
      size: "xl",
      returnFocus: false,
      fullScreen: isMobile,
    });
  const { classes } = useStyles();

  return (
    <MantineTooltip withinPortal label="Show month's stats">
      <ActionIcon
        onClick={showMonthStats}
        variant="transparent"
        className={classes.stats}
      >
        <IconTimeline />
      </ActionIcon>
    </MantineTooltip>
  );
};

export default observer(StatsButton);
