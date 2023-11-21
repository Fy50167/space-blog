// setup for React and Apollo Client
import { gql } from '@apollo/client';

//GET_ME
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      saved {
        photoId
        createdAt
      }
    }
  }
`;

//GET_REACTIONS
export const QUERY_REACTIONS = gql`
  query getReactions {
    reactions {
      _id
      photoId
      reactionAuthor
      createdAt
    }
  }
`;