import Layout from "@/components/layout/Layout";
import {
  Box,
  Container,
  Title,
  useMantineTheme,
  Text,
  Skeleton,
} from "@mantine/core";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("@/components/calendar/Calendar"), {
  ssr: false,
  loading: () => (
    <Container size="md" px={0}>
      <Skeleton height="60vh" width="100%" />
    </Container>
  ),
});

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

export default IndexPage;
