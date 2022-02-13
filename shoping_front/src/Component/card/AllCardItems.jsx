import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Metadata from '../Layout/Share/MetaData';
import { CURRENCY } from '../../constants/variable';
import { Link, useNavigate } from 'react-router-dom';
import { addToCardAction, removeItemFromCardList } from '../../redux/action/card_Action';
import { useAlert } from 'react-alert';


const Allcarditems = () => {

     const { cardItems } = useSelector(state => state.card);
     const navigate = useNavigate()
     const dispatch = useDispatch();
     const alert = useAlert();

     const increaseQnt = (product_id, quantity, stock) => {

          const newQnt = quantity + 1;
          if (newQnt > stock) return;
          dispatch(addToCardAction(product_id, newQnt, "card_list"))
     }
     const decreaseQnt = (product_id, quantity) => {

          const newQnt = quantity - 1;
          if (newQnt <= 0) return;
          dispatch(addToCardAction(product_id, newQnt, "card_list"))
     }
     const removeItemFromCardListClicked = (product_id) => {
          dispatch(removeItemFromCardList(product_id));
          alert.success('Item removed form card !!!')
     }

     return (
          <div className="container-fluid">
               <Metadata title={`Your Card`} />
               {
                    cardItems.length === 0 ? <h2>Your card is empty</h2> : (
                         <>
                              <div className="row d-flex justify-content-between">
                                   <div className="col-12 col-lg-8">

                                        <h2 className="mt-5">Your Cart: <b>{cardItems.reduce((acc, value) => (acc + Number(value.quantity)), 0)} items</b></h2>

                                        {cardItems.map((item, index) => (
                                             <Fragment key={`carditem-${index}`}>
                                                  <hr />
                                                  <div className="cart-item">
                                                       <div className="row">
                                                            <div className="col-4 col-lg-3">
                                                                 <img className='imgContain' src={item.image} alt="Laptop" height="90" width="115" />
                                                            </div>

                                                            <div className="col-5 col-lg-3">
                                                                 <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                                                            </div>

                                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                                 <p id="card_item_price">{CURRENCY}{item.price}</p>
                                                            </div>


                                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                                 <div className="stockCounter d-inline">
                                                                      <span className="btn btn-danger minus" onClick={() => decreaseQnt(item.product_id, item.quantity)}>-</span>

                                                                      <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                                      <span className="btn btn-primary plus" onClick={() => increaseQnt(item.product_id, item.quantity, item.stock)}>+</span>
                                                                 </div>
                                                            </div>


                                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                                 <i onClick={() => removeItemFromCardListClicked(item.product_id)} id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                                                            </div>


                                                       </div>
                                                  </div>


                                             </Fragment>
                                        ))}
                                        <hr />
                                   </div>

                                   <div className="col-12 col-lg-3 my-4">
                                        <div id="order_summary">
                                             <h4>Order Summary</h4>
                                             <hr />
                                             <p>Subtotal:  <span className="order-summary-values">{cardItems.reduce((acc, value) => (acc + Number(value.quantity)), 0)} (Units)</span></p>
                                             <p>Est. total:
                                                  <span className="order-summary-values">
                                                       {CURRENCY}{cardItems.reduce((acc, value) => (acc + (value.price * value.quantity)), 0)}
                                                  </span>
                                             </p>

                                             <hr />
                                             <button onClick={() => navigate('/auth/login?redirect=shippinginfo')} id="checkout_btn" className="btn btn-primary btn-block">Check out</button>
                                        </div>
                                   </div>
                              </div>
                         </>
                    )
               }

          </div>
     );
}

export default Allcarditems;
