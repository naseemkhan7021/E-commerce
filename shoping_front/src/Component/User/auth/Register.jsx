import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, registerAction } from '../../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';

// import Metadata from './Layout/Share/MetaData';

// import Loader from './Layout/Share/Loader';

const Register = () => {
     const [user, setUser] = useState({
          name: '',
          email: '',
          password: ''
     });
     const { name, email, password } = user;
     const [avtarPreview, setAvtarPreview] = useState('/images/default_avatar.jpg');
     const [avtar, setAvtar] = useState('');

     const alert = useAlert();
     const navigat = useNavigate();

     const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

     const dispatch = useDispatch();
     useEffect(() => {
          if (isAuthenticated) {
               navigat('/')
          }
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
     }, [dispatch, alert, error, isAuthenticated, navigat]);

     const hendleChange = e => {
          if (e.target.name === 'avtar') {
               const reader = new FileReader();
               reader.onload = () => {
                    if (reader.readyState === 2) {
                         setAvtarPreview(reader.result);
                         setAvtar(reader.result);
                    }
               }
               reader.readAsDataURL(e.target.files[0]);
          } else {
               setUser({ ...user, [e.target.name]: e.target.value })
          }
     }

     function submitForm(e) {
          e.preventDefault();
          const formData = new FormData();
          formData.set('name', name);
          formData.set('email', email);
          formData.set('password', password);
          formData.set('avtar', avtar);
          dispatch(registerAction(formData))
     }

     return (
          <div className="container container-fluid">
               <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                         <form onSubmit={submitForm} className="shadow-lg" encType='multipart/form-data'>
                              <h1 className="mb-3">Register</h1>


                              <div className="form-group">
                                   <label htmlfore="email_field">Name</label>
                                   <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name="name"
                                        value={name}
                                        onChange={hendleChange}
                                   />
                              </div>


                              <div className="form-group">
                                   <label htmlfore="email_field">Email</label>
                                   <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={hendleChange}
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlfore="password_field">Password</label>
                                   <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={hendleChange}
                                   />
                              </div>


                              <div className='form-group'>
                                   <label htmlfore='avatar_upload'>Avatar</label>
                                   <div className='d-flex align-items-center'>
                                        <div>
                                             <figure className='avatar mr-3 item-rtl'>
                                                  <img
                                                       src={avtarPreview}
                                                       className='rounded-circle'
                                                       alt={name}
                                                  />
                                             </figure>
                                        </div>
                                        <div className='custom-file'>
                                             <input
                                                  type='file'
                                                  name='avtar'
                                                  className='custom-file-input'
                                                  id='customFile'
                                                  accept='image/*'
                                                  onChange={hendleChange}
                                             />
                                             <label className='custom-file-label' htmlfore='customFile'>
                                                  Choose Avatar
                                             </label>
                                        </div>
                                   </div>
                              </div>

                              <button
                                   id="register_button"
                                   type="submit"
                                   className="btn btn-block py-3"
                                   disabled={loading ? true : false}
                              >
                                   REGISTER
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     );
}

export default Register;
