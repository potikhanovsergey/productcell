import dayjs from "dayjs";
import axios from "axios";
import { AxiosProductResponse } from "@/store/types";

const endpoint = "https://api.producthunt.com/v2/api/graphql";
const headers = {
  "content-type": "application/json",
  Authorization: "Bearer fA3IFlvVj8OM2HbXU_dKMXwdAq0HA0Akl8nehMt3358",
};

const options = {
  method: "POST",
  headers: headers,
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

export const getProduct = async ({
  dateFrom,
  dateTo,
}: {
  dateFrom: Date;
  dateTo: Date;
}) => {
  const response = await axios<AxiosProductResponse>(endpoint, {
    ...options,
    data: {
      query: graphqlQuery,
      variables: {
        dateFrom,
        dateTo,
      },
    },
  });

  return response;
};
