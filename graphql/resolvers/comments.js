const { UserInputError, AuthenticationError } = require("apollo-server");
const Post = require("../../modules/Post");
const checkauth = require("../../utils/checkauth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkauth(context);
      if (body.trim() === "") {
        throw new UserInputError("Please Write Something", {
          errors: {
            body: "comment body must not empty",
          },
        });
      }
      const post = await Post.findById(postId);
      console.log(post.comments, "some post");

      if (post) {
        console.log(post, "here is to find comment");
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    async deleteComment(_, { postId, CommentId }, context) {
      const { username } = checkauth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => ci.d === commentId);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("POst not found");
      }
    },
  },
};
