import { AppStore } from "@/store/AppStore";
import {
  Group,
  Badge,
  Image,
  Stack,
  Text,
  useMantineTheme,
  Box,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { TriangleFill } from "react-bootstrap-icons";
import CommentIcon from "../producthuntIcons/CommentIcon";
import TooltipSkeleton from "./TooltipSkeleton";
import TooltipWrapper from "./TooltipWrapper";

interface TooltipLabelProps {
  thumbnailUrl: string;
  name: string;
  votesCount: number;
  commentsCount: number;
  tagline: string;
  topics: string[];
}

const TooltipLabel = ({
  thumbnailUrl,
  name,
  votesCount,
  commentsCount,
  tagline,
  topics,
}: TooltipLabelProps) => {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);

  return (
    <TooltipWrapper>
      {loading ? (
        <TooltipSkeleton />
      ) : (
        <>
          <Group noWrap w="100%" align="flex-start">
            <Image radius="sm" width={48} src={thumbnailUrl} alt={name} />
            <Stack spacing={0}>
              <Text weight="bold">{name}</Text>
              <Group spacing="xs" w="100%" noWrap>
                <Group spacing={4} noWrap>
                  <TriangleFill size={12} color={theme.other.primaryColor} />
                  <Text size="xs">{votesCount}</Text>
                </Group>
                <Group spacing={4} noWrap>
                  <CommentIcon c={theme.colors.gray[3]} />
                  <Text size="xs">{commentsCount}</Text>
                </Group>
              </Group>
            </Stack>
          </Group>
          <Text size="xs">{tagline}</Text>
          <Group spacing={4}>
            {topics.map((topic) => (
              <Badge
                color="orange"
                variant="outline"
                key={topic}
                size="xs"
                sx={{ fontSize: 8 }}
              >
                {topic}
              </Badge>
            ))}
          </Group>
          <div>
            {AppStore.hoveredRowCell !== null &&
              AppStore.hoveredRow !== null && (
                <Text color="dimmed" size="xs">
                  {AppStore.hoveredCellDate}
                </Text>
              )}
            <Text color="dimmed" size="xs">
              <Box component={IconExternalLink} mb={-1} size={12} /> Click to
              open launch page
            </Text>
          </div>
        </>
      )}
    </TooltipWrapper>
  );
};

export default observer(TooltipLabel);
