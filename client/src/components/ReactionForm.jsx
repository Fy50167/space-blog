import React, { useState, useEffect } from "react";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BsFillSaveFill } from "react-icons/bs";
import { BsSave } from "react-icons/bs";

import { useMutation, useQuery } from "@apollo/client";

import { QUERY_REACTIONS } from "../utils/queries";
import { ADD_REACTION, REMOVE_REACTION } from "../utils/mutations";

import Auth from '../utils/auth';

const ReactionForm = (photo) => {
  const { loading, data } = useQuery(QUERY_REACTIONS, {
    variables: { photoId: photo.data.date },
  });
  const reactions = data?.reactions || [];
  console.log({reactions});

  const [addReaction] = useMutation(ADD_REACTION);
  const [removeReaction] = useMutation(REMOVE_REACTION);

  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  const saveImage = (() => {
    setSave((prevState) => !prevState);
  })

  const handleLikes = async (event) => {
  
    event.preventDefault();
    setLike((prevState) => !prevState);


    if(!like){
      try {
        const { data } = await addReaction({
          variables: {
              photoId: photo.data.date,
              // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username
              reactionAuthor: Auth.getProfile().data.username
            },
         });
         console.log(data);
        
      } catch (err) {
        console.error(err);
      }

    } else {
      try {
        await removeReaction({
          variables: { reactionId },
        });
      } catch (err) {
        console.error(err);
      }
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
          onClick={saveImage}
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
