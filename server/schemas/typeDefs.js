const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID!
    username: String!
    email: String!
    imageCount: Int
    savedImages: [Image]
  }

  type Image{
    photoId: String
    createdAt: String
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    reactions(photoId: String): [Reaction]
    reaction(reactionAuthor: String): [Reaction]
    comments(photoId: String): [Comment]
    me: User
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

    saveImage(
      photoId: String!
    ): User

    removeImage(
      photoId: String!
    ): User

    addComment(
      photoId: String!,
      commentText: String!,
      commentAuthor: String!
    ): Comment

    addReaction(
      photoId: String!,
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
