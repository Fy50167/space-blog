import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';


export default function ProfilePage() {

  const { id } = useParams();

  const { loading, data } = useQuery(GET_ME, {
    variables: { userId: id },
  });

  const user = data?.me || {};
  // navigate to personal profile page if username is yours

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div>
          Put Profile Page here
        </div>
      </>
    );
}
}
