import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { AxiosProductResponse } from "@/store/types";
import { filterBy, loadingHash, productsHash } from "@/store/LegendStore";

const timezone = "US/Pacific";

const endpoint = "https://api.producthunt.com/v2/api/graphql";
const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${process.env.PRODUCT_HUNT_API_TOKEN}`,
};

const options = {
  method: "POST",
  headers: headers,
};

const graphqlQuery = `query getProductOfTheDay($dateFrom: DateTime!, $dateTo: DateTime!, $topic: String) {
    posts(
      postedAfter: $dateFrom
      postedBefore: $dateTo
      topic: $topic
      order: VOTES
      first: 10
    ) {
      nodes {
        id
        name
        votesCount
        commentsCount
        description
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

export const getProduct = async ({
  dateFrom,
  dateTo,
}: {
  dateFrom: Date;
  dateTo: Date;
}) => {
  try {
    const filterByValue = filterBy.get();
    const response = await axios<AxiosProductResponse>(endpoint, {
      ...options,
      data: {
        query: graphqlQuery,
        variables: {
          dateFrom,
          dateTo,
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

export const fetchProductAndSet = async ({
  index,
  date,
}: {
  index: string;
  date: Dayjs;
}) => {
  if (!loadingHash.get().includes(index)) {
    const dateFrom = date
      .utc()
      .tz(timezone)
      .startOf("day")
      .add(1, "day")
      .toDate();
    const dateTo = date
      .utc()
      .tz(timezone)
      .startOf("day")
      .add(2, "day")
      .subtract(1, "hour")
      .toDate();
    loadingHash.set((prev) => [...prev, index]);
    const response = await getProduct({
      dateFrom,
      dateTo,
    });
    loadingHash.set((prev) => prev.filter((item) => item !== index));
    if (response === 429) {
    } else if (response?.data) {
      const filterByValue = filterBy.get();
      productsHash.set((prev) => ({
        ...prev,
        [filterByValue]: {
          ...prev[filterByValue],
          [index]: response.data.data.posts.nodes,
        },
      }));
    }
  }
};
