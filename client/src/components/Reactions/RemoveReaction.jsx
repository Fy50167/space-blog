import React from "react";
import { FaHeart } from "react-icons/fa";

import { useMutation, useQuery } from "@apollo/client";

import { REMOVE_REACTION } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";

const RemoveReaction = ({ photoId }) => {
  const { loading, data } = useQuery(GET_ME);
  const [removeReaction, { error }] = useMutation(REMOVE_REACTION);

  const userData = data?.me || {};

  try {
    const { data } = removeReaction({
      variables: {
        photoId,
        reactionAuthor: userData.username,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export default RemoveReaction;
