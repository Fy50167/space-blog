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
        password
      }
    }
  }
`;

//once they are completed on the server side..... finish below

//save image (Do we need to make mutations for these? Wouldn't we need to make an Image model if so?)
//remove image


// (The queries for these mutations are probably wrong, not sure what's supposed to go in them)
//add comment

export const ADD_COMMENT = gql`
  mutation addComment($photoId: String!, $commentText: String!, $commentAuthor: String!) {
    addComment(photoId: $photoId, commentText: $commentText, commentAuthor: $commentAuthor) {
      comment {
        photoId
        commentText
        commentAuthor
      }
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