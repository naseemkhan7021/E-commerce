import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CURRENCY } from '../../constants/variable';
import { clearErrors, singleOrderDetailsAction } from '../../redux/action/orderAction';
import Loader from '../Layout/Share/Loader';

const Mysingleorder = () => {
     const { o_id } = useParams();
     const alert = useAlert();
     const dispatch = useDispatch();
     const { loading, error, order = {} } = useSelector(state => state.orderDetails)
     // const { user } = useSelector(state => state.auth)

     const { shippingInfo } = order

     useEffect(() => {
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          };
          dispatch(singleOrderDetailsAction(o_id));
          // console.log(order);

     }, [dispatch, alert, error, o_id]);

     //      address(pin):"Kurla"
     // city(pin):"Mumbai"
     // phoneNo(pin):"1568798545"
     // postalCode(pin):"400072"
     // country(pin):"India"
     const fullAddress = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`
     return (
          <>
               {
                    loading ? (< Loader />) : (
                         <>
                              {

                                   <div className="" key={`order-${order.name}`} >
                                        <div className="row d-flex justify-content-between">
                                             <div className="col-12 mt-5 order-details">
                                                  <h1 className="my-5">Order # {order._id}</h1>

                                                  <div className="row justify-content-between" >

                                                       <div className="col-md-6 col-sm-12 order-details">
                                                            <h4 className="mb-2">Shipping Info</h4>

                                                            <p className="mb-2"><b>Name:</b> {order.user && order.user.name}</p>
                                                            <p className="mb-2"><b>Phone:</b> {order.shippingInfo && order.shippingInfo.phoneNo}</p>
                                                            <p className="mb-2"><b>Address:</b> {fullAddress}</p>
                                                            <p className="mb-2"><b>Pincode:</b> {order.shippingInfo && order.shippingInfo.postalCode}</p>
                                                            <p><b>Amount:</b> {CURRENCY}{order.totalPrice}</p>
                                                       </div>

                                                       <div className="col-md-6 col-sm-12 order-details">
                                                            <h4 className="mb-2">Payment</h4>
                                                            <p><b>Status:</b> <b className='greenColor'>PAID</b></p>
                                                            <p><b>Id:</b> #{order.paymentInfo && order.paymentInfo.id}</p>

                                                            <h4 className="mb-2">Order Status:</h4>
                                                            <p className={order.orderStatus === 'processing' ? 'redColor' : order.orderStatus === 'Shipped' ? 'orange' : 'greenColor'} ><b className='text-capitalize'>{order.orderStatus}</b>
                                                            </p>

                                                       </div>

                                                  </div>

                                                  <h4 className="mb-3">Order Items:</h4>
                                                  <hr />



                                                  <div className="cart-item my-1">
                                                       {
                                                            order.orderItems && order.orderItems.map((product, index) => (
                                                                 <div className="row my-5" key={`orderitem-${index}`} >
                                                                      <div className="col-2">
                                                                           <img className='imgContain' src={product.image} alt="Laptop" height="45" width="65" />
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
                                                                           <p>{CURRENCY}{product.price * product.quantity} </p>
                                                                      </div>
                                                                 </div>
                                                            ))
                                                       }
                                                  </div>
                                                  <hr />

                                                  <section id='Caculate'>
                                                       <div className='float-right'>
                                                            <p><strong>Subtotal:</strong> {CURRENCY}{order.itemsPrice}</p>
                                                            <p><strong>Tax:</strong> {CURRENCY}{order.taxPrice}</p>
                                                            <p><strong>Shipping Price:</strong> {CURRENCY}{order.shippingPrice}</p>
                                                            <p><strong>Total:</strong> {CURRENCY}{order.totalPrice}</p>
                                                       </div>
                                                  </section>

                                             </div>
                                        </div>
                                   </div>

                              }
                         </>
                    )
               }
          </>
     );
}



export default Mysingleorder;
