import { ProductHuntApiResponse } from "@/store/types";
import { Group, Text, useMantineTheme } from "@mantine/core";
import CommentIcon from "../producthuntIcons/CommentIcon";
import UpvoteIcon from "../producthuntIcons/UpvoteIcon";

const Stats = ({ product }: { product: ProductHuntApiResponse }) => {
  const theme = useMantineTheme();
  return (
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
  );
};

export default Stats;
