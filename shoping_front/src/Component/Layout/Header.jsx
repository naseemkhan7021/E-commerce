import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../redux/action/userAction';
import Search from './Share/Search';
// import { } from '4-types'

const Header = () => {

     const { loading, user } = useSelector(state => state.auth);
     const { cardItems } = useSelector(state => state.card);
     const dispatch = useDispatch();
     const alert = useAlert();

     const logoutHandler = () => {
          dispatch(logoutAction());
          alert.success('Logged out successfully.');
     }

     return (
          <>
               <nav className="navbar row">
                    <div className="col-12 col-md-3">
                         <div className="navbar-brand">
                              <Link to="/"><img style={{ maxWidth: '100%', height: '3rem' }} alt='shoping commerce' src="/images/logo.png" /></Link>
                         </div>
                    </div>

                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                         <Search />
                    </div>

                    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

                         {user ? (
                              <div className="ml-4 dropdown d-inline">
                                   <Link to="#" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                        <figure className="avatar avatar-nav">
                                             <img
                                                  src={user.avtar && user.avtar.url}
                                                  alt={user && user.name}
                                                  className="rounded-circle"
                                             />
                                        </figure>
                                        <span>{user && user.name}</span>
                                   </Link>

                                   <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                        {user && user.role === 'admin' && (
                                             <Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link>
                                        )}
                                        <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                        <Link className="dropdown-item" to="/profile/me">Profile</Link>
                                        <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                             Logout
                                        </Link>

                                   </div>


                              </div>

                         ) : !loading && <Link to="/auth/login" className="btn ml-4" id="login_btn">Login</Link>}

                         <Link to='/card' className="" id="">
                              <span id="cart" className="ml-3">Cart</span>
                              <span className="ml-1" id="cart_count">{cardItems.reduce((a, value) => a = a + value.quantity, 0)}</span>
                         </Link>
                    </div>
               </nav>
          </>
     );
}

export default Header;
