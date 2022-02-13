import React, { useEffect } from 'react';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Metadata from '../Layout/Share/MetaData';
import Checkoutsteps from '../order/CheckoutSteps';
import { paymentProcessAPI } from '../../api/payment/reqkey';
import { clearErrors, makeOrderAction } from '../../redux/action/orderAction';

const option = {
     style: {
          base: {
               fontSize: '16px',
               iconColor: '#c4f0ff',
          },
          invalid: {
               color: 'red',
               // backgroundColor: 'red'
          }
     }
}

const PaymentProcess = () => {
     const alert = useAlert();
     const navigat = useNavigate();
     const stripe = useStripe();
     const elements = useElements();
     const dispatch = useDispatch();

     const { user } = useSelector(state => state.auth)
     const { cardItems, shippingInfo } = useSelector(state => state.card)
     const { error, loading } = useSelector(state => state.order)

     const orderInfo = JSON.parse(sessionStorage.getItem('ConfirmOrdeInfo'))
     const paymentData = {
          amount: Math.round(orderInfo.totalPrice * 100) // in cets ->  1USD = 100Cents then IND 1RS = 100PS 
     }

     useEffect(() => {
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
     }, [dispatch, alert, error])

     const payButtonCliked = async (e) => {
          e.preventDefault();
          const payBtn = document.querySelector('#pay_btn');
          payBtn.disabled = true;
          let res;
          try {
               res = await paymentProcessAPI(paymentData);
               const clientSecret = res.data.client_secret;
               if (!stripe || !elements) {
                    return;
               }
               const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                         card: elements.getElement(CardNumberElement),
                         billing_details: {
                              name: user.name,
                              email: user.email
                         }
                    }
               });
               // console.log('result -> ', result);
               if (result.error) {
                    alert.error(result.error.message)
                    payBtn.disabled = false;
               } else {
                    if (result.paymentIntent.status == 'succeeded') {
                         // to do 
                         var order;
                         // console.log(orderInfo);
                         if (orderInfo) {
                              order = {
                                   shippingInfo,
                                   orderItems: cardItems,
                                   itemsPrice: orderInfo.itemsPrice,
                                   taxPrice: orderInfo.taxPrice,
                                   shippingPrice: orderInfo.shippingPrice,
                                   totalPrice: orderInfo.totalPrice,
                                   paymentInfo: {
                                        id: result.paymentIntent.id,
                                        status: result.paymentIntent.status
                                   }
                              }

                              dispatch(makeOrderAction(order))
                         }

                         navigat('/orders/success')
                    } else {
                         payBtn.disabled = false;
                         alert.error('Thare was some problem to processing the payment !!!')
                    }
               }

          } catch (error) {
               alert.error(error.response.data.message)
               payBtn.disabled = false;
          }
     }


     return (
          <>
               <Metadata title={'Payment'} />
               <Checkoutsteps shipping confirmOrder payment />

               <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                         <form className="shadow-lg">
                              <h1 className="mb-4">Card Info</h1>
                              <div className="form-group">
                                   {/* <Card  /> */}
                                   <label htmlFor="card_num_field">Card Number</label>
                                   <CardNumberElement
                                        type="text"
                                        id="card_num_field"
                                        className="form-control"
                                        options={option}
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="card_exp_field">Card Expiry</label>
                                   <CardExpiryElement
                                        type="text"
                                        id="card_exp_field"
                                        className="form-control"
                                        options={option}
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="card_cvc_field">Card CVC</label>
                                   <CardCvcElement
                                        type="text"
                                        id="card_cvc_field"
                                        className="form-control"
                                        options={option}
                                   />
                              </div>


                              <button
                                   id="pay_btn"
                                   type="submit"
                                   className="btn btn-block py-3"
                                   onClick={payButtonCliked}
                              >
                                   Pay - {`${orderInfo.totalPrice}`}
                              </button>

                         </form>
                    </div>
               </div>
          </>
     );
}

export default PaymentProcess;
