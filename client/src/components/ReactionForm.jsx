import React, { useState, useEffect } from "react";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BsFillSaveFill } from "react-icons/bs";
import { BsSave } from "react-icons/bs";

import { useMutation, useQuery } from "@apollo/client";

import { QUERY_REACTIONS } from "../utils/queries";
import { ADD_REACTION } from "../utils/mutations";

import Auth from '../utils/auth';

const ReactionForm = ({ photoId }) => {
  const { loading, data } = useQuery(QUERY_REACTIONS, {
    variables: { photoId: photoId },
  });
  const reactions = data?.reactions || [];

  const [addReaction, {error}] = useMutation(ADD_REACTION);

  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  const handleLikes = async (event) => {
    event.preventDefault();

    try {

      setLike((prevState) => !prevState);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaves = (event) => {
    setSave((prevState) => !prevState);
  };
  return (
      <div className="flex w-1/2 ml-2">
        <h2
          onClick={handleLikes}
          className="flex w-1/8 justify-between p-2"
        >
          {like ? (
            <FaHeart className="text-red-600 text-2xl" />
          ) : (
            <FaRegHeart className="text-red-600 text-2xl" />
          )}
        </h2>
        <h2 className="w-1/8 p-2 text-white">{reactions.length}</h2>
        <h2
          onClick={() => setSave((prevState) => !prevState)}
          className="w-1/4 p-2"
        >
          {save ? (
            <BsFillSaveFill className="text-2xl text-white" />
          ) : (
            <BsSave className="text-2xl text-white" />
          )}
        </h2>
      </div>
  );
};

export default ReactionForm;
