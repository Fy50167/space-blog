const { User, Comment, Reaction } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    addComment: async (parent, {commentText, commentAuthor}, context) => {
      if (context.user) {
        const comment = await Comment.create({commentText, commentAuthor});

        await User.findByIdAndUpdate(context.user._id, { $push: { comments: comment } });

        return comment;
      }

      throw AuthenticationError;
    },

    addReaction: async (parent, {commentId, reactionText}, context) => {
      if (context.user) {
        const reaction =  Comment.findOneAndUpdate(
          { _id: commentId },
          {
            $addToSet: { reactions: { reactionText } },
          },
          {
            new: true,
            runValidators: true,
          }
        );        

        return reaction
      }
      throw AuthenticationError;
    },

    removeComment: async (parent, { commentId }) => {
      return Comment.findOneAndDelete({ _id: commentId });
    },

    removeReaction: async (parent, { commentId, reactionId }) => {
      return Comment.findOneAndUpdate(
        { _id: commentId },
        { $pull: { reaction: { _id: reactionId } } },
        { new: true }
      );
    }
  }
};

module.exports = resolvers;
