export const timezone = "US/Pacific";

export const endpoint = "https://api.producthunt.com/v2/api/graphql";
export const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${process.env.PRODUCT_HUNT_API_TOKEN}`,
};

export const options = {
  method: "POST",
  headers: headers,
};
