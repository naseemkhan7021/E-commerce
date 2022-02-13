import React, { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Layout/Share/Loader';
import { useEffect } from 'react';
import { clearErrors } from '../../../redux/action/productAct';
import { deleteProductReviewsAction, getProductReviewsAction } from '../../../redux/action/admin/review';
import { DELETE_PRODUCT_REVIEW_RESET } from '../../../constants/product_Ctn';

const Allreviews = () => {
     const [productId, setProductId] = useState('');

     const { loading, error, reviews, totalReviews, productId: p_id } = useSelector(state => state.getReviews)
     const { loading: deleteLoading, error: deleteError, success: isDeleted } = useSelector(state => state.deleteReview)
     const alert = useAlert();
     const dispatch = useDispatch()

     useEffect(() => {
          if (productId !== '') {
               dispatch(getProductReviewsAction(productId))
          }
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if (deleteError) {
               alert.error(deleteError)
               dispatch(clearErrors());
          }
          if (isDeleted) {
               alert.success('Product deleted successfully !!!');
               dispatch({
                    type: DELETE_PRODUCT_REVIEW_RESET
               });
          }
     }, [dispatch, alert, error, deleteError, isDeleted, productId]);

     const setProductReviewsData = () => {
          const data = {
               columns: [
                    {
                         label: 'Review ID',
                         field: 'r_id',
                         sort: 'acs'
                    },
                    {
                         label: 'Rating',
                         field: 'rating',
                         sort: 'acs'
                    },
                    {
                         label: 'Comment',
                         field: 'comment',
                         sort: 'acs'
                    },
                    {
                         label: 'Avatar',
                         field: 'avatar',
                         sort: 'acs'
                    },
                    {
                         label: 'User',
                         field: 'user',
                         sort: 'acs'
                    },
                    {
                         label: 'Actions',
                         field: 'actions'
                    },
               ],
               rows: []
          };

          reviews && reviews.forEach(review => {
               data.rows.push({
                    r_id: review._id,
                    rating: review.rating,
                    comment: review.comment,
                    avatar: <figure className="avatar avatar-nav">
                         <img
                              src={review && review.avtar}
                              alt={review && review.name}
                              className="rounded"
                         />
                    </figure>,
                    user: review.name,
                    actions: <div className='d-flex'>
                         <button disabled={deleteLoading ? true : false} onClick={() => deleteReview(review._id)} className='btn btn-danger py-1 px-2 ml-1' >
                              <i className='fa fa-trash'></i>
                         </button>
                    </div>
               })
          });

          return data;
     }

     const deleteReview = (reviewId) => {
          dispatch(deleteProductReviewsAction(productId || p_id, reviewId));
     }

     const submitBtnClicked = (e) => {
          e.preventDefault();
          dispatch(getProductReviewsAction(productId));
     }

     return (
          <div className="col-12 col-md-10">
               <h2 className="m-3">Products Reviews</h2>
               <div className="row justify-content-center mt-5">
                    <div className="col-5">
                         <form>
                              <div className="form-group">
                                   <label htmlFor="productId_field">Enter Product ID</label>
                                   <input
                                        type="text"
                                        id="email_field"
                                        className="form-control"
                                        value={productId}
                                        onChange={e => setProductId(e.target.value)}
                                   />
                              </div>


                              <button
                                   id="search_button"
                                   type="submit"
                                   className="btn btn-primary btn-block py-2"
                                   onClick={submitBtnClicked}
                              >
                                   SEARCH
                              </button>
                         </ form>
                    </div>

               </div>
               {
                    loading ? (< Loader />) : (
                         <>

                              {
                                   reviews && reviews.length > 0 ? (
                                        <>
                                             <p className='mt-3 text-center'>{totalReviews} Reviews</p>
                                             <MDBDataTable
                                                  className='px-3'
                                                  data={setProductReviewsData()}
                                                  bordered
                                                  striped
                                                  hover
                                                  searchLabel='Search From here'
                                             />
                                        </>
                                   ) : <p className='mt-3 text-center'>No Record Found</p>
                              }
                         </>
                    )
               }
          </div>
     );
}

export default Allreviews;
