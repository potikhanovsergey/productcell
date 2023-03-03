import {
  Container,
  Group,
  Header as MantineHeader,
  Loader,
  useMantineTheme,
} from "@mantine/core";
import dynamic from "next/dynamic";
import ColorSchemeToggle from "../ColorSchemeToggle";
import Logo from "../Logo";

const CellFinder = dynamic(() => import("../calendar/CellFinder"), {
  ssr: false,
  loading: () => <Loader />,
});

const Header = () => {
  const theme = useMantineTheme();
  return (
    <MantineHeader
      height={80}
      sx={{
        background: theme.colorScheme === "dark" ? "#161920" : theme.white,
      }}
    >
      <Container size="xl" h="100%">
        <Group h="100%" position="apart" noWrap>
          <Logo h={40} />
          <Group noWrap spacing="xs">
            <ColorSchemeToggle />
            <CellFinder />
          </Group>
        </Group>
      </Container>
    </MantineHeader>
  );
};

export default Header;
