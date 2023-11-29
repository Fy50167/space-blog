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

//GET__COMMENTS
export const QUERY_COMMENTS = gql`
 query Comments($photoId: String) {
  comments(photoId: $photoId) {
    commentAuthor
    commentText
    createdAt
    _id
  }
}
 `;

//GET REACTIONS FROM USER
export const QUERY_REACTION = gql`
 query Reaction($reactionAuthor: String) {
  reaction(reactionAuthor: $reactionAuthor) {
    photoId
    reactionAuthor
  }
}
 `;

export const QUERY_REACTIONS = gql`
query Reactions($photoId: String) {
  reactions(photoId: $photoId) {
    _id
    reactionAuthor
  }
}
 `;