import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CURRENCY, env_shippingPrice, env_texParcent } from '../../constants/variable';
import Loader from '../Layout/Share/Loader';
import Metadata from '../Layout/Share/MetaData';
import Checkoutsteps from './CheckoutSteps';

const Confirmorder = () => {
     const { cardItems, shippingInfo } = useSelector(state => state.card)
     const navigat = useNavigate()
     const { loading, error, isAuthenticated, user } = useSelector(state => state.auth)
     const dispatch = useDispatch();

     // calculat order price 
     const itemsPrice = cardItems.reduce((acc, value) => (acc + (value.price * value.quantity)), 0)
     const shippingPrice = itemsPrice > 250 ? 0 : env_shippingPrice
     const taxPrice = Number((env_texParcent * itemsPrice).toFixed(2))
     const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

     const paymentBtnClicked = () => {
          const data = {
               itemsPrice: itemsPrice.toFixed(2),
               shippingPrice,
               taxPrice,
               totalPrice
          }
          sessionStorage.setItem('ConfirmOrdeInfo', JSON.stringify(data));
          navigat('/orders/payment', { replace: true })
     }

     return (
          <div className=''>
               <Checkoutsteps shipping confirmOrder />
               {
                    loading ? (< Loader />) : (
                         <div className="row d-flex justify-content-between">
                              <Metadata title={`Confirm Order - ${user.name}`} />
                              <div className="col-12 col-lg-8 mt-5 order-confirm">


                                   <h4 className="mb-3">Shipping Info</h4>
                                   <p><b>Name:</b> {user.name}</p>
                                   <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                                   <p className="mb-4"><b>Address:</b> {shippingInfo.address}</p>

                                   <hr />
                                   <h4 className="mt-4">Your Cart Items:</h4>

                                   <hr />
                                   <div className="cart-item my-1">
                                        {
                                             cardItems.map((item, index) => (
                                                  <div className="row" key={`${item.name}-${index}`} >

                                                       <div className="col-4 col-lg-2">
                                                            <img className='imgContain' src={item.image} alt={item.name} height="45" width="65" />
                                                       </div>


                                                       <div className="col-5 col-lg-6">
                                                            <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                                                       </div>

                                                       <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                                            <p>{item.quantity} x {CURRENCY}{item.price} = <b>{CURRENCY}{item.quantity * item.price}</b></p>
                                                       </div>

                                                  </div>
                                             ))
                                        }

                                   </div>
                                   <hr />
                                   {/* <div className="">  */}
                                   <div className=""><span className="float-right"> <strong>Subtotal : </strong> {CURRENCY}{itemsPrice}</span></div>
                                   {/* </div> */}


                              </div>

                              <div className="col-12 col-lg-3 my-4">
                                   <div id="order_summary">
                                        <h4>Order Summary</h4>
                                        <hr />
                                        <p>Subtotal:  <span className="order-summary-values">{CURRENCY}{itemsPrice}</span></p>
                                        <p>Shipping: <span className="order-summary-values">{CURRENCY}{shippingPrice}</span></p>
                                        <p>Tax:  <span className="order-summary-values">{CURRENCY}{taxPrice}</span></p>

                                        <hr />

                                        <p>Total: <span className="order-summary-values">{CURRENCY}{totalPrice}</span></p>

                                        <hr />
                                        <button onClick={paymentBtnClicked} id="checkout_btn" className="btn btn-primary btn-block">Proceed to Payment</button>
                                   </div>
                              </div>


                         </div>
                    )
               }
          </div>
     );
}

export default Confirmorder;
