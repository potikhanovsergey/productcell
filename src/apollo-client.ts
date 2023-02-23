import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";
import { DateTimeResolver, typeDefs as scalarTypeDefs } from "graphql-scalars";

const typeDefs = [
  ...scalarTypeDefs,
  // other typeDefs
];

const httpLink = createHttpLink({
  uri: "https://api.producthunt.com/v2/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer fA3IFlvVj8OM2HbXU_dKMXwdAq0HA0Akl8nehMt3358`,
    },
  };
});

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    typeDefs,
    resolvers: {
      DateTime: DateTimeResolver,
    },
  });
}

export function initializeApollo(
  initialState: { [key: string]: any } | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: { [key: string]: any }) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
