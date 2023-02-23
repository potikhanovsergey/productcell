import { AppStore } from "@/store/AppStore";
import { gql, useLazyQuery } from "@apollo/client";
import { Box, Container, Group } from "@mantine/core";
import { useDebouncedValue, useElementSize } from "@mantine/hooks";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import CalendarGrid from "./CalendarGrid";
import ColumnLabels from "./ColumnLabels";
import RowLabels from "./RowLabels";

const endpoint = "https://api.producthunt.com/v2/api/graphql";
const headers = {
  "content-type": "application/json",
  Authorization: "Bearer fA3IFlvVj8OM2HbXU_dKMXwdAq0HA0Akl8nehMt3358",
};

const graphqlQuery = `query getProductOfTheDay($dateFrom: DateTime!, $dateTo: DateTime!) {
    posts(
      postedAfter: $dateFrom
      postedBefore: $dateTo
      order: VOTES
      first: 1
    ) {
      nodes {
        id
        name
        votesCount
        commentsCount
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

export const productQuery = gql`
  query getProductOfTheDay($dateFrom: DateTime!, $dateTo: DateTime!) {
    posts(
      postedAfter: $dateFrom
      postedBefore: $dateTo
      order: VOTES
      first: 1
    ) {
      nodes {
        id
        name
        votesCount
        commentsCount
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

const options = {
  method: "POST",
  headers: headers,
};

const Calendar = () => {
  const { width, ref } = useElementSize();
  const [debouncedHoverCell] = useDebouncedValue(AppStore.hoveredRowCell, 1000);
  const [getUserDetailByApolloClientAPICall, { loading, error, data }] =
    useLazyQuery(productQuery);

  useEffect(() => {
    if (
      debouncedHoverCell !== null &&
      AppStore.hoveredRow !== null &&
      AppStore.hoveredRowCell !== null
    ) {
      if (
        !AppStore.productsHash[
          `${AppStore.hoveredRow} ${AppStore.hoveredRowCell}`
        ]
      ) {
        const date = dayjs()
          .startOf("month")
          .subtract(AppStore.hoveredRow, "month")
          .add(AppStore.hoveredRowCell, "day");

        getUserDetailByApolloClientAPICall({
          variables: {
            dateFrom: date.toDate(),
            dateTo: date.add(1, "day").toDate(),
          },
        });
      }
    }
  }, [debouncedHoverCell]);

  useEffect(() => {
    if (
      AppStore.cellToBeFound &&
      !AppStore.productsHash[AppStore.cellToBeFound.index]
    ) {
      const dayFrom = dayjs(AppStore.cellToBeFound.date).startOf("day");
      getUserDetailByApolloClientAPICall({
        variables: {
          dateFrom: dayFrom.toDate(),
          dateTo: dayFrom.add(1, "day").toDate(),
        },
      });
    }
  }, [AppStore.cellToBeFound]);

  useEffect(() => {
    if (data) {
      AppStore.productsHash[
        `${AppStore.hoveredRow} ${AppStore.hoveredRowCell}`
      ] = data.posts.nodes[0];
    }
  }, [data]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(endpoint, {
        ...options,
        body: JSON.stringify({
          query: graphqlQuery,
          variables: {
            dateFrom: dayjs().subtract(1, "day").toDate(),
            dateTo: dayjs().toDate(),
          },
        }),
      });
      const data = await response.json();

      console.log("DATA", data);
    };
    fetchProduct();
  }, []);
  return (
    <Container size="md">
      <ColumnLabels mb={4} pl={width ? width + 8 : undefined} />
      <Box
        pos="relative"
        sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 8 }}
      >
        <RowLabels ref={ref} />
        <CalendarGrid sx={{ flex: 1 }} />
      </Box>
    </Container>
  );
};

export default observer(Calendar);
