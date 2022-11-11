import React from "react";
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import App from "./App";

const httpLink = new HttpLink({
  uri: "http://localhost:8002",
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
