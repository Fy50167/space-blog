import { useState } from "react";
//import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";

import { ADD_COMMENT } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

import { IoAddCircle } from "react-icons/io5";

const CommentForm = () => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error, data }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    
    // Not sure how we're supposed to get the photoId since we need to pass that into the added comment
    try {
      const commentResponse = addComment({
        variables: {
          commentText,
          commentAuthor: Auth.getProfile().authenticatedPerson.username,
        },
      });
      console.log(commentResponse);
      setCommentText("");
    } catch (err) {
       console.error(err);
    };
     
    console.log("form submitted");
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
