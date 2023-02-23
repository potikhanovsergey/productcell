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
import CommentIcon from "../producthuntIcons/CommentIcon";
import UpvoteIcon from "../producthuntIcons/UpvoteIcon";
import TooltipSkeleton from "./TooltipSkeleton";
import TooltipWrapper from "./TooltipWrapper";

const TooltipLabel = () => {
  const theme = useMantineTheme();
  const produchHashKey = `${AppStore.hoveredRow} ${AppStore.hoveredRowCell}`;

  return (
    <TooltipWrapper>
      {!AppStore.productsHash[produchHashKey] ? (
        <TooltipSkeleton />
      ) : (
        <>
          <Group noWrap w="100%" align="flex-start">
            <Image
              radius="sm"
              width={48}
              src={AppStore.productsHash[produchHashKey].thumbnail.url}
              alt={AppStore.productsHash[produchHashKey].name}
            />
            <Stack spacing={0}>
              <Text weight="bold">
                {AppStore.productsHash[produchHashKey].name}
              </Text>
              <Group spacing="xs" w="100%" noWrap>
                <Group spacing={4} noWrap>
                  <UpvoteIcon w={12} h={12} c={theme.colors.green[5]} />
                  <Text size="xs">
                    {AppStore.productsHash[produchHashKey].votesCount}
                  </Text>
                </Group>
                <Group spacing={4} noWrap>
                  <CommentIcon c={theme.colors.gray[3]} />
                  <Text size="xs">
                    {AppStore.productsHash[produchHashKey].commentsCount}
                  </Text>
                </Group>
              </Group>
            </Stack>
          </Group>
          <Text size="xs">{AppStore.productsHash[produchHashKey].tagline}</Text>
          <Group spacing={4}>
            {AppStore.productsHash[produchHashKey].topics.nodes.map((topic) => (
              <Badge
                color="orange"
                variant="outline"
                key={topic.name}
                size="xs"
                sx={{ fontSize: 8 }}
              >
                {topic.name}
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
