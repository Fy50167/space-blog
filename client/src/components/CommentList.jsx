import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { FaComments } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";
import { RiDeleteBin3Line } from "react-icons/ri";

import { QUERY_COMMENTS } from "../utils/queries";
import { REMOVE_COMMENT } from "../utils/mutations";

import CommentForm from "./CommentForm";

const CommentList = ({ photoId }) => {
  const [viewComments, setViewComments] = useState(false);

  const [removeComment, { error }] = useMutation(REMOVE_COMMENT);

  const { loading, data } = useQuery(QUERY_COMMENTS, {
    variables: { photoId: photoId },
  });
  const comments = data?.comments || [];

  const handleViewComments = () => {
    setViewComments((prevState) => !prevState);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await removeComment({
        variables: { commentId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div
        className="flex w-1/8 justify-center p-2"
        onClick={handleViewComments}
      >
        {viewComments ? (
          <FaComments className="text-blue-600 text-2xl" />
        ) : (
          <FaRegComments className="text-blue-600 text-2xl" />
        )}
      </div>
      {viewComments && (
        <div>
          {comments &&
            comments.map((comment) => (
              <div>
                <div
                  key={comment._id}
                  className="bg-slate-300 rounded overflow-hidden shadow-lg m-4"
                >
                  <div className="flex p-2 bg-slate-100 m-2 rounded-md justify-between">
                    <div>
                      <h4 className="ml-1 text-slate-500">
                        @{comment.commentAuthor}
                      </h4>
                    </div>
                    <div>
                      <p className="ml-1 text-sm p-1 text-slate-500">{comment.createdAt}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 flex p-3 text-sm">
                    {comment.commentText}
                  </p>
                  <div className="p-2">
                    <RiDeleteBin3Line
                      className="flex text-red-700 text-2xl"
                      onClick={() => handleDeleteComment(comment._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          <CommentForm photoId={photoId} />
        </div>
      )}
    </div>
  );
};

export default CommentList;
