import Calendar from "@/components/calendar/Calendar";
import Layout from "@/components/layout/Layout";
import { Box } from "@mantine/core";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

const query = gql`
  query getProductOfTheDay($dateFrom: DateTime!, $dateTo: DateTime!) {
    posts(postedAfter: $dateFrom, postedBefore: $dateTo, first: 1) {
      nodes {
        id
        name
        votesCount
        thumbnail {
          url
        }
        tagline
        url
        topics {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const IndexPage = () => {
  // const [getUserDetailByApolloClientAPICall, { loading, error, data }] =
  //   useLazyQuery(query, {
  //     variables: {
  //       dateFrom: new Date("2023-01-01@00:00:00:842"),
  //       dateTo: new Date("2023-01-02@00:00:00:842"),
  //     },
  //   });

  // useEffect(() => {
  //   console.log(data, loading, error);
  // }, [data, loading, error]);

  // useEffect(() => {
  //   getUserDetailByApolloClientAPICall();
  // }, []);
  return (
    <Layout>
      <Box py={40}>
        <Calendar />
      </Box>
    </Layout>
  );
};

export default IndexPage;
