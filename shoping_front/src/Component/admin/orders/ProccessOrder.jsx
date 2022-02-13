import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ADMIN_UPDATE_ORDER_RESET } from '../../../constants/order_Ctn';
import { CURRENCY } from '../../../constants/variable';
import { updateOrderActions } from '../../../redux/action/admin/order';
import { clearErrors, singleOrderDetailsAction } from '../../../redux/action/orderAction';
import Loader from '../../Layout/Share/Loader';
import Metadata from '../../Layout/Share/MetaData';

// import Loader from '../Layout/Share/Loader';

const Proccessorder = () => {
     const [status, setStatus] = useState('');

     const { o_id } = useParams();
     const alert = useAlert();
     const dispatch = useDispatch();
     const { loading, error, order = {} } = useSelector(state => state.orderDetails)
     const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.order)

     const { shippingInfo, paymentInfo, user, totalPrice, orderItems } = order

     useEffect(() => {
          dispatch(singleOrderDetailsAction(o_id));
          setStatus(order.orderStatus)
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          };
          if (updateError) {
               alert.error(updateError);
               dispatch(clearErrors());
          };
          if (isUpdated) {
               alert.success('Order updated successfully !!!')
               dispatch({
                    type: ADMIN_UPDATE_ORDER_RESET
               })
          }

          // console.log(order);

     }, [dispatch, alert, error, o_id, isUpdated, updateError]);

     const updateBtnCliked = (o_id) => {
          // console.log('click');
          dispatch(updateOrderActions(o_id, { status }))
     }

     const fullAddress = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`
     const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

     return (

          <>
               {
                    loading ? (< Loader />) : (
                         <>
                              <Metadata title={`order - ${order._id}`} />
                              <div className="col-12 col-lg-7 order-details">
                                   <h1 className="my-5">Order # {order._id}</h1>


                                   <h4 className="mb-4">Shipping Info</h4>
                                   <p><b>Name:</b> {user && user.name}</p>
                                   <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                   <p className="mb-4"><b>Address:</b> {fullAddress}</p>
                                   <p><b>Amount:</b> {CURRENCY}{totalPrice}</p>


                                   <hr />


                                   <h4 className="my-4">Payment</h4>
                                   <p className={isPaid ? 'greenColor' : 'redColor'} ><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>

                                   <h4 className="my-4">Stripe ID</h4>
                                   <p  ><b>{paymentInfo && paymentInfo.id}</b></p>




                                   <h4 className="my-4">Order Status:</h4>
                                   <p className={order.orderStatus == 'processing' ? 'redColor' : order.orderStatus == 'Shipped' ? 'orange' : 'greenColor'} ><b className='text-capitalize'>{order.orderStatus}</b>
                                   </p>


                                   <h4 className="my-4">Order Items:</h4>


                                   <hr />
                                   <div className="cart-item my-1">
                                        {
                                             orderItems && order.orderItems.map((product, index) => (
                                                  <div className="row my-5" key={`orderitem-${index}`} >
                                                       <div className="col-2">
                                                            <img className='imgContain' src={product.image} alt={product.name} height="45" width="65" />
                                                       </div>

                                                       <div className="col-5">
                                                            <Link to={`/product/${product.product_id}`} >{product.name}</Link>
                                                       </div>

                                                       <div className="col-1 mt-4 mt-lg-0">
                                                            <p>{CURRENCY}{product.price}</p>
                                                       </div>

                                                       <div className="col-2 mt-4 mt-lg-0">
                                                            <p>{product.quantity} Piece(s)</p>
                                                       </div>

                                                       <div className="col-2 mt-4 mt-lg-0">
                                                            <p><b>{CURRENCY}{product.price * product.quantity}</b> </p>
                                                       </div>
                                                  </div>
                                             ))
                                        }
                                   </div>
                                   <hr />
                              </div>


                         </>
                    )
               }

               <div className="col-12 col-lg-2 mt-5 ">
                    <h4 className="my-4">Status</h4>


                    <div className="form-group">
                         <select
                              className="form-control"
                              name='status'
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                         >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                         </select>
                    </div>


                    <button onClick={() => updateBtnCliked(order._id)} className="btn btn-primary btn-block">
                         Update Status
                    </button>
               </div>

          </>

          // </div>
     );
}

export default Proccessorder;
