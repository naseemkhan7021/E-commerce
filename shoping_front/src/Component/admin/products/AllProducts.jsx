import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Layout/Share/Loader';
import { useEffect } from 'react';
import { deleteProductAction, getAllProductsAction } from '../../../redux/action/admin/products';
import { clearErrors } from '../../../redux/action/productAct';
import { Link } from 'react-router-dom';
import { DELETE_PRODUCT_RESET } from '../../../constants/product_Ctn';

const Allproducts = () => {

     const { loading, error, products } = useSelector(state => state.products)
     const { loading: deleteLoading, error: deleteError, success: isDeleted } = useSelector(state => state.deleteProduct)
     const alert = useAlert();
     const dispatch = useDispatch()

     useEffect(() => {
          dispatch(getAllProductsAction())
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
          if (deleteError) {
               alert.error(deleteError)
               dispatch(clearErrors())
          }
          if (isDeleted) {
               alert.success('Product deleted successfully !!!')
               dispatch({
                    type: DELETE_PRODUCT_RESET
               });
          }
     }, [dispatch, alert, error, deleteError, isDeleted])

     const setProductsData = () => {
          const data = {
               columns: [
                    {
                         label: 'ID',
                         field: 'id',
                         sort: 'acs'
                    },
                    {
                         label: 'Name',
                         field: 'name',
                         sort: 'acs'
                    },
                    {
                         label: 'Price',
                         field: 'price',
                         sort: 'acs'
                    },
                    {
                         label: 'Stock',
                         field: 'stock',
                         sort: 'acs'
                    },
                    {
                         label: 'Actions',
                         field: 'actions'
                    },
               ],
               rows: []
          };

          products && products.forEach(product => {
               data.rows.push({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    stock: product.stock,
                    actions: <div className='d-flex'>
                         <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-2'>
                              <i className='fa fa-pencil'></i>
                         </Link>
                         <button disabled={deleteLoading ? true : false} onClick={() => deleteProduct(product._id)} className='btn btn-danger py-1 px-2 ml-1' >
                              <i className='fa fa-trash'></i>
                         </button>
                    </div>
               })
          });

          return data
     }

     const deleteProduct = (p_id) => {
          dispatch(deleteProductAction(p_id));
     }
     return (
          <div className="col-12 col-md-10">
               <h2 className="m-3">All Products</h2>
               {
                    loading ? (< Loader />) : (
                         <>

                              <MDBDataTable
                                   className='px-3'
                                   data={setProductsData()}
                                   bordered
                                   striped
                                   hover
                                   searchLabel='Search From here'
                              />
                         </>
                    )
               }
          </div>
     );
}

export default Allproducts;
