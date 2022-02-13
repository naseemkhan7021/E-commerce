import React from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUserAction } from '../../../redux/action/userAction';
import Loader from '../../Layout/Share/Loader';
import Metadata from '../../Layout/Share/MetaData';

const Profile = () => {

     const { loading, isAuthenticated, user } = useSelector(state => state.auth);
     const dispatch = useDispatch()
     const alert = useAlert();

     // dispatch(loadUserAction())
     // console.log('loading -> ', loading, ' isAuthenticated -> ', isAuthenticated);

     return (
          <div className="container container-fluid">
               {
                    loading ? (< Loader />) : (
                         <>
                              <Metadata title={`${user.name} - Profile`} />
                              <h2 className="mt-5 ml-5">My Profile</h2>
                              <div className="row justify-content-around mt-5 user-info">
                                   <div className="col-12 col-md-3">
                                        <figure className='avatar avatar-profile'>
                                             <img className="rounded-circle img-fluid" src={user.avtar && user.avtar.url} alt={user && user.name} />
                                        </figure>
                                        <Link to="/profile/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                             Edit Profile
                                        </Link>
                                   </div>

                                   <div className="col-12 col-md-5">
                                        <h4>Full Name</h4>
                                        <p>{user.name}</p>

                                        <h4>Email Address</h4>
                                        <p>{user.email}</p>

                                        <h4>Join on</h4>
                                        <p>{new Date(user.createdAt).toDateString()}</p>


                                        <Link to="/order/me" className="btn btn-danger btn-block mt-5">
                                             My Orders
                                        </Link>


                                        <Link to="/auth/password/change" className="btn btn-primary btn-block mt-3">
                                             Change Password
                                        </Link>
                                   </div>
                              </div></>
                    )
               }
          </div>
     );
}

export default Profile;
