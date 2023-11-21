const { gql } = require('apollo-server-express');

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    saved: [Saved]
  }

  type Saved {
    photoId: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Comment {
    _id: ID
    photoId: String
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Reaction {
    _id: ID
    photoId: String
    reactionAuthor: String
    createdAt: String
  }

  type Query {
    me: User
    reactions: [Reaction]!
  }

  type Mutation {
    addUser(
      username: String!,
      email: String!,
      password: String!,
    ): Auth

    login(
      email: String!, 
      password: String!
      ): Auth

    addComment(
      photoId: String!
      commentText: String!,
      commentAuthor: String!,
    ): Comment

    addReaction(
      photoId: String!
      reactionAuthor: String!
    ): Reaction

    removeComment(
      commentId: ID!
    ): Comment

    removeReaction(
      reactionId: ID!
    ): Reaction
  }
`;

module.exports = typeDefs;
