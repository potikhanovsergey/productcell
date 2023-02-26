import Calendar from "@/components/calendar/Calendar";
import Layout from "@/components/layout/Layout";
import { Box, Container, Title, useMantineTheme, Text } from "@mantine/core";

const IndexPage = () => {
  const theme = useMantineTheme();
  return (
    <Layout>
      <Box py={20}>
        <Container mb="xl">
          <Title
            c={theme.other.primaryColor}
            order={1}
            sx={{ userSelect: "none" }}
          >
            Product of the day
          </Title>
          <Text size="md" color="dimmed">
            Rules are simple. Click on the tile to load the product of the day.
            Click one more time to see the details.
          </Text>
        </Container>

        <Calendar />
      </Box>
    </Layout>
  );
};

export default IndexPage;
