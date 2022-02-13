import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';

import { getProducts } from '../redux/action/productAct';
import Metadata from './Layout/Share/MetaData';
import Products from './Product/Products';
import Loader from './Layout/Share/Loader';
import { CATEGORY, CURRENCY } from '../constants/variable';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)


const Home = () => {
     const [currentPage, setCurrentPage] = useState(1);
     const [priceFilter, setPriceFilter] = useState([1, 50000]);
     const [category, setCategory] = useState('');
     const [ratings, setRatings] = useState(0);
     // const [seller, setSeller] = useState('');

     const { loading, error, products, totalProductCount, pageDataLen, resPerPage } = useSelector(state => state.products)
     // const location = useLocation();
     const { keyWord } = useParams();
     const alert = useAlert();
     const dispatch = useDispatch()

     useEffect(() => {
          if (error) {
               // alert.success('ok fine!!!!')
               alert.error(error);
          }
          dispatch(getProducts(ratings, category, priceFilter, keyWord, currentPage))

     }, [dispatch, ratings, category, keyWord, priceFilter, currentPage, alert, error])

     function setCurrentPageNo(pageNumber) {
          setCurrentPage(pageNumber)
     }
     function hanePriceFilterChange(index, e) {
          let newFilter = [...priceFilter];
          newFilter[index] = e.target.value;
          setPriceFilter(newFilter);

     }

     return (
          <div className='container-fluid'>
               <Metadata title="All New Products" /> {/* Set header */}
               {
                    loading ? (<Loader />) :
                         (
                              <>
                                   <div className="row justify-content-center">
                                        <div className="col-12 col-md-2 mr-4">
                                             <p className='mt-5 text-center'>Filter Items</p>
                                             <section id="filter" className="mt-5">
                                                  <div id="princeFilter">
                                                       <strong>Price</strong>
                                                       <hr />
                                                       <div className="row g-3 align-items-center">
                                                            <div className="col-5">
                                                                 <input className='form-control' placeholder="min" type="number" value={priceFilter[0]} name='priceL' min={1} onChange={(e) => hanePriceFilterChange(0, e)} />
                                                            </div>
                                                            <div className="col-2">
                                                                 To
                                                            </div>
                                                            <div className="col-5">
                                                                 <input className='form-control' placeholder="max" type="number" value={priceFilter[1]} name='priceH' max={50000} onChange={(e) => hanePriceFilterChange(1, e)} />
                                                            </div>
                                                       </div>
                                                       <div className="mt-5 " data-bs-toggle="tooltip">
                                                            <Range
                                                                 marks={{
                                                                      1: `${CURRENCY}1`,
                                                                      50000: `${CURRENCY}50000`
                                                                 }}
                                                                 min={1}
                                                                 max={50000}
                                                                 defaultValue={[1, 50000]}
                                                                 tipFormatter={value => `${CURRENCY}${value}`}
                                                                 tipProps={{
                                                                      placement: 'top',
                                                                      visible: 'true'
                                                                 }}
                                                                 value={priceFilter}
                                                                 onChange={price => setPriceFilter(price)}
                                                            />
                                                       </div>

                                                  </div>
                                                  <hr className='mt-4' />
                                                  <div id="categoryFilter">
                                                       <strong>Category</strong>
                                                       <hr />
                                                       <select value={category} onChange={(e) => setCategory(e.target.value)} name="category" className="form-control">
                                                            <option disabled>Select Category</option>
                                                            <option value="" >All</option>
                                                            {CATEGORY.map((item, index) => (
                                                                 <option key={`catregroy-${index}`} value={item} >{item}</option>
                                                                 // <input onClick={(e) => setCategory(e.target.value)} type="radio" id={`catregroy-${index}`} name="category" value={item} checked={item === category} />
                                                                 // <label htmlFor={`catregroy-${index}`}>{item}</label> selected={item === category} selected={'' === category}
                                                            ))}
                                                       </select>
                                                  </div>

                                                  <hr />
                                                  {/* <hr className="mt-4" /> */}
                                                  <div id="ratingFilter">
                                                       <strong>Rating</strong>
                                                       {/* <hr /> */}
                                                       <ul className="mt-2">
                                                            {
                                                                 [5, 4, 3, 2, 1, 0].map((star, index) => (
                                                                      <li key={`start-${index}`} onClick={() => setRatings(star)}><span>{star} </span>
                                                                           <div className="rating-outer">
                                                                                <div className="rating-inner" style={{ width: `${star * 20}%` }}></div>
                                                                           </div>
                                                                      </li>
                                                                 ))
                                                            }
                                                       </ul>
                                                  </div>

                                             </section>
                                        </div>

                                        <div className="col-12 col-md-9">
                                             <h1 id="products_heading">Latest Products {pageDataLen}/{totalProductCount}</h1>
                                             <section id="products" className="mt-5">
                                                  <div className="row">
                                                       {products && products.map((product, index) => (
                                                            <Products product={product} key={product._id} />
                                                       ))}
                                                  </div>
                                             </section >
                                             {/* {resPerPage <= pageDataLen && ( */}

                                             <div className="d-flex justify-content-center mt-5">
                                                  <Pagination
                                                       activePage={currentPage}
                                                       itemsCountPerPage={resPerPage}
                                                       totalItemsCount={totalProductCount}
                                                       onChange={setCurrentPageNo}
                                                       nextPageText='Next Page'
                                                       prevPageText='Prev Page'
                                                       firstPageText='First Page'
                                                       lastPageText='Last Page'
                                                       itemClass="page-item"
                                                       linkClass="page-link"
                                                  />
                                             </div>
                                             {/* )} */}
                                        </div>
                                   </div>
                              </>
                         )
               }

          </div>
     );
}



export default Home;
