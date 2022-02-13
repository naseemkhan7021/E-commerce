import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'

const Sidebar = () => {
     return (
          <>
               <div className="row">
                    <div className="col-2">
                         <div className="sidebar-wrapper">
                              <nav id="sidebar">
                                   <ul className="list-unstyled components">
                                        <li>
                                             <NavLink to='/admin/dashboard' className={({ isActive }) =>
                                                  isActive ? 'sidebar-active' : ''
                                             }
                                             ><i className="fa fa-dashboard"></i> Dashboard</NavLink>
                                        </li>

                                        <li>
                                             <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                                  className="fab fa-product-hunt"></i> Products</a>
                                             <ul className="collapse list-unstyled" id="productSubmenu">
                                                  <li>
                                                       <NavLink to='/admin/products' className={({ isActive }) =>
                                                            isActive ? 'sidebar-active' : ''
                                                       }
                                                       ><i className="fa fa-clipboard"></i> All</NavLink>
                                                  </li>

                                                  <li>
                                                       <NavLink to='/admin/product/new' className={({ isActive }) =>
                                                            isActive ? 'sidebar-active' : ''
                                                       }><i className="fa fa-plus"></i> Create</NavLink>
                                                  </li>
                                             </ul>
                                        </li>


                                        <li>
                                             <NavLink to='/admin/orders' className={({ isActive }) =>
                                                  isActive ? 'sidebar-active' : ''
                                             }><i className="fa fa-shopping-basket"></i> Orders</NavLink>
                                        </li>


                                        <li>
                                             <NavLink to='/admin/users' className={({ isActive }) =>
                                                  isActive ? 'sidebar-active' : ''
                                             }><i className="fa fa-users"></i> Users</NavLink>
                                        </li>

                                        <li>
                                             <NavLink to='/admin/product/reviews' className={({ isActive }) =>
                                                  isActive ? 'sidebar-active' : ''
                                             }><i className="fa fa-star"></i> Reviews</NavLink>
                                        </li>

                                   </ul>
                              </nav>
                         </div>
                    </div>
                    <Outlet />
               </div>

          </>
     );
}

export default Sidebar;
