import Calendar from "@/components/calendar/Calendar";
import Layout from "@/components/layout/Layout";
import { Box } from "@mantine/core";

const IndexPage = () => {
  return (
    <Layout>
      <Box py={40}>
        <Calendar />
      </Box>
    </Layout>
  );
};

export default IndexPage;
