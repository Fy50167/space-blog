import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { BsFillSaveFill } from "react-icons/bs";
import { BsSave } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

import Likes from "./Likes";

import Auth from "../utils/auth";

const ReactionForm = (photo) => {
  
  const [save, setSave] = useState(false);


  const saveImage = () => {
    setSave((prevState) => !prevState);
  };

 
  return (
    <div className="flex w-1/2 ml-2">
      {Auth.loggedIn() ? (
              <>
                <Likes data ={photo}/>
              </>
            ) : (
              <Link
                to="/login"
                className="flex w-1/8 p-2"
              >
                <FaHeart className="text-red-600 text-2xl"/>
              </Link>
            )}
      <h2 onClick={saveImage} className="w-1/4 p-2">
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
