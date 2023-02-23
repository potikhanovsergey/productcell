import { AppStore } from "@/store/AppStore";
import {
  Group,
  Badge,
  Stack,
  Skeleton,
  Text,
  useMantineTheme,
  Loader,
  Progress,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import CommentIcon from "../producthuntIcons/CommentIcon";
import UpvoteIcon from "../producthuntIcons/UpvoteIcon";

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

  useEffect(() => {
    setCompleted(0);
  }, [AppStore.hoveredRowCell]);

  return <Progress size="sm" color="orange" value={completed} />;
});

const TooltipSkeleton = () => {
  const theme = useMantineTheme();

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
        {AppStore.hoveredRowCell !== null && AppStore.hoveredRow !== null && (
          <Text color="dimmed" size="xs">
            {AppStore.hoveredCellDate}
          </Text>
        )}
        <Group noWrap position="apart" mb={4}>
          <Text color="dimmed" size="xs">
            Keep hovering to load product
          </Text>
          <Loader color="orange" size="xs" />
        </Group>

        {AppStore.hoveredRowCell !== null && <ProgressBar />}
      </div>
    </>
  );
};

export default observer(TooltipSkeleton);
