import { hoveredProduct } from "@/store/LegendStore";
import { Group, Box, Stack, Image, Text, useMantineTheme } from "@mantine/core";
import { IconClick } from "@tabler/icons-react";
import { observer, Show } from "@legendapp/state/react";
import TooltipBadges from "./TooltipBadges";
import Stats from "./Stats";
import dynamic from "next/dynamic";

const HoveredCellDate = dynamic(() => import("./HoveredCellDate"), {
  ssr: false,
});

const TooltipBody = () => {
  const theme = useMantineTheme();
  const product = hoveredProduct.get();

  return (
    <>
      <Group noWrap w="100%" align="flex-start">
        <Box sx={{ borderRadius: theme.radius.sm }}>
          <Image
            radius="sm"
            width={48}
            height={48}
            src={`${product.thumbnail.url}&width=100`}
            alt={product.name}
          />
        </Box>

        <Stack spacing={0}>
          <Text weight="bold">{product.name}</Text>
          <Stats product={product} />
        </Stack>
      </Group>
      <Text size="xs">{product.tagline}</Text>
      <Group spacing={4}>
        <TooltipBadges />
      </Group>
      <div>
        <Show if={product}>{() => <HoveredCellDate />}</Show>
        <Text color="dimmed" size="xs" component={Group} noWrap spacing={4}>
          <Box mt={-2} component={IconClick} size={16} />
          Click on the cell to see the details
        </Text>
      </div>
    </>
  );
};

export default observer(TooltipBody);
