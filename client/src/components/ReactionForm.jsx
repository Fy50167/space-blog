import React, { useState, useEffect } from "react";

import { BsFillSaveFill } from "react-icons/bs";
import { BsSave } from "react-icons/bs";

import Likes from "./Likes";

import { useMutation, useQuery } from "@apollo/client";

import { QUERY_REACTIONS } from "../utils/queries";
import { ADD_REACTION, REMOVE_REACTION } from "../utils/mutations";

import Auth from "../utils/auth";

const ReactionForm = (photo) => {
  
  const [save, setSave] = useState(false);


  const saveImage = () => {
    setSave((prevState) => !prevState);
  };

 
  return (
    <div className="flex w-1/4 ml-2">
      {Auth.loggedIn() && <Likes data ={photo}/>}
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
