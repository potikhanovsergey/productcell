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
import PrimaryButton from "../PrimaryButton";
import FirstBadge from "../producthuntIcons/FirstBadge";
import SecondBadge from "../producthuntIcons/SecondBadge";
import ThirdBadge from "../producthuntIcons/ThirdBadge";
import BadgeLink from "./BadgeLink";
import Stats from "./Stats";

const DetailsDrawer = () => {
  const onClose = () => drawerDetails.opened.set(false);
  const details = drawerDetails.get();
  return (
    <Drawer
      opened={details.opened}
      onClose={onClose}
      title={<Title order={2}>Winner details</Title>}
      padding="xl"
      size="md"
      position="right"
    >
      <>
        <Show if={details.date}>
          {() => (
            <Text color="dimmed" mb="sm">
              {details.date!.format("DD MMMM YYYY")}
            </Text>
          )}
        </Show>
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
                    <Switch value={index}>
                      {{
                        0: () => <FirstBadge miw={80} w={80} />,
                        1: () => <SecondBadge miw={80} w={80} />,
                        2: () => <ThirdBadge miw={80} w={80} />,
                        default: () => null,
                      }}
                    </Switch>
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
        <Show if={details.date}>
          {() => (
            <PrimaryButton
              fullWidth
              target="_blank"
              component="a"
              href={`https://producthunt.com/time-travel/${details.date?.format(
                "YYYY/MM/DD"
              )}`}
            >
              Product Hunt time travel
            </PrimaryButton>
          )}
        </Show>
      </>
    </Drawer>
  );
};

export default observer(DetailsDrawer);
