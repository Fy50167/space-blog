// setup for React and Apollo Client
import { gql } from '@apollo/client';

//GET_ME
export const GET_ME = gql`
  {
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
 query Reactions {
  reactions {
    createdAt
    photoId
    reactionAuthor
    _id
  }
}
 `;