const postsResolvers = require("./posts");
const usersResolvers = require("./user");

module.exports = {
  Query: { ...postsResolvers.Query },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
