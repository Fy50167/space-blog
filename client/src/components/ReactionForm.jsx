import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { BsFillSaveFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

import Likes from "./Likes";
import SaveImage from "./SaveImage";

import Auth from "../utils/auth";

const ReactionForm = (photo) => {
 
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
      {Auth.loggedIn() ? (
              <>
                <SaveImage data ={photo}/>
              </>
            ) : (
              <Link
                to="/login"
                className="flex w-1/8 p-2"
              >
                <BsFillSaveFill className="text-white text-2xl"/>
              </Link>
            )}
    </div>
  );
};

export default ReactionForm;
