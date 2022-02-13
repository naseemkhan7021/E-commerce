import { Link, NavLink } from 'react-router-dom';

const Checkoutsteps = ({ shipping, confirmOrder, payment }) => {
     return (
          <div className="checkout-progress d-flex justify-content-center mt-5">


               {
                    shipping ? <NavLink to='/shippinginfo' style={({ isActive }) => {
                         return {
                              backgroundColor: isActive ? "red" : ""
                         }
                    }} className="float-right">
                         <div className="triangle2-active"></div>
                         <div className="step active-step">Shipping</div>
                         <div className="triangle-active"></div>
                    </NavLink> : <Link to="#" disabled>
                         <div className="triangle2-incomplete"></div>
                         <div className="step incomplete">Shipping</div>
                         <div className="triangle-incomplete"></div>
                    </Link>
               }

               {
                    confirmOrder ? <NavLink to='/orders/confirm' style={({ isActive }) => {
                         return {
                              backgroundColor: isActive ? "red" : ""
                         }
                    }} className="float-right">
                         <div className="triangle2-active"></div>
                         <div className="step active-step">Confirm Order</div>
                         <div className="triangle-active"></div>
                    </NavLink> : <Link to="#" disabled>
                         <div className="triangle2-incomplete"></div>
                         <div className="step incomplete">Confirm Order</div>
                         <div className="triangle-incomplete"></div>
                    </Link>
               }

               {
                    payment ? <NavLink to='/orders/payment' style={({ isActive }) => {
                         return {
                              backgroundColor: isActive ? "red" : ""
                         }
                    }} className="float-right">
                         <div className="triangle2-active"></div>
                         <div className="step active-step">Payment</div>
                         <div className="triangle-active"></div>
                    </NavLink> : <Link to="#" disabled>
                         <div className="triangle2-incomplete"></div>
                         <div className="step incomplete">Payment</div>
                         <div className="triangle-incomplete"></div>
                    </Link>
               }


          </div>
     );
}

export default Checkoutsteps;
