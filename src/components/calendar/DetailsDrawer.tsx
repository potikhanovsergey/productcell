import { drawerDetails } from "@/store/LegendStore";
import { observer, Show } from "@legendapp/state/react";
import {
  Drawer,
  Stack,
  Title,
  Text,
  Paper,
  Image,
  Group,
  Badge,
} from "@mantine/core";
import BadgeLink from "./BadgeLink";

const DetailsDrawer = () => {
  const onClose = () => drawerDetails.opened.set(false);
  const details = drawerDetails.get();
  return (
    <Show if={details.opened}>
      {() => (
        <Drawer
          opened={details.opened}
          onClose={onClose}
          title={<Title order={2}>Winner details</Title>}
          padding="xl"
          size="md"
          position="right"
        >
          <>
            <Text color="dimmed" mb="xl">
              {details.date!.format("DD MMMM YYYY")}
            </Text>
            {details.products!.map((product) => (
              <Paper key={product.id} withBorder p="sm" mb="md">
                <Group noWrap align="flex-start" mb="xs">
                  <a href={product.url} target="_blank" rel="noreferrer">
                    <Image
                      width={60}
                      height={60}
                      src={product.thumbnail.url}
                      alt={product.name}
                    />
                  </a>

                  <Title order={3} size={18}>
                    {product.name}
                  </Title>
                </Group>

                <Text color="dimmed" mb="xs">
                  {product.tagline}
                </Text>
                <Group spacing={4}>
                  {product.topics.nodes.map((t) => (
                    <BadgeLink
                      key={t.name}
                      href={`https://producthunt.com/search?q=${t.name}&ref=productcell`}
                    >
                      {t.name}
                    </BadgeLink>
                  ))}
                </Group>
              </Paper>
            ))}
          </>
        </Drawer>
      )}
    </Show>
  );
};

export default observer(DetailsDrawer);
