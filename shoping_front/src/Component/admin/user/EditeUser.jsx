import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ADMIN_UPDATE_USER_RESET } from '../../../constants/user_Ctn';
import { updateuserAction, userDetailsAction } from '../../../redux/action/admin/user';
import Loader from '../../Layout/Share/Loader';

const Editeuser = () => {

     const [name, setName] = useState('');
     const [role, setRole] = useState('');

     const { loading, error, user } = useSelector(state => state.userDetails)
     const { loading: updateLoading, error: updateError, success } = useSelector(state => state.udUser)
     // const [email, setEmail] = useState('');

     const { u_id } = useParams();
     const navigate = useNavigate()
     const alert = useAlert();
     const dispatch = useDispatch()

     useEffect(() => {
          if (user && user._id !== u_id) {
               dispatch(userDetailsAction(u_id));
          } else {
               // dispatch(getuserDetails(p_id));
               setName(user.name)
               setRole(user.role)
               // setEmail(user.email)
          }
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
          if (updateError) {
               alert.error(updateError)
               dispatch(clearErrors())
          }
          if (success) {
               alert.success('User Update successfully !!!')
               dispatch({
                    type: ADMIN_UPDATE_USER_RESET
               });
               navigate('/admin/users')
          }
     }, [dispatch, alert, error, u_id, user, success, updateError])

     const submitForm = (e) => {
          e.preventDefault();
          const data = {
               name,
               role
          }
          dispatch(updateuserAction(u_id, data))
     }

     return (
          <div className="col-12 col-md-10">
               <div className="row wrapper">
                    <div className="col-md-5">
                         <form className="shadow-lg" onSubmit={submitForm}>
                              <h1 className="mt-2 mb-5">Update User</h1>


                              <div className="form-group">
                                   <label htmlFor="name_field">Name</label>
                                   {
                                        loading ? (< Loader />) : (
                                             <input
                                                  type="name"
                                                  id="name_field"
                                                  className="form-control"
                                                  name='name'
                                                  value={name}
                                                  onChange={(e) => setName(e.target.value)}
                                             />
                                        )
                                   }
                              </div>


                              {/* <div className="form-group">
                                   <label htmlFor="email_field">Email</label>
                                   <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value=''
                                   />
                              </div> */}


                              <div className="form-group">
                                   <label htmlFor="role_field">Role</label>
                                   {
                                        loading ? (< Loader />) : (
                                             <select
                                                  id="role_field"
                                                  className="form-control"
                                                  name='role'
                                                  value={role}
                                                  onChange={(e) => setRole(e.target.value)}
                                             >
                                                  <option value="user">user</option>
                                                  <option value="admin">admin</option>
                                             </select>
                                        )
                                   }
                              </div>


                              <button disabled={updateLoading ? true : false} type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                         </form>
                    </div>

               </div>
          </div>
     );
}

export default Editeuser;
