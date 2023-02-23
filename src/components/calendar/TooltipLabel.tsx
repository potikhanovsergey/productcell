import { Box, Group, Loader, Badge, Image, Stack, Text } from "@mantine/core";

interface TooltipLabelProps {
  thumbnailUrl: string;
  name: string;
  votesCount: number;
  tagline: string;
  topics: string[];
}

const TooltipLabel = ({
  thumbnailUrl,
  name,
  votesCount,
  tagline,
  topics,
}: TooltipLabelProps) => {
  return (
    <Stack spacing={4}>
      <Group noWrap w="100%" align="flex-start">
        <Image radius="sm" width={48} src={thumbnailUrl} alt={name} />
        <Stack spacing={0}>
          <Text weight="bold">{name}</Text>
          <Text>{votesCount}</Text>
        </Stack>
      </Group>
      <Text size="xs">{tagline}</Text>
      <Group spacing={4}>
        {topics.map((topic) => (
          <Badge
            color="orange"
            variant="filled"
            key={topic}
            size="xs"
            sx={{ fontSize: 8 }}
          >
            {topic}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
};

export default TooltipLabel;
