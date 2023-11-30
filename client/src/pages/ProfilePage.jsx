import { Navigate, useParams } from 'react-router-dom';
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { REMOVE_IMAGE } from "../utils/mutations";


export default function ProfilePage() {
  const [selectedApod, setSelectedApod] = useState(null);
  const [removeImage] = useMutation(REMOVE_IMAGE);

  const { loading, data } = useQuery(GET_ME, {
  });

  const user = data?.me || data?.user || {};


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?._id) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }


  const deleteImage = async (id) => {
    try {
      const {data} = await removeImage({
        variables: { 
          photoId: id
        }
      });
      console.log({data});
    } catch (err) {
      console.error(err);
    }
  }


  console.log(user.savedImages);
  return (
    <>
      <div className = {(user.savedImages.length === 0 ? 'page-content profile-page fill-page' : 'page-content')}>
        <div className = 'profile'>
          <h2>This is your profile page!</h2>
          <h3>Username: {user.username}</h3>
          <h3>Email: {user.email}</h3>
        </div>

        {(user.savedImages.length === 0?
          <div className = 'empty-gallery text-white'>
            You don't have any saved images!
          </div>
        :  
          <div className = 'w-full p-4'>
              <h3 className = 'text-white font-bold text-3xl'>Saved Images</h3>  
              <div className = 'profile-gallery'>
              {user.savedImages.map((apod, index) => (
                <div key={index} className="item profile-item">
                  <FaRegTrashAlt className = 'trash-icon' onClick = {() => deleteImage(apod.photoId)}/>
                  {apod && <img src={apod.photoId}/>}
                  <div className="flex w-full bg-slate-400 p-2">
                    <a href = {apod.photoId} target = '_blank'> 
                        <FaMagnifyingGlass
                        className="text-2xl"
                        onClick={() => openPopup(apod)}
                        />
                    </a>
                    <p className = 'pl-2'>Click me to view the full image!</p>
                  </div>
                </div>
                  
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );

}
