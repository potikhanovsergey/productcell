import Calendar from "@/components/calendar/Calendar";
import Layout from "@/components/layout/Layout";
import { observer } from "@legendapp/state/react";
import { Box, Container, Title, useMantineTheme, Text } from "@mantine/core";

const IndexPage = () => {
  const theme = useMantineTheme();
  return (
    <Layout>
      <Box py={20}>
        <Container mb="xl">
          <Title
            mb={4}
            c={theme.other.primaryColor}
            order={1}
            size={28}
            sx={{
              userSelect: "none",
              [`@media (max-width: ${theme.breakpoints.sm})`]: {
                fontSize: 24,
              },
            }}
          >
            Life calendar of the most upvoted products on Product Hunt
          </Title>
          <Text
            size="sm"
            sx={{
              [`@media (max-width: ${theme.breakpoints.sm})`]: {
                fontSize: 14,
              },
            }}
            color="dimmed"
            maw={640}
          >
            Rules are simple. Click on the tile to see the most upvoted product
            that was created in that day. Click one more time to see the
            details.
          </Text>
        </Container>

        <Calendar />
      </Box>
    </Layout>
  );
};

export default observer(IndexPage);
