import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";

import { ADD_COMMENT } from "../../utils/mutations";
//import get me query for user information

const CommentForm = () => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  // Set up our mutation with an option to handle errors
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_COMMENT` mutation
    try {
      const { data } = addComment({
        variables: {
          commentText,
          commentAuthor: Auth.getProfile().authenticatedPerson.username,
        },
      });
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
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
      <h3 className="text-3xl my-4">Comment: </h3>
      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-red-600" : ""
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">Something went wrong...</span>}
          </p>
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <form onSubmit={handleFormSubmit}>
              <div className="my-4">
                <textarea
                  name="commentText"
                  placeholder="...comment goes here"
                  value={formState.commentText}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="justify-center">
                <button className="p-2 bg-sky-300 m-8" type="submit">
                  <SlPlus /> Add Comment
                </button>
              </div>
              {error && <div className="">Something went wrong...</div>}
            </form>
          </div>
        </>
      ) : (
        <p>
          You need to be logged in to comment. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
