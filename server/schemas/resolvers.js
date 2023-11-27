const { User, Comment, Reaction } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken} = require('../utils/auth');


const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    reactions: async () => {
      return Reaction.find({})
    }, //for loading all reactions
    reaction: async (parent, { reactionAuthor }) => {
      const params = reactionAuthor ? { reactionAuthor } : {};
      return Reaction.find(params).sort({ createdAt: -1 });
    },//for user likes
    comments: async (parent, { photoId }) => {
      //const params = photoId ?  { photoId } : {};
      return Comment.find({ photoId }).sort({ createdAt: -1 });
    },//for comments on each post
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
    },//for sign up
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('User not found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Password!');
      }

      const token = signToken(user);

      return { token, user };
    },//for login
    addComment: async (parent, { photoId, commentText, commentAuthor }, context) => {
      if (context.user) {
        const comment = await Comment.create({ photoId, commentText, commentAuthor });

        return comment;
      }

      throw AuthenticationError;
    },
    removeComment: async (parent, { commentId }, context) => {
      if (context.user) {
        return Comment.findOneAndDelete({ _id: commentId });
      }

      throw AuthenticationError;
    },
    addReaction: async (parent, { photoId, reactionAuthor }, context) => {
      if (context.user) {
        const reaction = await Reaction.create({ photoId, reactionAuthor });

        return reaction
      }
      throw AuthenticationError;
    },

    removeReaction: async (parent, { reactionId }, context) => {
      if (context.user) {
        return Reaction.findOneAndDelete({ _id: reactionId });
      }
      throw AuthenticationError;
    }
  }
};

module.exports = resolvers;
