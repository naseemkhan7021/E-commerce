import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CURRENCY } from '../../constants/variable';
import { getAllOrdersAction } from '../../redux/action/admin/order';
import { getAllProductsAction } from '../../redux/action/admin/products';
import { showAlluserAction } from '../../redux/action/admin/user';
import { clearErrors } from '../../redux/action/productAct';
import Loader from '../Layout/Share/Loader';
import Metadata from '../Layout/Share/MetaData';

const Dashboard = () => {

     const { loading: productLoading, error, totalProducts, outOfStockProducts } = useSelector(state => state.products)
     const { loading: orderLoading, error: orderError, totalOrders, totalAmount } = useSelector(state => state.allOrders)
     const { loading: userLoading, error: userError, totalusersCount } = useSelector(state => state.allusers)
     const alert = useAlert();
     const dispatch = useDispatch()

     useEffect(() => {
          dispatch(getAllProductsAction())
          dispatch(getAllOrdersAction())
          dispatch(showAlluserAction())
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
          if (orderError) {
               alert.error(orderError)
               dispatch(clearErrors())
          }
          if (userError) {
               alert.error(userError)
               dispatch(clearErrors())
          }
     }, [dispatch, alert, error, orderError, userError])


     return (


          <div className="col-12 col-md-10">
               <h1 className="my-4">Dashboard</h1>
               <Metadata title={`Admin - Dashboard`} />
               <div className="row pr-4">
                    <div className="col-xl-12 col-sm-12 mb-3">
                         <div className="card text-white bg-primary o-hidden h-100">
                              <div className="card-body">
                                   <div className="text-center card-font-size">Total Amount<br /> <b>{CURRENCY}{totalAmount}</b>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               <div className="row pr-4">
                    <div className="col-xl-3 col-sm-6 mb-3">
                         <div className="card text-white bg-success o-hidden h-100">
                              <div className="card-body">
                                   <div className="text-center card-font-size">Products<br /> <b>{
                                        productLoading ? <Loader color='loader-white' /> : totalProducts
                                   }</b></div>
                              </div>
                              <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                   <span className="float-left">View Details</span>
                                   <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                   </span>
                              </Link>
                         </div>
                    </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                         <div className="card text-white bg-warning o-hidden h-100">
                              <div className="card-body">
                                   <div className="text-center card-font-size">Orders<br /> <b>{
                                        orderLoading ? <Loader color='loader-white' /> : totalOrders
                                   }</b></div>
                              </div>
                              <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                   <span className="float-left">View Details</span>
                                   <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                   </span>
                              </Link>
                         </div>
                    </div>




                    <div className="col-xl-3 col-sm-6 mb-3">
                         <div className="card text-white bg-info o-hidden h-100">
                              <div className="card-body">
                                   <div className="text-center card-font-size">Users<br /> <b>{
                                        userLoading ? <Loader color='loader-white' /> : totalusersCount
                                   }</b></div>
                              </div>
                              <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                   <span className="float-left">View Details</span>
                                   <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                   </span>
                              </Link>
                         </div>
                    </div>




                    <div className="col-xl-3 col-sm-6 mb-3">
                         <div className="card text-white bg-danger o-hidden h-100">
                              <div className="card-body">
                                   <div className="text-center card-font-size">Out of Stock<br /> <b>{
                                        orderLoading ? <Loader color='loader-white' /> : outOfStockProducts
                                   }</b></div>
                              </div>
                         </div>
                    </div>
               </div>


          </div>
     );
}

export default Dashboard;
