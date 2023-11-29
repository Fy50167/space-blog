import React from "react";
import { FaHeart } from "react-icons/fa";

import { useMutation, useQuery } from "@apollo/client";

import { REMOVE_REACTION } from "./mutations";
import { GET_ME } from "./queries";

const RemoveReaction = async function ({ photoId }) {
  const { loading, data } = useQuery(GET_ME);
  const [removeReaction, { error }] = useMutation(REMOVE_REACTION);

  const userData = data?.me || {};

  try {
    const { data } = await removeReaction({
      variables: {
        reactionId
      },
    });

  } catch (err) {
    console.error(err);
  }
};

export default RemoveReaction;
