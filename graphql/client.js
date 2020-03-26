import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { retrieveAuthToken } from '../utils';
import { persistCache } from 'apollo-cache-persist';
import { AsyncStorage } from 'react-native';

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

    return new ApolloClient({
        link: authLink.concat(httpLink),
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
