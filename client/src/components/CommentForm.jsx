import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";


import { ADD_COMMENT } from "../utils/mutations";

import { IoAddCircle } from "react-icons/io5";

const CommentForm= ({photoId} ) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const { loading, data } = useQuery(GET_ME);
  //const [addComment, { error }] = useMutation(ADD_COMMENT);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const userData = data?.me || {};

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);
    console.log(photoId, commentText, userData.username);

    const commentData = {
      photoId, 
      commentText, 
      commentAuthor: userData.username
    }
    console.log(commentData);
    
    try {
      const commentResponse = await addComment({
        variables: {...commentData},
      });
      console.log(commentResponse);
      setCommentText("");
    } catch (err) {
       //console.error(err);
       console.log(err.name, err.message);
    };
     
    //console.log("comment submitted");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col border-2 border-sky-400 bg-sky-200 rounded-xl w-full p-2 mx-auto">
        <form onSubmit={handleFormSubmit}>
          <div className="my-2">
            <textarea
              name="commentText"
              placeholder="...comment goes here"
              value={commentText}
              className="px-4 py-2 w-full rounded"
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            className="p-2 bg-sky-300 hover:bg-sky-500 flex w-full justify-center "
            type="submit"
          >
            <IoAddCircle className="text-2xl mr-2" />
            <p>Add Comment</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
