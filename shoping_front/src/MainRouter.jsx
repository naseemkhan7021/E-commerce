import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Footer from "./Component/Layout/Footer";
import Header from "./Component/Layout/Header";
import Productdetails from "./Component/Product/ProductDetails";
import Changepassword from "./Component/User/auth/Changepassword";
import Forgotpassword from "./Component/User/auth/ForgotPassword";
import Login from "./Component/User/auth/Login";
import Register from "./Component/User/auth/Register";
import Resetpassword from "./Component/User/auth/ResetPassword";
import Profile from "./Component/User/profile/Showprofile";
import Myorder from "./Component/order/Myorder"
import ProtectedRoute from "./Component/route/ProtectedRoute";
import { Fragment, useEffect, useState } from "react";
import UpdateProfile from "./Component/User/profile/Update";
import Allcarditems from "./Component/card/AllCardItems";
import Shippinginfo from "./Component/card/ShippingInfo";
import Mysingleorder from "./Component/order/MySingleOrder";
import Confirmorder from "./Component/order/ConfirmOrder"
import Ordersuccess from "./Component/order/OrderSuccess"
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getStripKeyAPI } from "./api/payment/reqkey";
import PaymentProcess from "./Component/payment/Paymentprocess";

// admin route
import Orders from "./Component/order/Orders";
import Sidebar from "./Component/Layout/Share/admin/Sidebar";
import Dashboard from "./Component/admin/Deshboard";
import Allproducts from "./Component/admin/products/AllProducts";
import Createproduct from "./Component/admin/products/createProduct";
import AllOrders from "./Component/admin/orders/Allorders";

// stripe import 
import { Elements } from '@stripe/react-stripe-js'

// redux
import store from "./redux/store";
import { loadUserAction,clearErrors } from "./redux/action/userAction";
import { loadStripe } from "@stripe/stripe-js";
import EditeProduct from "./Component/admin/products/EditeProduct";
import Proccessorder from "./Component/admin/orders/ProccessOrder";
import Allusers from "./Component/admin/user/AllUsers";
import Editeuser from "./Component/admin/user/EditeUser";
import Allreviews from "./Component/admin/products/Allreviews";
// withRouter HOC: in route v6

const Mainrouter = () => {
     const [stripeApi, setStripeApi] = useState('');
     const alert = useAlert()
     const { error } = useSelector(state => state.auth);
     useEffect(() => {
          if(error){
               alert.error(error);
               store.dispatch(clearErrors());
          }
          store.dispatch(loadUserAction());
          getStripAPIKey();
     }, []);

     async function getStripAPIKey() {
          try {
               const { data } = await getStripKeyAPI();

               setStripeApi(data.stripe_key);
          } catch (error) {
               alert.error(error.response.data.message);
          }
     }

     return (
          <>
               <Header />
               <Routes>
                    <Route path='/' element={<Home />} />

                    <Fragment className="container">
                         <Route path='/search/:keyWord' element={<Home />} />
                         <Route path='/product/:p_id' element={<Productdetails />} />

                         <Route path='/auth'>
                              <Route path='login' element={<Login />} />
                              <Route path='register' element={<Register />} />
                              <Route path='password' >
                                   <Route path='forgot' element={<Forgotpassword />} />
                                   <Route path='reset/:token' element={<Resetpassword />} />
                                   <Route path='change' element={<Changepassword />} />
                              </Route>
                         </Route>

                         <Route path='/orders' element={<Orders />} >
                              <Route path='me' element={<Myorder />} >
                                   <Route path=':o_id' element={<Mysingleorder />} />
                              </Route>

                              <Route path='confirm' element={<Confirmorder />} />
                              <Route path='success' element={<Ordersuccess />} />
                              {
                                   stripeApi &&
                                   <Route path='payment' element={
                                        <ProtectedRoute >
                                             <Elements stripe={loadStripe(stripeApi)} ><PaymentProcess /></Elements>
                                        </ProtectedRoute>
                                   }
                                   />

                              }
                         </Route>

                         <Route path='/card' element={<Allcarditems />} />
                         <Route path='/shippinginfo' element={<ProtectedRoute ><Shippinginfo /></ProtectedRoute>} />

                         <Route path='/profile'>
                              <Route path='me' element={<ProtectedRoute ><Profile /></ProtectedRoute>} />
                              {/* <Route path='me' element={<Profile />} /> */}
                              <Route path='me/update' element={<ProtectedRoute ><UpdateProfile /></ProtectedRoute>} />
                         </Route>
                    </Fragment>


                    <Route path='/admin' element={<ProtectedRoute Admin={true}><Sidebar /></ProtectedRoute>}>
                         <Route path='dashboard' element={<Dashboard />} />

                         <Route path='orders' element={<AllOrders />} />
                         <Route path='order/:o_id' element={<Proccessorder />} />

                         <Route path='products' element={<Allproducts />} />
                         <Route path='product' >
                              <Route path='new' element={<Createproduct />} />
                              <Route path=':p_id' element={<EditeProduct />} />
                              <Route path='reviews' element={<Allreviews />} />
                         </Route>

                         <Route path='users' element={<Allusers />} />
                         <Route path='user/:u_id' element={<Editeuser />} />
                    </Route>

               </Routes>
               <Footer />
          </ >
     )
};


export default Mainrouter;
