import { createOrderAPI, showSingleOrderAPI, showUserOrderAPI } from "../../api/order/order";
import { ALL_ORDERs_FAIL, ALL_ORDERs_REQUEST, ALL_ORDERs_SUCCESS, CLEAR_ERRORS, CREAT_ORDER_FAIL, CREAT_ORDER_REQUEST, CREAT_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../../constants/order_Ctn"

export const makeOrderAction = (orderData) => async (dispatch) => {
     try {
          dispatch({
               type: CREAT_ORDER_REQUEST
          });

          const { data } = await createOrderAPI(orderData);

          dispatch({
               type: CREAT_ORDER_SUCCESS,
               payload: data
          })
     } catch (error) {

          dispatch({ type: CREAT_ORDER_FAIL, payload: error.response.data.message })
     }
}

// show all user orders list
export const showOrdersAction = () => async (dispatch) => {
     try {
          dispatch({
               type: ALL_ORDERs_REQUEST
          });

          const { data } = await showUserOrderAPI();

          dispatch({
               type: ALL_ORDERs_SUCCESS,
               payload: data.orders
          })
     } catch (error) {
          // console.log(error.response);
          dispatch({ type: ALL_ORDERs_FAIL, payload: error.response.data.message })
     }
}

// single order detials
export const singleOrderDetailsAction = (o_id) => async (dispatch) => {
     try {
          dispatch({
               type: ORDER_DETAILS_REQUEST
          });
          const { data } = await showSingleOrderAPI(o_id)
          dispatch({
               type: ORDER_DETAILS_SUCCESS,
               payload: data
          })
     } catch (error) {
          dispatch({
               type: ORDER_DETAILS_FAIL,
               payload: error.response.data.message
          })
     }
}

/// clear all error
export const clearErrors = () => (dispatch) => {
     dispatch({
          type: CLEAR_ERRORS
     });
};