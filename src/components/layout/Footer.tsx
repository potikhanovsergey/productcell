import {
  Anchor,
  Avatar,
  Container,
  Footer as MantineFooter,
  Group,
  HoverCard,
  Text,
  Tooltip,
} from "@mantine/core";
import MantineLogo from "../MantineLogo";
import ProductHuntExternalLink from "../ProductHuntExternalLink";

const Footer = () => {
  return (
    <MantineFooter height={60} fixed={false}>
      <Container size="xl" h="100%">
        <Group h="100%" align="center" position="apart">
          <ProductHuntExternalLink />
          <Group spacing={10}>
            <Text weight={500}>Made by</Text>
            <Tooltip label="Sergey Potikhanov" keepMounted>
              <Anchor href="https://t.me/potikhanovsergey" target="_blank">
                <Avatar src="https://sun1-19.userapi.com/s/v1/ig2/HcnhH6fPMj_eLSY4_TAbh2xLym2Qri-qRyn5KQmll5Om8RkhPvPLTm_HKH4f1xRr7SpVXM91LY6KiyvsA07MO4jD.jpg?size=400x400&quality=95&crop=529,5,1290,1290&ava=1" />
              </Anchor>
            </Tooltip>
            <Text>with Product Hunt API and</Text>
            <Tooltip label="Mantine" keepMounted>
              <Anchor href="https://mantine.dev" target="_blank">
                <MantineLogo />
              </Anchor>
            </Tooltip>
          </Group>
        </Group>
      </Container>
    </MantineFooter>
  );
};

export default Footer;
