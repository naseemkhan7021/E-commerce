import { Outlet } from 'react-router-dom'

const Orders = () => {
     return (
          <div className='container container-fluid' >
               {/* <h1> this is orders page</h1> */}
               <Outlet />
          </div>
     );
}

export default Orders;
