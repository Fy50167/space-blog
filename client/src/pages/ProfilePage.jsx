import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { GET_ME, GET_USER } from '../utils/queries';
import Auth from '../utils/auth';


export default function ProfilePage() {

  const id = useParams();

  const { loading, data } = useQuery(GET_ME, {
    variables: { _id: id },
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

  return (
    <>
      <div className = {(user.savedImages.length === 0 ? 'page-content profile-page fill-page' : 'page-content')}>
        <div className = 'profile'>
          <h2>This is your profile page!</h2>
          <h3>Username: {user.username}</h3>
          <h3>Email: {user.email}</h3>
        </div>

        {(user.savedImages.length === 0?
          <div className = 'empty-gallery'>
            You don't have any saved images!
          </div>
        :
          <div className = 'profile-gallery'>
            This is your gallery!
          </div>
        )}
      </div>
    </>
  );

}
