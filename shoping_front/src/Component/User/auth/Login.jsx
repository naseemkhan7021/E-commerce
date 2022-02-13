import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearErrors, loginAction } from '../../../redux/action/userAction';

const Login = () => {

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const alert = useAlert();
     const navigat = useNavigate();
     const { search } = useLocation();

     const { loading, error, isAuthenticated } = useSelector((state) => state.auth)
     const dispatch = useDispatch();
     const redirect = new URLSearchParams(search)
     useEffect(() => {
          // console.log('search -> ', search, 'redirect -> ', redirect);
          if (isAuthenticated) {
               navigat(redirect.get('redirect') ? `/${redirect.get('redirect')}` : '/')
          }
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
     }, [dispatch, alert, error, isAuthenticated, navigat]);

     function submitLoginForm(e) {
          e.preventDefault();
          dispatch(loginAction(email, password))
     }

     return (
          <div className="container container-fluid">
               <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                         <form onSubmit={submitLoginForm} className="shadow-lg">
                              <h1 className="mb-3">Login</h1>
                              <div className="form-group">
                                   <label htmlFor="email_field">Email</label>
                                   <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                   />
                              </div>

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

                              <div className="">

                                   <Link to="/auth/register" className=" ">New User ? | </Link>
                                   <Link to="/auth/password/forgot" className=" "> Forgot Password ?</Link>
                              </div>
                              <button
                                   id="login_button"
                                   type="submit"
                                   className="btn btn-block py-3"
                                   disabled={loading ? true : false}
                              >
                                   LOGIN
                              </button>


                         </form>
                    </div>
               </div>
          </div>
     );
}

export default Login;
