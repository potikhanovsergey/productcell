import Calendar from "@/components/calendar/Calendar";
import Layout from "@/components/layout/Layout";
import { Box, Container, Title, useMantineTheme } from "@mantine/core";

const IndexPage = () => {
  const theme = useMantineTheme();
  return (
    <Layout>
      <Box py={20}>
        <Container>
          <Title
            mb="xl"
            c={theme.other.primaryColor}
            order={1}
            sx={{ userSelect: "none" }}
          >
            Product of the day
          </Title>
        </Container>

        <Calendar />
      </Box>
    </Layout>
  );
};

export default IndexPage;
