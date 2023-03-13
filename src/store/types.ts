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
  description: string;
}

export interface MonthProductsApiResponse {
  votesCount: number;
  commentsCount: number;
  featuredAt: Date;
  topicks: {
    nodes: { name: string }[];
  };
}

export interface AxiosMonthProductsResponse {
  data: {
    posts: {
      nodes: MonthProductsApiResponse[];
      pageInfo: {
        endCursor: string | null;
        hasNextPage: boolean;
      };
    };
  };
}

export interface AxiosProductResponse {
  data: {
    posts: {
      nodes: ProductHuntApiResponse[];
    };
  };
}

export interface ProductHash {
  [key: string]: {
    [key: string]: ProductHuntApiResponse[];
  };
}

export interface ProductsHash {
  [key: string]: {
    [key: string]: {
      endCursor: string | null;
      hasNextPage: boolean;
      posts: MonthProductsApiResponse[];
    };
  };
}
