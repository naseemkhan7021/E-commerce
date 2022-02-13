import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, loadUserAction, updatePassowrdAction } from '../../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';
import Metadata from '../../Layout/Share/MetaData';
import { UPDATE_PASSWORD_RESET } from '../../../constants/user_Ctn';

const Updatepassword = () => {
     const [oldPassword, setOldPassword] = useState('');
     const [newPassword, setNewPassword] = useState('');

     const alert = useAlert();
     const navigat = useNavigate();
     const dispatch = useDispatch();

     const { user } = useSelector((state) => state.auth);
     const { error, loading, isUpdated } = useSelector((state) => state.user);

     useEffect(() => {
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
          if (isUpdated) {
               alert.success("User Update successfully !!!");
               dispatch(loadUserAction())
               navigat('/profile/me')

               dispatch({
                    type: UPDATE_PASSWORD_RESET
               })
          }
     }, [dispatch, alert, error, isUpdated]);

     function submitForm(e) {
          e.preventDefault();
          dispatch(updatePassowrdAction({ oldPassword, newPassword }))
     }

     return (
          <>
               <Metadata title={`Change Password - ${user.name}`} />
               <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                         <form className="shadow-lg">
                              <h1 className="mt-2 mb-5">Update Password</h1>
                              <div className="form-group">
                                   <label htmlFor="old_password_field">Old Password</label>
                                   <input
                                        type="password"
                                        id="old_password_field"
                                        className="form-control"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                   />
                              </div>


                              <div className="form-group">
                                   <label htmlFor="new_password_field">New Password</label>
                                   <input
                                        type="password"
                                        id="new_password_field"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                   />
                              </div>


                              <button disabled={loading ? true : false} type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                         </form>
                    </div>
               </div>
          </>
     );
}

export default Updatepassword;
