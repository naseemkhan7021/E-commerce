import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_PRODUCT_RESET } from '../../../constants/product_Ctn';
import { CATEGORY } from '../../../constants/variable';
import { updateProductAction } from '../../../redux/action/admin/products';
import { clearErrors, getProductDetails } from '../../../redux/action/productAct';
import Loader from '../../Layout/Share/Loader';
import Metadata from '../../Layout/Share/MetaData'

const EditeProduct = () => {
     const [name, setName] = useState('');
     const [price, setPrice] = useState(0);
     const [description, setDescription] = useState('');
     const [images, setImages] = useState([]);
     const [oldImages, setOldImages] = useState([]);
     const [category, setCategory] = useState('');
     const [seller, setSeller] = useState('');
     const [stock, setStock] = useState(0);

     const { p_id } = useParams();

     const alert = useAlert();
     const navigat = useNavigate();
     const dispatch = useDispatch();

     const { error, loading, product } = useSelector(state => state.productDetails)
     const { error: updateError, loading: updateLoading, success: isUpdated } = useSelector(state => state.updateProduct)


     useEffect(() => {

          if (product && product._id !== p_id) {
               dispatch(getProductDetails(p_id));
          } else {
               // dispatch(getProductDetails(p_id));
               setName(product.name)
               setPrice(product.price)
               setDescription(product.description)
               setOldImages(product.images.map(item => item.url))
               setCategory(product.category)
               setSeller(product.seller)
               setStock(product.stock)
          }
          if (isUpdated) {
               alert.success('Product updated successfully !!!');
               dispatch({
                    type: UPDATE_PRODUCT_RESET
               });
               navigat('/admin/products')
          }

          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
          if (updateError) {
               alert.error(updateError)
               dispatch(clearErrors())
          }

     }, [dispatch, alert, navigat, error, p_id, product, updateError, isUpdated])

     const onInputChange = name => e => {
          switch (name) {
               case 'images':
                    const files = Array.from(e.target.files);
                    setImages([]);
                    setOldImages([]);

                    files.forEach(image => {
                         const reader = new FileReader();
                         reader.onload = () => {
                              if (reader.readyState === 2) {
                                   // setAvtarPreview(reader.result);
                                   setImages(oldImg => [...oldImg, reader.result])
                                   // (reader.result);
                              }
                         }
                         reader.readAsDataURL(image);
                    });

               case 'name':
                    setName(e.target.value);
                    break
               case 'price':
                    setPrice(e.target.value);
                    break
               case 'description':
                    setDescription(e.target.value);
                    break
               case 'category':
                    setCategory(e.target.value);
                    break
               case 'seller':
                    setSeller(e.target.value);
                    break
               case 'stock':
                    setStock(e.target.value);
                    break
          }
     }

     const submitForm = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.set('name', name)
          formData.set('price', price)
          formData.set('description', description)
          formData.set('category', category)
          formData.set('seller', seller)
          formData.set('stock', stock)
          images.forEach(image => {
               formData.append('images', image)
          });
          dispatch(updateProductAction(product._id, formData))
     }

     return (
          <div className="col-12 col-md-10">
               <h2 className="m-3">Update Product</h2>
               <Metadata title='Update product' />
               {
                    loading ? (< Loader />) : (
                         <div className="wrapper my-5">

                              <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitForm}>
                                   {/* <h1 className="mb-4">New Product</h1> */}


                                   <div className="form-group">
                                        <label htmlFor="name_field">Name</label>
                                        <input
                                             type="text"
                                             id="name_field"
                                             className="form-control"
                                             value={name}
                                             onChange={onInputChange('name')}
                                        />
                                   </div>


                                   <div className="form-group">
                                        <label htmlFor="price_field">Price</label>
                                        <input
                                             type="text"
                                             id="price_field"
                                             className="form-control"
                                             value={price}
                                             onChange={onInputChange('price')}
                                        />
                                   </div>


                                   <div className="form-group">
                                        <label htmlFor="description_field">Description</label>
                                        <textarea
                                             className="form-control"
                                             id="description_field"
                                             rows="8"
                                             value={description}
                                             onChange={onInputChange('description')}
                                        ></textarea>
                                   </div>


                                   <div className="form-group">
                                        <label htmlFor="category_field">Category</label>
                                        <select
                                             className="form-control"
                                             id="category_field"
                                             value={category}
                                             onChange={onInputChange('category')}

                                        >
                                             <option disabled selected>Select Category</option>
                                             {CATEGORY.map((item, index) => (
                                                  <option key={`catregroy-${index}`} value={item} >{item}</option>
                                             ))}
                                        </select>
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="stock_field">Stock</label>
                                        <input
                                             type="number"
                                             id="stock_field"
                                             className="form-control"
                                             value={stock}
                                             onChange={onInputChange('stock')}
                                        />
                                   </div>


                                   <div className="form-group">
                                        <label htmlFor="seller_field">Seller Name</label>
                                        <input
                                             type="text"
                                             id="seller_field"
                                             className="form-control"
                                             value={seller}
                                             onChange={onInputChange('seller')}
                                        />
                                   </div>

                                   <div className='form-group'>
                                        <label>Images</label>

                                        <div className='custom-file'>
                                             <input
                                                  type='file'
                                                  name='product_images'
                                                  className='custom-file-input'
                                                  id='customFile'
                                                  // value={images}
                                                  onChange={onInputChange('images')}
                                                  multiple
                                             />
                                             <label className='custom-file-label' htmlFor='customFile'>
                                                  Choose Images
                                             </label>
                                        </div>

                                        {
                                             images && images.map((item, index) => (
                                                  <img src={item} alt='imgage privew' key={`img-${index}`}
                                                       className='mt-3 mr-2 imgContain'
                                                       width="55"
                                                       height="52"
                                                  />
                                             ))
                                        }
                                        {
                                             oldImages && oldImages.map((item, index) => (
                                                  <img src={item} alt='imgage privew' key={`img-${index}`}
                                                       className='mt-3 mr-2 imgContain'
                                                       width="55"
                                                       height="52"
                                                  />
                                             ))
                                        }
                                   </div>



                                   <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3"
                                        disabled={updateLoading ? true : false}
                                   >
                                        CREATE
                                   </button>


                              </form>
                         </div>
                    )
               }
          </div>
     );
}

export default EditeProduct;
