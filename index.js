const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const User = require("./modules/User");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb database connected");
    return server.listen({ port: 8000 });
  })
  .then((res) => {
    console.log(`server running at ${res.url} and port at ${res.port}`);
  });
