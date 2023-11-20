import React from "react";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BsFillSaveFill } from "react-icons/bs";
import { BsSave } from "react-icons/bs";

import { useMutation, useQuery } from "@apollo/client";

import { QUERY_REACTIONS } from "../utils/queries";
import { ADD_REACTION } from "../../utils/mutations";

import Auth from '../../utils/auth';

const ReactionForm = () => {
  const { loading, data } = useQuery(QUERY_REACTIONS);
  const reactions = data?.reactions || [];

  const [addReaction, {error}] = useMutation(ADD_REACTION);

  const [like, setLike] = UseState(false);
  const [save, setSave] = UseState(false);


  const handleLikes = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addReaction({
        variables: {
          reactionValue,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username 
          reactionAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setLike((prevState) => !prevState);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaves = (event) => {
    setSave((prevState) => !prevState);
  };
  return (
    <div>
      <h2 onClick={handleLikes} className="">
        {like ? <FaHeart /> : <FaRegHeart />}
      </h2>
      <h2 onClick={handleSaves} className="">
        {save ? <BsFillSaveFill /> : <BsSave />}
      </h2>
    </div>
  );
};

export default ReactionForm;
