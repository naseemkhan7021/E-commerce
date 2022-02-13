import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassowrdAction } from '../../../redux/action/userAction';
import Metadata from '../../Layout/Share/MetaData';

const Forgotpassword = () => {
     const [email, setEmail] = useState('');
     const [successMessage, setSuccessMessage] = useState('');

     const { loading, error, message } = useSelector(state => state.forgotPassowrd)
     const dispatch = useDispatch();
     const alert = useAlert();


     useEffect(() => {
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
          if (message) {
               alert.success(message)
               setSuccessMessage('Check you Email now !!!')
          }
     }, [dispatch, alert, error, message]);

     const submitForm = e => {
          e.preventDefault();
          dispatch(forgotPassowrdAction({ email }));
     }


     return (
          <>
               < Metadata title={'Forgot Password'} />
               <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                         <form className="shadow-lg" onSubmit={submitForm}>
                              <h1 className="mb-3">Forgot Password</h1>
                              <div className="form-group">
                                   <label htmlFor="email_field">Enter Email</label>
                                   <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                   />
                                   {successMessage && (
                                        <small className="text-success">{successMessage}</small>
                                   )}
                              </div>


                              <button
                                   id="forgot_password_button"
                                   type="submit"
                                   className="btn btn-block py-3"
                                   disabled={loading ? true : false}
                              >
                                   Send Email
                              </button>


                         </form>
                    </div>
               </div>
          </>
     );
}

export default Forgotpassword;
