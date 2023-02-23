import { AppStore } from "@/store/AppStore";
import {
  Group,
  Badge,
  Stack,
  Skeleton,
  Text,
  useMantineTheme,
  Loader,
} from "@mantine/core";
import { observer } from "mobx-react-lite";
import { TriangleFill } from "react-bootstrap-icons";
import CommentIcon from "../producthuntIcons/CommentIcon";

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
              <TriangleFill size={12} color={theme.other.primaryColor} />
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
      {AppStore.hoveredRowCell !== null && AppStore.hoveredRow !== null && (
        <Group noWrap position="apart">
          <Text color="dimmed" size="xs">
            {AppStore.hoveredCellDate}
          </Text>
          <Loader color="orange" size="xs" />
        </Group>
      )}
    </>
  );
};

export default observer(TooltipSkeleton);
