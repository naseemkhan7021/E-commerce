import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Layout/Share/Loader';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteOrderActions, getAllOrdersAction } from '../../../redux/action/admin/order';
import { clearErrors } from '../../../redux/action/orderAction';
import { CURRENCY } from '../../../constants/variable';
import { ADMIN_DELETE_ORDER_RESET } from '../../../constants/order_Ctn';

const AllOrders = () => {

     const { loading, error, orders } = useSelector(state => state.allOrders)
     const { loading: deleteLoading, error: deleteError, isUpdated } = useSelector(state => state.order)
     const alert = useAlert();
     const dispatch = useDispatch()

     useEffect(() => {
          dispatch(getAllOrdersAction())
          if (error) {
               alert.error(error)
               dispatch(clearErrors())
          }
          if (deleteError) {
               alert.error(deleteError)
               dispatch(clearErrors())
          }
          if (isUpdated) {
               alert.success('Order Deleted successfully !!!')
               dispatch({
                    type: ADMIN_DELETE_ORDER_RESET
               })
          }
     }, [dispatch, alert, error, deleteError, isUpdated])

     const setOrdersData = () => {
          const data = {
               columns: [
                    {
                         label: 'Customer ID',
                         field: 'c_id',
                         sort: 'acs'
                    },
                    {
                         label: 'Order ID',
                         field: 'p_id',
                         sort: 'acs'
                    },
                    {
                         label: 'Number of Item',
                         field: 'numOfItems',
                         sort: 'acs'
                    },
                    {
                         label: 'Amount',
                         field: 'amount',
                         sort: 'acs'
                    },
                    {
                         label: 'Status',
                         field: 'status',
                         sort: 'acs'
                    },
                    {
                         label: 'Actions',
                         field: 'actions'
                    },
               ],
               rows: []
          };

          orders && orders.forEach(order => {
               data.rows.push({
                    c_id: order.user && order.user._id,
                    p_id: order._id,
                    numOfItems: order.orderItems.length,
                    amount: `${CURRENCY}${order.totalPrice}`,
                    status: <p className={`text-capitalize ${order.orderStatus === 'processing' ? 'redColor' : order.orderStatus === 'Shipped' ? 'orange' : 'greenColor'}`}>{order.orderStatus}</p>,
                    actions: <div className=''>
                         <Link to={`/admin/order/${order._id}`} className='btn btn-primary py-1 px-2'>
                              <i className='fa fa-eye'></i>
                         </Link>
                         <button disabled={deleteLoading ? true : false} onClick={() => deleteBtnClicked(order._id)} className='btn btn-danger py-1 px-2 ml-1' >
                              <i className='fa fa-trash'></i>
                         </button>
                    </div>
               })
          });

          return data
     }

     const deleteBtnClicked = (o_id) => {
          dispatch(deleteOrderActions(o_id))
     }

     return (
          <div className="col-12 col-md-10">
               <h2 className="m-3">All Orders</h2>
               {
                    loading ? (< Loader />) : (
                         <>
                              <MDBDataTable
                                   className='px-3'
                                   data={setOrdersData()}
                                   bordered
                                   striped
                                   hover
                              />
                              {/* {JSON.stringify(orders)} */}
                         </>
                    )
               }
          </div>
     );
}

export default AllOrders;
