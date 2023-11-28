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
  mutation saveImage($photoId: ID!) {
    saveImage(photoId: $photoId) {
      _id
      username
      email
      savedImages {
        photoId
      }
    }
  }
`;

export const REMOVE_IMAGE = gql`
  mutation removeImage($photoId: ID!) {
    removeImage(photoId: $photoId) {
      _id
      username
      email
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
  mutation removeComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
      comment {
        commentId
      }
    }
  }
`;

//add reaction

export const ADD_REACTION = gql`
  mutation addReaction($photoId: String!, $reactionAuthor: String!) {
    addReaction(photoId: $photoId, reactionAuthor: $reactionAuthor) {
      reaction {
        photoId
        reactionAuthor
      }

    }
  }
`;

//remove reaction

export const REMOVE_REACTION = gql`
  mutation removeReaction($reactionId: ID!) {
    removeReaction(reactionId: $reactionId) {
      reaction {
        reactionId
      }

    }
  }
`;