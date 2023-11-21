import React, { useState, useEffect } from "react";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BsFillSaveFill } from "react-icons/bs";
import { BsSave } from "react-icons/bs";

// import { useMutation, useQuery } from "@apollo/client";

//import { QUERY_REACTIONS } from "../utils/queries";
//import { ADD_REACTION } from "../../utils/mutations";

//import Auth from '../../utils/auth';

const ReactionForm = () => {
  //   const { loading, data } = useQuery(QUERY_REACTIONS);
  //   const reactions = data?.reactions || [];

  //   const [addReaction, {error}] = useMutation(ADD_REACTION);

  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  const handleLikes = async (event) => {
    event.preventDefault();

    try {
      //   const { data } = await addReaction({
      //     variables: {
      //       reactionValue,
      //       // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username
      //       reactionAuthor: Auth.getProfile().authenticatedPerson.username
      //     },
      //   });

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
          onClick={() => setLike((prevState) => !prevState)}
          className="flex w-1/8 justify-between p-2"
        >
          {like ? (
            <FaHeart className="text-red-600 text-2xl" />
          ) : (
            <FaRegHeart className="text-red-600 text-2xl" />
          )}
        </h2>
        <h2 className="w-1/8 p-2 text-white">Count</h2>
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
