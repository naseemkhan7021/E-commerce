import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Carousel } from 'react-bootstrap';
import { clearErrors, getProductDetails } from '../../redux/action/productAct';
import Loader from '../Layout/Share/Loader';
import Metadata from '../Layout/Share/MetaData';
import { CURRENCY } from '../../constants/variable';
import { addToCardAction } from '../../redux/action/card_Action';
import { addUpdateReviewAction } from '../../redux/action/productReview';
import { NEW_PRODUCT_REVIEW_RESET } from '../../constants/product_Ctn';
import Reviews from './Reviews';

const Productdetails = () => {
     const [qnt, setQnt] = useState(1);
     const [userRating, setUserRating] = useState(0);
     const [userCommnet, setUserCommnet] = useState('');

     let { p_id } = useParams();
     const dispatch = useDispatch();
     const alert = useAlert();

     const { loading, error, product } = useSelector(state => state.productDetails)
     const { success, error: reviewError } = useSelector(state => state.addUpdateRiview)
     const { user } = useSelector(state => state.auth)

     // useEffect(() => {
     //      effect
     //      return () => {
     //           cleanup
     //      };
     // }, [input]);
     // let id;
     useEffect(() => {
          console.log('this is useEffect from product Details');

          dispatch(getProductDetails(p_id));
          if (success) {
               alert.success('Review added successfully !!!');
               dispatch({
                    type: NEW_PRODUCT_REVIEW_RESET
               })
          }
          if (reviewError) {
               alert.error(reviewError);
               dispatch(clearErrors());
               // alert.success('ok fine!!!!')
          }
          if (error) {
               alert.error(error);
               // alert.success('ok fine!!!!')
               // dispatch(clearErrors());
          }
          if (error) {
               return () => {
                    dispatch(clearErrors())
               }
          }

     }, [dispatch, alert, error, success, reviewError, p_id])

     const addToCardCliked = () => {
          dispatch(addToCardAction(p_id, qnt));
          alert.success('Product added to card successfully !!!');
     }

     const increaseQnt = () => {
          if (qnt >= product.stock) return;
          setQnt(qnt + 1)
     }
     const decreaseQnt = () => {
          if (qnt === 1) return;
          setQnt(qnt - 1)
     }

     const setUserRatingHandel = () => {
          const stars = document.querySelectorAll('.star');
          stars.forEach((star, index) => {
               star.starValue = index + 1;
               // star.addEventListener('')
               ['click', 'mouseover', 'mouseout'].forEach((e) => {
                    star.addEventListener(e, showRatings);
               });
          });
          function showRatings(e) {
               stars.forEach((star, index) => {
                    if (e.type === 'click') {
                         if (index < this.starValue) {
                              star.classList.add('orange')
                              setUserRating(this.starValue)
                         } else {
                              star.classList.remove('orange')
                         }
                    }
                    if (e.type === 'mouseover') {
                         if (index < this.starValue) {
                              star.classList.add('yellow')
                         } else {
                              star.classList.remove('yellow')
                         }
                    }
                    if (e.type === 'mouseout') {
                         star.classList.remove('yellow')
                    }
               })
          }
          // console.log(stars);
     }

     const submitReview = () => {
          const data = {
               productId: p_id,
               rating: userRating,
               comment: userCommnet
          }
          dispatch(addUpdateReviewAction(data))

     }

     return (
          <div >
               <Metadata title={`${product && product.name}`} />
               {
                    loading ? (< Loader />) : error ? (<h2>Sorry product is not found right now</h2>) : (
                         <>
                              <div className="container container-fluid">

                                   <div className="row f-flex justify-content-around">

                                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                             {/* <img src="https://i5.walmartimages.com/asr/1223a935-2a61-480a-95a1-21904ff8986c_1.17fa3d7870e3d9b1248da7b1144787f5.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt={product.name} height="500" width="500" /> */}
                                             <Carousel pause='hover'>
                                                  {
                                                       product && product.images && product.images.map((img, index) => (
                                                            <Carousel.Item key={`${index}-${img.public_id}`}>
                                                                 <img src={img.url} alt={`${product.name}-${index}`} className="d-block w-100" />
                                                            </Carousel.Item>
                                                       ))
                                                  }
                                             </Carousel>
                                        </div>


                                        <div className="col-12 col-lg-5 mt-5">
                                             <h3>{product.name}</h3>
                                             <p id="product_id">Product # {p_id}</p>

                                             <hr />

                                             <div className="rating-outer">
                                                  <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                             </div>
                                             <span id="no_of_reviews">({product.numberOfReviews} Reviews)</span>


                                             <hr />


                                             <p id="product_price">{CURRENCY}{product.price}</p>
                                             <div className="stockCounter d-inline">
                                                  <span className={`${(qnt === 1 && 'disabled') || (product.stock === 0 && 'disabled')} btn btn-danger minus`} onClick={decreaseQnt}>-</span>


                                                  <input type="number" className="form-control count d-inline" max={product.stock} min={1} value={product.stock === 0 ? 0 : qnt} readOnly />


                                                  <span className={`${(qnt === product.stock && 'disabled') || (product.stock === 0 && 'disabled')} btn btn-primary plus`} onClick={increaseQnt}>+</span>
                                             </div>
                                             <button type="button" id="cart_btn" onClick={addToCardCliked} className={`btn btn-primary d-inline ml-4 ${product.stock === 0 && 'disabled'}`}>Add to Cart</button>


                                             <hr />

                                             <p>Status: <span id="stock_status" className={`stock big-font ${product.stock > 0 ? 'bg-success' : 'badge-danger'}  `}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>


                                             <hr />


                                             <h4 className="mt-2">Description:</h4>
                                             <p>{product.description}</p>
                                             <hr />
                                             <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                                             {
                                                  user ? (
                                                       <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatingHandel}>
                                                            Submit Your Review
                                                       </button>
                                                  ) :
                                                       <div className="alert alert-danger" type='alert'>Login to Submit review</div>
                                             }

                                             <div className="row mt-2 mb-5">
                                                  <div className="rating w-50">


                                                       <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog" role="document">
                                                                 <div className="modal-content">
                                                                      <div className="modal-header">
                                                                           <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                                           <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                           </button>
                                                                      </div>

                                                                      <div className="modal-body">
                                                                           <ul className="stars" >
                                                                                <li className="star"><i className="fa fa-star"></i></li>
                                                                                <li className="star"><i className="fa fa-star"></i></li>
                                                                                <li className="star"><i className="fa fa-star"></i></li>
                                                                                <li className="star"><i className="fa fa-star"></i></li>
                                                                                <li className="star"><i className="fa fa-star"></i></li>
                                                                           </ul>


                                                                           <textarea
                                                                                name="review"
                                                                                id="review"
                                                                                className="form-control mt-3"
                                                                                value={userCommnet}
                                                                                onChange={(e) => setUserCommnet(e.target.value)}
                                                                           >
                                                                           </textarea>


                                                                           <button onClick={submitReview} className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>

                                             </div>

                                        </div>
                                   </div>
                              </div>
                              {
                                   product && product.reviews && product.reviews.length > 0 && (
                                        <Reviews reviews={product.reviews} />
                                   )
                              }
                         </>
                    )
               }
          </div>

     );
}

export default Productdetails;
