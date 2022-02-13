import React from 'react';

const Reviews = ({ reviews }) => {
     return (
          <>
               <div className="container-fluid">
                    <div class="reviews w-75">
                         <h2>All Rivew's</h2>

                         <hr />
                         {
                              reviews.map((item, index) => (
                                   <div class="review-card my-3" key={`review-${index}`}>
                                        <figure className="avatar avatar-nav border">
                                             <img
                                                  src={item.avtar && item.avtar}
                                                  onError={(e) => e.target.src = '/images/dAVT.png'}
                                                  alt={item.name}
                                                  className="rounded-circle"
                                             />
                                        </figure>
                                        <div className="d-inline-block">
                                             <div class="rating-outer">
                                                  <div class="rating-inner" style={{ width: `${(item.rating / 5) * 100}%` }}></div>
                                             </div>
                                             <p class="review_user">by {item.name}</p>
                                             <p class="review_comment">{item.comment}</p>
                                        </div>
                                        <hr />
                                   </div>
                              ))
                         }
                    </div>
               </div>
          </>
     );
}

export default Reviews;
