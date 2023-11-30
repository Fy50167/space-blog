import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        imageCount
        savedImages {
          photoId
        }
      }
    }
  }
`;

export const SAVE_IMAGE = gql`
  mutation saveImage($photoId: String!) {
    saveImage(photoId: $photoId) {
      savedImages {
        photoId
      }
    }
  }
`;

export const REMOVE_IMAGE = gql`
  mutation removeImage($photoId: String!) {
    removeImage(photoId: $photoId) {
      savedImages {
        photoId
      }
    }
  }
`;

export const ADD_COMMENT = gql`
mutation AddComment($photoId: String!, $commentText: String!, $commentAuthor: String!) {
  addComment(photoId: $photoId, commentText: $commentText, commentAuthor: $commentAuthor) {
    photoId
    commentText
    commentAuthor
  }
}
`;

//remove comment
export const REMOVE_COMMENT = gql`
mutation RemoveComment($commentId: ID!) {
  removeComment(commentId: $commentId) {
    _id
  }
}
`;

//add reaction
export const ADD_REACTION = gql`
mutation AddReaction($photoId: String!, $reactionAuthor: String!) {
  addReaction(photoId: $photoId, reactionAuthor: $reactionAuthor) {
    photoId
    reactionAuthor
  }
}
`;

//remove reaction
export const REMOVE_REACTION = gql`
mutation RemoveReaction($reactionId: ID!) {
  removeReaction(reactionId: $reactionId) {
    _id
  }
}
`;