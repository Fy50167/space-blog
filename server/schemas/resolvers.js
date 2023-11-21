const { User, Comment, Reaction } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    reactions: async () => {
      return Reaction.find({})
    }, //for loading the reactions per image
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }, //for user verification
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },//for login

    addComment: async (parent, {photoId, commentText, commentAuthor}, context) => {
      if (context.user) {
        const comment = await Comment.create({photoId, commentText, commentAuthor});

        return comment;
      }

      throw AuthenticationError;
    },

    removeComment: async (parent, { commentId }) => {
      return Comment.findOneAndDelete({ _id: commentId });
    },

    addReaction: async (parent, {photoId, reactionAuthor}, context) => {
      if (context.user) {
        const reaction = await Reaction.create({photoId, reactionAuthor});   

        return reaction
      }
      throw AuthenticationError;
    },

    removeReaction: async (parent, { reactionId }) => {
      return Reaction.findOneAndDelete({ _id: reactionId });
    }
  }
};

module.exports = resolvers;
