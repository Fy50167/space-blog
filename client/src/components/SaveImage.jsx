import React, { useState, useEffect } from "react";
import { BsFillSaveFill } from "react-icons/bs";
import { BsSave } from "react-icons/bs";
import { GET_ME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_IMAGE, REMOVE_IMAGE } from "../utils/mutations";
import Auth from "../utils/auth";

export const SaveImage = (photo) => {
    const [saveImage] = useMutation(SAVE_IMAGE);
    const [removeImage] = useMutation(REMOVE_IMAGE);
    const [saved, setSaved] = useState(false);

    const { loading, error, data, refetch } = useQuery(GET_ME, {
    });

    const user = data?.me || data?.user || {};

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleImage = async (event) => {
        event.preventDefault();
    
        if (!saved) {
          try {
            const { data } = await saveImage({
              variables: {
                photoId: photo.data.data.url
              },
            });
            console.log({data});
          } catch (err) {
            console.error(err);
          }
        } else {
          try {
            const {data} = await removeImage({
              variables: { 
                photoId: photo.data.data.url
              }
            });
            console.log({data});
          } catch (err) {
            console.error(err);
          }
        }
        refetch();
    
        setSaved((prevState) => !prevState);
    };

    return (
        <div className="flex w-1/4 ml-2">
            <h2 onClick={handleImage} className="flex w-1/8 justify-between p-2">
                {saved ? (
                <BsFillSaveFill className="text-white text-2xl" />
                ) : (
                <BsSave className="text-white text-2xl" />
                )}
            </h2>
        </div>
        );
};

export default SaveImage;