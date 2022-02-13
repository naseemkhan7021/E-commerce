import { useState } from 'react';
import { countries } from 'countries-list';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { addShippingInfoAction } from '../../redux/action/card_Action';
import { useNavigate } from 'react-router-dom';
import Checkoutsteps from '../order/CheckoutSteps';

const Shippinginfo = () => {

     const { shippingInfo } = useSelector(state => state.card)
     const [address, setAddress] = useState(shippingInfo.address);
     const [city, setCity] = useState(shippingInfo.city);
     const [postalCode, setPostalcode] = useState(shippingInfo.postalCode);
     const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
     const [country, setCountry] = useState(shippingInfo.country);

     const countr_list = Object.values(countries)
     // console.log('countr_list -> ', countr_list);
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const alert = useAlert();


     const submitForm = (e) => {
          e.preventDefault();
          dispatch(addShippingInfoAction({ address, city, postalCode, phoneNo, country }));
          navigate('/orders/confirm')
          alert.success('Shipping details added success !!!');
     }



     return (
          <>
               <Checkoutsteps shipping />
               <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                         <form className="shadow-lg" onSubmit={submitForm}>
                              <h1 className="mb-4">Shipping Info</h1>
                              <div className="form-group">
                                   <label htmlFor="address_field">Address</label>
                                   <input
                                        type="text"
                                        id="address_field"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                   />
                              </div>


                              <div className="form-group">
                                   <label htmlFor="city_field">City</label>
                                   <input
                                        type="text"
                                        id="city_field"
                                        className="form-control"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                   />
                              </div>


                              <div className="form-group">
                                   <label htmlFor="phone_field">Phone No</label>
                                   <input
                                        type="phone"
                                        id="phone_field"
                                        className="form-control"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        required
                                   />
                              </div>


                              <div className="form-group">
                                   <label htmlFor="postal_code_field">Postal Code</label>
                                   <input
                                        type="number"
                                        id="postal_code_field"
                                        className="form-control"
                                        value={postalCode}
                                        onChange={(e) => setPostalcode(e.target.value)}
                                        required
                                   />
                              </div>


                              <div className="form-group">
                                   <label htmlFor="country_field">Country</label>
                                   <select
                                        id="country_field"
                                        className="form-control"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                   >
                                        {
                                             countr_list.map((item, index) => (
                                                  <option key={`${item.name}-${index}`}>
                                                       {/* <span>{item.emojiU}</span> */}
                                                       {item.name}
                                                  </option>

                                             ))
                                        }



                                   </select>
                              </div>


                              <button
                                   id="shipping_btn"
                                   type="submit"
                                   className="btn btn-block py-3"
                              >
                                   CONTINUE
                              </button>
                         </form>
                    </div>
               </div>
          </>
     );
}

export default Shippinginfo;
