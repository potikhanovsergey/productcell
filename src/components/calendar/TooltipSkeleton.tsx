import { hoveredCellDate, hoveredRowCell } from "@/store/LegendStore";
import { observer, Show } from "@legendapp/state/react";
import {
  Group,
  Badge,
  Stack,
  Skeleton,
  Text,
  useMantineTheme,
  Loader,
  Progress,
  Box,
} from "@mantine/core";
import { IconClick } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import CommentIcon from "../producthuntIcons/CommentIcon";
import UpvoteIcon from "../producthuntIcons/UpvoteIcon";
import HoveredCellDate from "./HoveredCellDate";

const ProgressBar = observer(() => {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompleted((prev) => prev + 20);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  hoveredRowCell.onChange(() => setCompleted(0));

  return <Progress size="sm" color="orange" value={completed} />;
});

const TooltipSkeleton = () => {
  const theme = useMantineTheme();
  const date = hoveredCellDate.get();
  return (
    <>
      <Group noWrap w="100%" align="flex-start">
        <Skeleton width={48} miw={48} height={48} radius="sm" />
        <Stack spacing={4} w="100%">
          <Skeleton width="100%" height={12} />
          <Group spacing="xs" w="100%" noWrap>
            <Group spacing={4} noWrap>
              <UpvoteIcon w={12} h={12} c={theme.colors.green[5]} />
              <Skeleton width={16} height={12} />
            </Group>
            <Group spacing={4} noWrap>
              <CommentIcon c={theme.colors.gray[3]} />
              <Skeleton width={16} height={12} />
            </Group>
          </Group>
        </Stack>
      </Group>
      <Skeleton width="100%" height={24} />
      <Group spacing={4}>
        {[0, 1, 2].map((topic) => (
          <Skeleton key={topic} width={48} height={8} />
        ))}
      </Group>
      <div>
        <Show if={date}>
          <HoveredCellDate />
        </Show>
        <Text color="dimmed" size="xs" component={Group} noWrap spacing={4}>
          <Box mt={-2} component={IconClick} size={16} /> Click to load the day
          info
        </Text>
      </div>
    </>
  );
};

export default observer(TooltipSkeleton);
