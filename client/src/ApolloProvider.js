import React from "react";
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import App from "./App";

const httpLink = new HttpLink({
  uri: "http://localhost:5000",
});

const client = new ApolloClient({
  uri: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
