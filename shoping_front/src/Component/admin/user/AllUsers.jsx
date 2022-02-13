import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Layout/Share/Loader';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../../redux/action/userAction';
import { deleteuserAction, showAlluserAction } from '../../../redux/action/admin/user';
import { ADMIN_DELETE_USER_RESET } from '../../../constants/user_Ctn';

const Allusers = () => {
     const { loading, error, users } = useSelector(state => state.allusers)
     const { loading: deleteLoading, error: deleteError, success } = useSelector(state => state.udUser)
     const alert = useAlert();
     const dispatch = useDispatch()

     useEffect(() => {
          dispatch(showAlluserAction())
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
          if (deleteError) {
               alert.error(deleteError)
               dispatch(clearErrors())
          }
          if (success) {
               alert.success('User Deleted successfully !!!')
               dispatch({
                    type: ADMIN_DELETE_USER_RESET
               })
          }
     }, [dispatch, alert, error, success, deleteError])

     const setUsersData = () => {
          const data = {
               columns: [
                    {
                         label: 'Avatar',
                         field: 'avatar'
                    },
                    {
                         label: 'user ID',
                         field: 'u_id',
                         sort: 'acs'
                    },
                    {
                         label: 'Name',
                         field: 'name',
                         sort: 'acs'
                    },
                    {
                         label: 'Email',
                         field: 'email',
                         sort: 'acs'
                    },
                    {
                         label: 'Join in',
                         field: 'created_dt',
                         sort: 'acs'
                    },
                    {
                         label: 'Role',
                         field: 'role',
                         sort: 'acs'
                    },
                    {
                         label: 'Actions',
                         field: 'actions'
                    },
               ],
               rows: []
          };

          users && users.forEach(user => {
               data.rows.push({
                    avatar: <figure className="avatar avatar-nav">
                         <img
                              src={user.avtar && user.avtar.url}
                              alt={user && user.name}
                              className="rounded"
                         />
                    </figure>,

                    u_id: user._id,
                    name: user.name,
                    email: user.email,
                    created_dt: new Date(user.createdAt).toDateString(),
                    role: user.role,
                    actions: <div className=''>
                         <Link to={`/admin/user/${user._id}`} className='btn btn-primary py-1 px-2'>
                              <i className='fa fa-eye'></i>
                         </Link>
                         <button disabled={deleteLoading ? true : false} onClick={() => deleteBtnClicked(user._id)} className='btn btn-danger py-1 px-2 ml-1' >
                              <i className='fa fa-trash'></i>
                         </button>
                    </div>
               })
          });

          return data
     }

     const deleteBtnClicked = (u_id) => {
          dispatch(deleteuserAction(u_id))
     }

     return (
          <div className="col-12 col-md-10">
               <h2 className="m-3">All Users</h2>
               {
                    loading ? (< Loader />) : (
                         <>
                              <MDBDataTable
                                   className='px-3'
                                   data={setUsersData()}
                                   bordered
                                   striped
                                   hover
                              />
                              {/* {JSON.stringify(orders)} */}
                         </>
                    )
               }
          </div>
     );
}

export default Allusers;
