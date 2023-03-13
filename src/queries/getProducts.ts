import { Dayjs } from "dayjs";
import axios from "axios";
import {
  AxiosMonthProductsResponse,
  AxiosProductResponse,
} from "@/store/types";
import {
  filterBy,
  loadingHash,
  monthProductsHash,
  productsHash,
} from "@/store/LegendStore";
import { endpoint, options, timezone } from ".";

const graphqlQuery = `query getProductsOfTheMonth($dateFrom: DateTime!, $dateTo: DateTime!, $topic: String, $after: String) {
    posts(
      postedAfter: $dateFrom
      postedBefore: $dateTo
      topic: $topic
      order: VOTES
      after: $after
      first: 20
      featured: true
    ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          votesCount
          commentsCount
          featuredAt
          topics {
            nodes {
              name
            }
          }
        }
      }
  }
`;

export const getProducts = async ({
  dateFrom,
  dateTo,
  endCursor = null,
}: {
  dateFrom: Date;
  dateTo: Date;
  endCursor?: string | null;
}) => {
  try {
    const filterByValue = filterBy.get();
    const response = await axios<AxiosMonthProductsResponse>(endpoint, {
      ...options,
      data: {
        query: graphqlQuery,
        variables: {
          dateFrom,
          dateTo,
          after: endCursor,
          topic: filterByValue === "all" ? undefined : filterByValue,
        },
      },
    });

    return response;
  } catch (e: any) {
    if (e?.response?.status === 429) {
      return 429;
    }
  }
};

export const fetchProductsAndSet = async ({
  index,
  date,
  endCursor = null,
}: {
  index: string;
  date: Dayjs;
  endCursor?: string | null;
}) => {
  const dateFrom = date.utc().tz(timezone).startOf("month").toDate();
  const dateTo = date
    .utc()
    .tz(timezone)
    .startOf("month")
    .add(1, "month")
    .subtract(1, "second")
    .toDate();
  const response = await getProducts({
    dateFrom,
    dateTo,
    endCursor,
  });
  if (response === 429) {
  } else if (response?.data) {
    const filterByValue = filterBy.get();
    monthProductsHash[filterByValue][index].set((prev) => ({
      posts: prev
        ? [...prev.posts, ...response.data.data.posts.nodes]
        : response.data.data.posts.nodes,
      endCursor: response.data.data.posts.pageInfo.endCursor,
      hasNextPage: response.data.data.posts.pageInfo.hasNextPage,
    }));
    return {
      endCursor: response.data.data.posts.pageInfo.endCursor,
      hasNextPage: response.data.data.posts.pageInfo.hasNextPage,
    };
  }
};
