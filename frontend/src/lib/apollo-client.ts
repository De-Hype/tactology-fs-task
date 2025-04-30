import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || 'https://tactology-fs-task.onrender.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  let token = null;
  
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('auth_token');
  }
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;