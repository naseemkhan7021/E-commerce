import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CURRENCY, env_texParcent } from '../../constants/variable';

// Material ui 
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import { Fragment } from 'react';

function OrderRow({ order }) {
     // const { row } = props;
     const [open, setOpen] = useState(false);
     const navigate = useNavigate();

     return (
          <Fragment key={`row-${order._id}`}>
               <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                         <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => setOpen(!open)}
                         >
                              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                         </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                         {new Date(order.createdAt).toDateString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                         {order._id}
                    </TableCell>
                    <TableCell align="center">{order.orderItems.length}</TableCell>
                    <TableCell align="right">{CURRENCY}{order.totalPrice}</TableCell>
                    <TableCell align="right" className='text-capitalize'  ><p className={order.orderStatus === 'processing' ? 'redColor' : order.orderStatus === 'Shipped' ? 'orange' : 'greenColor'}>{order.orderStatus}</p></TableCell>
                    <TableCell align="right"> <Button onClick={() => navigate(order._id)}><VisibilityIcon className='orange' /></Button></TableCell>
               </TableRow>
               <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                         <Collapse in={open} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                   <Typography variant="h6" gutterBottom component="div">
                                        {order.orderItems.length} Products
                                   </Typography>
                                   <Table size="small" aria-label="purchases">
                                        <TableHead>
                                             <TableRow>
                                                  <TableCell>Image</TableCell>
                                                  <TableCell >Name</TableCell>
                                                  <TableCell>Qnty</TableCell>
                                                  <TableCell align="right">Amount</TableCell>
                                                  <TableCell align="right">Total price ({CURRENCY})</TableCell>
                                                  {/* <TableCell align="right"></TableCell> */}

                                             </TableRow>
                                        </TableHead>
                                        <TableBody>
                                             {order.orderItems.map((item, index) => (
                                                  <>
                                                       <TableRow key={`item-${item.name}-${index}`}>
                                                            <TableCell component="th" scope="row">
                                                                 {/* {item.createdAt} */}
                                                                 <img src={item.image} alt={`${item.name}}`} width="56" className='con' />
                                                            </TableCell>
                                                            <TableCell className='text-capitalize'>
                                                                 <Link to={`/product/${item.product_id}`} >{item.name.slice(0, 30)}{item.name.length > 30 ? ('...') : ('')}</Link>
                                                            </TableCell>
                                                            <TableCell>{item.quantity}</TableCell>
                                                            <TableCell align="right">{item.price}</TableCell>
                                                            <TableCell align="right">
                                                                 {item.price * item.quantity}
                                                            </TableCell>
                                                            {/* <TableCell align="right">

                                                       </TableCell> */}
                                                       </TableRow>


                                                  </>

                                             ))}
                                             <TableRow>
                                                  <TableCell rowSpan={4} colSpan={2} />
                                                  <TableCell colSpan={2}><strong>Subtotal</strong></TableCell>
                                                  <TableCell align="right">{CURRENCY}{order.itemsPrice}</TableCell>
                                             </TableRow>
                                             <TableRow>
                                                  <TableCell><strong>Tax</strong></TableCell>
                                                  <TableCell align="right"><strong>{env_texParcent} %</strong></TableCell>
                                                  <TableCell align="right">{CURRENCY}{order.taxPrice}</TableCell>
                                             </TableRow>
                                             <TableRow>
                                                  <TableCell colSpan={2}><strong>Shipping Price</strong></TableCell>
                                                  <TableCell align="right">{CURRENCY}{order.shippingPrice}</TableCell>
                                             </TableRow>
                                             <TableRow>
                                                  <TableCell colSpan={2}><strong>Total</strong></TableCell>
                                                  <TableCell align="right"><strong>{CURRENCY}{order.totalPrice}</strong></TableCell>
                                             </TableRow>
                                        </TableBody>
                                   </Table>
                              </Box>
                         </Collapse>
                    </TableCell>
               </TableRow>
          </Fragment>
     );
}

export default OrderRow