import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { CURRENCY } from '../../constants/variable';
import { clearErrors, showOrdersAction } from '../../redux/action/orderAction';

import Loader from '../Layout/Share/Loader';
import Metadata from '../Layout/Share/MetaData';

// Material ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OrderRow from './OrderRow';


export default function Myorder() {

     const alert = useAlert();
     const dispatch = useDispatch();
     const { loading, error, orders } = useSelector(state => state.myOrders)
     const { user } = useSelector(state => state.auth)

     useEffect(() => {
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          };
          dispatch(showOrdersAction());
     }, [dispatch, alert, error]);

     return (

          <>
               <h2 className='mt-3 mb-3'>Your Orders</h2>
               {
                    loading ? (< Loader />) : (
                         <>

                              <TableContainer component={Paper}>
                                   <Metadata title={`orders-${user && user.name}`} />
                                   <Table aria-label="collapsible table">
                                        <TableHead>
                                             <TableRow>
                                                  <TableCell />
                                                  <TableCell>Date</TableCell>
                                                  <TableCell>Order Id #</TableCell>
                                                  <TableCell align="right">Number Of Items</TableCell>
                                                  <TableCell align="right">Amount</TableCell>
                                                  <TableCell align="right">Status</TableCell>
                                                  <TableCell align="right">Actions</TableCell>
                                             </TableRow>
                                        </TableHead>
                                        <TableBody>
                                             {orders.map((order, index) => (
                                                  <OrderRow key={`order-${index}`} order={order} />
                                             ))}
                                        </TableBody>
                                   </Table>
                              </TableContainer>
                              <hr />
                              <Outlet />
                         </>
                    )
               }
          </>
     );
}
