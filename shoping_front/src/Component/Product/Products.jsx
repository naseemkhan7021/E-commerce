import { Link } from 'react-router-dom';
import { CURRENCY } from '../../constants/variable';
import Loader from '../Layout/Share/Loader';

const Product = ({ product,loading }) => {
     return (<>{
          loading ? (<Loader />) : (
               <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                    <div className="card p-3 rounded">
                         <Link className='text-center' to={`/product/${product._id}`}>
                              <img
                                   className="imgContain card-img-top mx-auto"
                                   src={product.images[0].url}
                                   alt={product && product.name}
                              />
                         </Link>
                         <div className="card-body d-flex flex-column">
                              <h5 className="card-title">
                                   <Link to={`/product/${product._id}`}>{product.name.slice(0, 22)}{product.name.length > 22 ? ('...') : ('')}</Link>
                              </h5>
                              <div className="ratings mt-auto">
                                   <div className="rating-outer">
                                        <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                   </div>
                                   <span id="no_of_reviews">({product.numberOfReviews} Reviews)</span>
                              </div>
                              <p className="card-text">{CURRENCY}{product.price} <small className={`stock small-font ${product.stock > 0 ? 'bg-success' : 'badge-danger'}  `}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</small></p>
                              <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                         </div>
                    </div>
               </div>
          )
          }</>);
};

export default Product;
