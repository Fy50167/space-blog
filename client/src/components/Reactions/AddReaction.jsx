import React from "react";
import { FaRegHeart } from "react-icons/fa";

import { useMutation, useQuery } from "@apollo/client";

import { ADD_REACTION } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";

const AddReaction = ({ photoId }) => {
  const { loading, data } = useQuery(GET_ME);
  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const userData = data?.me || {};

  try {
    const { data } = addReaction({
      variables: {
        photoId,
        reactionAuthor: userData.username,
      },
    });
  } catch (err) {
    console.error(err);
  }

};

export default AddReaction;
