const { User, Comment, Reaction } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    }, 
    reactions: async () => {
      return Reaction.find({})
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
        return comment;
      }

      throw AuthenticationError;
    },//needs work

    removeComment: async (parent, { commentId }) => {
      return Comment.findOneAndDelete({ _id: commentId });
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
    },//needs work

    removeReaction: async (parent, { reactionId }) => {
      return Reaction.findOneAndDelete({ _id: reactionId });
    }, 

    //save photo

    //remove photo
  }
};

module.exports = resolvers;
