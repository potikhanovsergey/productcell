import {
  Container,
  Group,
  Header as MantineHeader,
  Loader,
  useMantineTheme,
} from "@mantine/core";
import dynamic from "next/dynamic";
import Logo from "../Logo";

const CellFinder = dynamic(() => import("../calendar/CellFinder"), {
  ssr: false,
  loading: () => <Loader />,
});

const Header = () => {
  const theme = useMantineTheme();
  return (
    <MantineHeader height={80}>
      <Container size="xl" h="100%">
        <Group h="100%" position="apart">
          <Logo h={48} />

          <CellFinder />
        </Group>
      </Container>
    </MantineHeader>
  );
};

export default Header;
