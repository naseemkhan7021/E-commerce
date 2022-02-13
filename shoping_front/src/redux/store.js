import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { addUpdateRiviewReducer, creatNewProductReducer, deleteProductReducer, deleteRiviewReducer, getRiviewsReducer, productDetailsReducer, productsReducer, updateProductReducer } from './reducers/product_Rdcr';
import { authReducer, forgotPassowrdReducer, UDuserReducer, userDetailsReducer, userReducer, usersReducer } from './reducers/userReducer';
import { cardReducer } from './reducers/card_Rdcr';
import { orderDetailsReducer, orderReducer, showAllOrdersReducer, showMyOrdersReducer } from './reducers/orderReducer';

const reducer = combineReducers({
     products: productsReducer,
     productDetails: productDetailsReducer,
     creatNewProduct: creatNewProductReducer,
     deleteProduct: deleteProductReducer,
     updateProduct: updateProductReducer,
     auth: authReducer,
     user: userReducer,
     forgotPassowrd: forgotPassowrdReducer,
     card: cardReducer,
     order: orderReducer,
     myOrders: showMyOrdersReducer,
     allOrders: showAllOrdersReducer,
     orderDetails: orderDetailsReducer,
     // proccessOrder: proccessOrderReducer,
     addUpdateRiview: addUpdateRiviewReducer,

     allusers: usersReducer,
     udUser: UDuserReducer, //---> ud --> update delete
     userDetails: userDetailsReducer,

     getReviews: getRiviewsReducer,
     deleteReview: deleteRiviewReducer,
})

let initialState = {
     card: {
          cardItems: localStorage.getItem('cardItems')
               ? JSON.parse(localStorage.getItem('cardItems'))
               : [],
          shippingInfo: localStorage.getItem('shippingInfo')
               ? JSON.parse(localStorage.getItem('shippingInfo'))
               : {}
     }
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store; 