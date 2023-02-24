import {
  Container,
  Group,
  Header as MantineHeader,
  Title,
  useMantineTheme,
} from "@mantine/core";
import CellFinder from "../calendar/CellFinder";
import Logo from "../Logo";

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
