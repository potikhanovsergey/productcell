import { hoveredProduct, hoveredCellDate } from "@/store/LegendStore";
import { Group, Box, Stack, Badge, Text, useMantineTheme } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import CommentIcon from "../producthuntIcons/CommentIcon";
import UpvoteIcon from "../producthuntIcons/UpvoteIcon";
import Image from "next/image";
import { observer, Show } from "@legendapp/state/react";
import TooltipBadges from "./TooltipBadges";
import HoveredCellDate from "./HoveredCellDate";

const TooltipBody = () => {
  const theme = useMantineTheme();
  const product = hoveredProduct.get();

  return (
    <>
      <Group noWrap w="100%" align="flex-start">
        <Box sx={{ borderRadius: theme.radius.sm }}>
          <Image
            width={48}
            height={48}
            src={`${product.thumbnail.url}&width=100`}
            alt={product.name}
          />
        </Box>

        <Stack spacing={0}>
          <Text weight="bold">{product.name}</Text>
          <Group spacing="xs" w="100%" noWrap>
            <Group spacing={4} noWrap>
              <UpvoteIcon w={12} h={12} c={theme.colors.green[5]} />
              <Text size="xs">{product.votesCount}</Text>
            </Group>
            <Group spacing={4} noWrap>
              <CommentIcon c={theme.colors.gray[3]} />
              <Text size="xs">{product.commentsCount}</Text>
            </Group>
          </Group>
        </Stack>
      </Group>
      <Text size="xs">{product.tagline}</Text>
      <Group spacing={4}>
        <TooltipBadges />
      </Group>
      <div>
        <Show if={product}>
          <HoveredCellDate />
        </Show>
        <Text color="dimmed" size="xs">
          <Box component={IconExternalLink} mb={-1} size={12} /> Click to open
          launch page
        </Text>
      </div>
    </>
  );
};

export default observer(TooltipBody);
