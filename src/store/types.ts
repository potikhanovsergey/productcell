export interface ProductHuntApiResponse {
  id: string;
  name: string;
  votesCount: number;
  commentsCount: number;
  thumbnail: {
    url: string;
  };
  tagline: string;
  url: string;
  topics: {
    nodes: { name: string }[];
  };
}

export interface ProductHash {
  [key: string]: ProductHuntApiResponse;
}
