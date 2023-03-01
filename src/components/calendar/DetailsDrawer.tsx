import { drawerDetails } from "@/store/LegendStore";
import { observer, Show, Switch } from "@legendapp/state/react";
import {
  Drawer,
  Title,
  Text,
  Paper,
  Image,
  Group,
  Box,
  Button,
} from "@mantine/core";
import dynamic from "next/dynamic";
import BadgeLink from "./BadgeLink";
import Stats from "./Stats";

const DrawerDate = dynamic(() => import("./DrawerDate"), { ssr: false });
const TimeTravelButton = dynamic(() => import("./TimeTravelButton"), {
  ssr: false,
});

const DetailsDrawer = () => {
  const onClose = () => drawerDetails.opened.set(false);
  const details = drawerDetails.get();
  return (
    <Drawer
      opened={details.opened}
      onClose={onClose}
      styles={{
        title: {
          fontSize: 32,
        },
      }}
      title="Day details"
      padding="xl"
      size="md"
      position="right"
    >
      <>
        <DrawerDate />
        <Text color="dimmed" size="sm" mb={4}>
          Sorted by the amount of upvotes at the moment
        </Text>
        <Show if={details.products}>
          {() =>
            details.products!.map((product, index) => (
              <Paper key={product.id} withBorder p="sm" mb="md">
                <Group noWrap align="flex-start" mb="xs">
                  <a href={product.url} target="_blank" rel="noreferrer">
                    <Image
                      radius="sm"
                      width={60}
                      height={60}
                      src={`${product.thumbnail.url}&width=100`}
                      alt={product.name}
                    />
                  </a>
                  <Group position="apart" noWrap w="100%" align="flex-start">
                    <Box>
                      <Title order={3} size={18}>
                        {product.name}
                      </Title>
                      <Stats product={product} />
                    </Box>
                    <Box sx={{ flexShrink: 0 }}>
                      <Switch value={index}>
                        {{
                          0: () => (
                            <Text size={40} color="orange" weight="bold">
                              1
                            </Text>
                          ),
                          1: () => (
                            <Text size={40} weight="bold" color="blue">
                              2
                            </Text>
                          ),
                          2: () => (
                            <Text size={40} weight="bold" color="green">
                              3
                            </Text>
                          ),
                          default: () => (
                            <Text size={40} color="gray" weight="bold">
                              {index + 1}
                            </Text>
                          ),
                        }}
                      </Switch>
                    </Box>
                  </Group>
                </Group>
                <Text weight={500} color="dimmed" size="sm" mb={4}>
                  {product.tagline}
                </Text>
                <Group spacing={4} mb={4}>
                  {product.topics.nodes.map((t) => (
                    <BadgeLink
                      size="xs"
                      key={t.name}
                      href={`https://producthunt.com/search?q=${t.name}`}
                    >
                      {t.name}
                    </BadgeLink>
                  ))}
                </Group>
                <Text color="dimmed" mb="xs" size="xs">
                  {product.description}
                </Text>
                <Button
                  component="a"
                  href={product.url}
                  target="_blank"
                  fullWidth
                  variant="light"
                >
                  To launch page
                </Button>
              </Paper>
            ))
          }
        </Show>
        <TimeTravelButton />
      </>
    </Drawer>
  );
};

export default observer(DetailsDrawer);
