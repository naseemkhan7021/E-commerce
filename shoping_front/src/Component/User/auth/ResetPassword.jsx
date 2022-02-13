import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPassowrdAction } from '../../../redux/action/userAction';
import Metadata from '../../Layout/Share/MetaData';

const Resetpassword = () => {
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');

     const { loading, error, success } = useSelector(state => state.forgotPassowrd)
     const dispatch = useDispatch();
     const alert = useAlert();
     const navigat = useNavigate();
     const { token } = useParams();


     useEffect(() => {
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
          if (success) {
               navigat('/auth/login')
               alert.success("Password updated successfully !!!")
          }
     }, [dispatch, alert, error, success, navigat]);

     const submitForm = e => {
          e.preventDefault();
          dispatch(resetPassowrdAction(token, { password, confirmPassword }));
     }


     return (
          <>
               < Metadata title={'Reset Password'} />
               <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                         <form className="shadow-lg" onSubmit={submitForm}>
                              <h1 className="mb-3">New Password</h1>

                              <div className="form-group">
                                   <label htmlFor="password_field">Password</label>
                                   <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                   />
                              </div>


                              <div className="form-group">
                                   <label htmlFor="confirm_password_field">Confirm Password</label>
                                   <input
                                        type="password"
                                        id="confirm_password_field"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                   />
                              </div>


                              <button
                                   id="new_password_button"
                                   type="submit"
                                   className="btn btn-block py-3"
                                   disabled={loading ? true : false}
                              >
                                   Set Password
                              </button>


                         </form>
                    </div>
               </div>
          </>
     );
}

export default Resetpassword;
