import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_CREAT_RESET } from '../../../constants/product_Ctn';
import { CATEGORY } from '../../../constants/variable';
import { creatNewProductAction } from '../../../redux/action/admin/products';
import { clearErrors } from '../../../redux/action/productAct';

const Createproduct = () => {
     const [name, setName] = useState('');
     const [price, setPrice] = useState(0);
     const [description, setDescription] = useState('');
     const [images, setImages] = useState([]);
     const [category, setCategory] = useState('');
     const [seller, setSeller] = useState('');
     const [stock, setStock] = useState(0);

     const alert = useAlert();
     const navigat = useNavigate();
     const dispatch = useDispatch();
     const { loading, error, products, success } = useSelector(state => state.creatNewProduct);


     useEffect(() => {
          if (success) {
               alert.success('new product created successfull !!!')
               dispatch({
                    type: NEW_PRODUCT_CREAT_RESET
               });
               navigat('/admin/products'); // or show the all details on right site
          }
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }

     }, [dispatch, alert, error, success])

     const onInputChange = name => e => {
          switch (name) {
               case 'images':
                    const files = Array.from(e.target.files);
                    // console.log('files -> ', files);
                    setImages([]);

                    files.forEach(image => {
                         const reader = new FileReader();
                         reader.onload = () => {
                              if (reader.readyState === 2) {
                                   // setAvtarPreview(reader.result);
                                   console.log('reader');
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
          console.log('come 1');
          const formData = new FormData();
          formData.set('name', name)
          formData.set('price', price)
          formData.set('description', description)
          formData.set('category', category)
          formData.set('seller', seller)
          formData.set('stock', stock)
          console.log('come 2');
          images.forEach(image => {
               formData.append('images', image)
          });
          console.log('come 3');
          dispatch(creatNewProductAction(formData))
          console.log('come 4');
     }

     return (
          <div className="col-12 col-md-10">
               <h2 className="m-3">Add New Product</h2>
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
                                   images.map((item, index) => (
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
                              disabled={loading ? true : false}
                         >
                              CREATE
                         </button>


                    </form>
               </div>
          </div>
     );
}

export default Createproduct;
