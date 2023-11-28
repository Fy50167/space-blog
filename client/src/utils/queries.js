// setup for React and Apollo Client
import { gql } from '@apollo/client';


export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedImages {
        photoId
        createdAt
      }
    }
  }
`;

//GET_ME
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedImages{
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

 //GET__COMMENTS
 export const QUERY_COMMENTS = gql `
  query getComments {
    comments {
      _id
      photoId
      commentText
      commentAuthor
      createdAt
    }
  }
 `;