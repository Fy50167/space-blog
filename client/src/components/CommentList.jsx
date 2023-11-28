import React, { useState, useEffect } from "react";

import { FaComments } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";

import CommentForm from "./CommentForm";

const CommentList = ({ photoId }) => {
  const [viewComments, setViewComments] = useState(false);

  const handleViewComments = () => {
    setViewComments((prevState) => !prevState);
  };
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

        <div className="bg-slate-300 rounded overflow-hidden shadow-lg m-4">
          <div className="flex p-2 bg-slate-100 m-2 rounded-md justify-between">
            <div>
              <h3>First Name</h3>
              <h4 className="ml-1 text-slate-500">@username</h4>
            </div>
            <div>
              <p className="ml-1 text-slate-500">01/01/2000</p>
            </div>
          </div>
          <p className="text-gray-700 flex p-3">Comment text goes here.</p>
          
        </div>
        <CommentForm photoId ={photoId}/>
        </div>
      )}
    </div>
  );
};

export default CommentList;
