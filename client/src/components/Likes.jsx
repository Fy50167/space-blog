import React, { useState, useEffect } from "react";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import { useMutation, useQuery } from "@apollo/client";

import { QUERY_REACTIONS } from "../utils/queries";
import { ADD_REACTION, REMOVE_REACTION } from "../utils/mutations";

import Auth from "../utils/auth";

export const Likes = (photo) => {
  const [addReaction] = useMutation(ADD_REACTION);
  const [removeReaction] = useMutation(REMOVE_REACTION);

  const { loading, error, data, refetch } = useQuery(QUERY_REACTIONS, {
    variables: { photoId: photo.data.data.date },
  });

  const reactions = data?.reactions || [];
  console.log(photo.data.data.date, ":", reactions);

  const usersReaction =
    reactions.find(
      (element) => element.reactionAuthor === Auth.getProfile().data.username
    ) || [];

  const userLiked = usersReaction._id ? true : false;

  const [like, setLike] = useState(false);

  useEffect(() => {
    setLike(userLiked);
  }, [usersReaction._id]);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const handleLikes = async (event) => {
    event.preventDefault();

    if (!like) {
      try {
        const { data } = await addReaction({
          variables: {
            photoId: photo.data.data.date,
            // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username
            reactionAuthor: Auth.getProfile().data.username,
          },
        });
        console.log("add");
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await removeReaction({
          variables: { reactionId: usersReaction._id },
        });
        console.log("remove");
      } catch (err) {
        console.error(err);
      }
    }
    refetch();

    setLike((prevState) => !prevState);
  };
  return (
    <div className="flex w-1/2 ml-2">
      <h2 onClick={handleLikes} className="flex w-1/8 justify-between p-2">
        {like ? (
          <FaHeart className="text-red-600 text-2xl" />
        ) : (
          <FaRegHeart className="text-red-600 text-2xl" />
        )}
      </h2>
      <h2 className="w-1/8 p-2 text-white">{reactions.length}</h2>
    </div>
  );
};

export default Likes;
