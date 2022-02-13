import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, loadUserAction, updateUserProfileAction } from '../../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../../constants/user_Ctn';
import Metadata from '../../Layout/Share/MetaData';

const UpdateProfile = () => {

     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [avtarPreview, setAvtarPreview] = useState('/images/default_avatar.jpg');
     const [avtar, setAvtar] = useState('');

     const alert = useAlert();
     const navigat = useNavigate();
     const dispatch = useDispatch();

     const { user } = useSelector((state) => state.auth);
     const { error, loading, isUpdated } = useSelector((state) => state.user);

     useEffect(() => {
          if (user) {
               setName(user.name);
               setEmail(user.email);
               setAvtarPreview(user.avtar.url);
          }
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
          if (isUpdated) {
               alert.success("User Update successfully !!!");
               dispatch(loadUserAction())
               navigat('/profile/me')

               dispatch({
                    type: UPDATE_PROFILE_RESET
               })
          }
     }, [dispatch, alert, error, isUpdated, navigat]);

     const hendleChange = e => {
          const reader = new FileReader();
          reader.onload = () => {
               if (reader.readyState === 2) {
                    setAvtarPreview(reader.result);
                    setAvtar(reader.result);
               }
          }
          reader.readAsDataURL(e.target.files[0]);
     }

     function submitForm(e) {
          console.log('submit');
          e.preventDefault();
          const formData = new FormData();
          formData.set('name', name);
          formData.set('email', email);
          formData.set('avtar', avtar);
          dispatch(updateUserProfileAction(formData))
     }



     return (
          <>
               < Metadata title={`Update - ${name} Profile`} />
               <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                         <form onSubmit={submitForm} className="shadow-lg" encType='multipart/form-data'>
                              <h1 className="mt-2 mb-5">Update Profile</h1>

                              <div className="form-group">
                                   <label htmlFor="email_field">Name</label>
                                   <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                   />
                              </div>


                              <div className="form-group">
                                   <label htmlFor="email_field">Email</label>
                                   <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                   />
                              </div>


                              <div className='form-group'>
                                   <label htmlFor='avatar_upload'>Avatar</label>
                                   <div className='d-flex align-items-center'>
                                        <div>
                                             <figure className='avatar mr-3 item-rtl'>
                                                  <img
                                                       src={avtarPreview}
                                                       className='rounded-circle'
                                                       alt='Avatar Preview'
                                                  />
                                             </figure>
                                        </div>
                                        <div className='custom-file'>
                                             <input
                                                  type='file'
                                                  name='avatar'
                                                  className='custom-file-input'
                                                  id='customFile'
                                                  accept='image/*'
                                                  onChange={hendleChange}
                                             />
                                             <label className='custom-file-label' htmlFor='customFile'>
                                                  Choose Avatar
                                             </label>
                                        </div>
                                   </div>
                              </div>

                              <button
                                   disabled={loading ? true : false}
                                   id='update_btn'
                                   type="submit"
                                   className="btn update-btn btn-block mt-4 mb-3"
                              >
                                   Update
                              </button>
                         </form>
                    </div>
               </div>

          </>
     );
}

export default UpdateProfile;
