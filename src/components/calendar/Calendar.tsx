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

const query = gql`
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

const Calendar = () => {
  const { width, ref } = useElementSize();
  const [debouncedHoverCell] = useDebouncedValue(AppStore.hoveredRowCell, 1000);
  const [getUserDetailByApolloClientAPICall, { loading, error, data }] =
    useLazyQuery(query, {
      variables: {
        dateFrom: new Date("2023-01-01@00:00:00:842"),
        dateTo: new Date("2023-01-02@00:00:00:842"),
      },
    });

  // useEffect(() => {
  //   console.log(data, loading, error);
  // }, [data, loading, error]);

  // useEffect(() => {
  //   getUserDetailByApolloClientAPICall();
  // }, []);

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
    if (data) {
      AppStore.productsHash[
        `${AppStore.hoveredRow} ${AppStore.hoveredRowCell}`
      ] = data.posts.nodes[0];
    }
  }, [data]);
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
