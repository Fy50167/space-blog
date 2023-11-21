//all need to be rewritten for the new resolvers

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    comments: [Comment]
  }

  type Auth {
    token: ID
    user: User
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionText: String
    createdAt: String
  }

  type Query {
    user(userId: ID!): User
  }

  type Mutation {
    addUser(
      username: String!,
      email: String!,
      password: String!,
    ): Auth

    addComment(
      commentText: String!,
      commentAuthor: String!,
    ): Comment

    addReaction(
      commentId: ID!, 
      reactionText: String!
    ): Reaction

    removeComment(
      commentId: ID!
    ): Comment

    removeReaction(
      commentId: ID!, 
      reactionId: ID!
    ): Reaction

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
