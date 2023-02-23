import {
  Container,
  Group,
  Header as MantineHeader,
  Title,
  useMantineTheme,
} from "@mantine/core";
import CellFinder from "../calendar/CellFinder";

const Header = () => {
  const theme = useMantineTheme();
  return (
    <MantineHeader height={80}>
      <Container size="xl" h="100%">
        <Group h="100%" position="apart">
          <Title
            c={theme.other.primaryColor}
            order={1}
            sx={{ userSelect: "none" }}
          >
            Product of the day
          </Title>
          <CellFinder />
        </Group>
      </Container>
    </MantineHeader>
  );
};

export default Header;
