import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { retrieveAuthToken } from '../utils';
import { persistCache } from 'apollo-cache-persist';
import { AsyncStorage } from 'react-native';
import { onError } from 'apollo-link-error';

module.exports = async () => {
  const httpLink = createHttpLink({
    uri: 'https://signalc.herokuapp.com/graphql',
  });

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const customHeaders = {};
    const mobileToken = await retrieveAuthToken();

    if (mobileToken) {
      customHeaders.mobileToken = mobileToken;
    }

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        ...customHeaders,
      },
    };
  });

  const cache = new InMemoryCache();
  try {
    await persistCache({
      cache,
      storage: AsyncStorage,
    });
  } catch (e) {
    throw new Error(e);
  }

  const authenticationErrorLink = onError(({ graphQLErrors }) => {
    if (
      graphQLErrors[0].message === 'Context creation failed: AuthenticationError' ||
      graphQLErrors[0].message === 'AuthenticationFailure'
    ) {
      // deleteAuthToken();
    }
  });

  return new ApolloClient({
    link: authenticationErrorLink.concat(authLink.concat(httpLink)),
    cache,
    resolvers: {},
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
};
