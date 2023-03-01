import {
  Anchor,
  Avatar,
  Container,
  Footer as MantineFooter,
  Group,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import ProductHuntExternalLink from "../ProductHuntExternalLink";
import Image from "next/image";

const Footer = () => {
  const theme = useMantineTheme();
  return (
    <MantineFooter height={80} fixed={false}>
      <Container size="xl" h="100%">
        <Group
          h="100%"
          align="center"
          position="apart"
          sx={{
            [`@media (max-width: ${theme.breakpoints.sm})`]: {
              flexDirection: "column-reverse",
              height: "auto",
              paddingTop: 12,
              paddingBottom: 12,
              fontSize: 12,
            },
          }}
        >
          <ProductHuntExternalLink />
          <Group spacing={10}>
            <Text weight={500}>Made by</Text>
            <Tooltip label="Sergey Potikhanov" keepMounted>
              <Anchor
                href="https://www.linkedin.com/in/sergey-potikhanov-647b87207/"
                target="_blank"
              >
                <Avatar pos="relative">
                  <Image
                    fill
                    alt="Sergey Potikhanov"
                    src="/images/potikhanov.jpeg"
                  />
                </Avatar>
              </Anchor>
            </Tooltip>
            <Tooltip label="Darya Syomina" keepMounted>
              <Anchor href="https://t.me/daryasyomina" target="_blank">
                <Avatar pos="relative">
                  <Image fill alt="Darya Syomina" src="/images/syomina.jpg" />
                </Avatar>{" "}
              </Anchor>
            </Tooltip>

            <Text>with Product Hunt API</Text>
          </Group>
        </Group>
      </Container>
    </MantineFooter>
  );
};

export default Footer;
