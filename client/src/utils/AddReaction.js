import React from "react";
import { FaRegHeart } from "react-icons/fa";

import { useMutation, useQuery } from "@apollo/client";

import { ADD_REACTION } from "./mutations";
import { GET_ME } from "./queries";

const AddReaction = async function (photoId) {
  const { loading, data } = useQuery(GET_ME);
  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const userData = data?.me || {};

  try {
    const { data } = await addReaction({
      variables: {
        photoId,
        reactionAuthor: userData.username,
      },
    });

    const reactionData = data?.reactions || {};
    console.log("reaction data", reaction);
    return reactionData;

  } catch (err) {
    console.error(err);
  }

};

export default AddReaction;
