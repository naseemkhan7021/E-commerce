import { deleteOrderAPI, showAllOrdersAPI, updateOrderAPI } from "../../../api/admin/order";
import { ADMIN_ALL_ORDERs_FAIL, ADMIN_ALL_ORDERs_REQUEST, ADMIN_ALL_ORDERs_SUCCESS, ADMIN_DELETE_ORDER_FAIL, ADMIN_DELETE_ORDER_REQUEST, ADMIN_DELETE_ORDER_SUCCESS, ADMIN_UPDATE_ORDER_FAIL, ADMIN_UPDATE_ORDER_REQUEST, ADMIN_UPDATE_ORDER_SUCCESS } from "../../../constants/order_Ctn";

export const getAllOrdersAction = () => async (dispatch) => {
     try {
          dispatch({
               type: ADMIN_ALL_ORDERs_REQUEST
          });
          // send request
          const { data } = await showAllOrdersAPI();

          dispatch({
               type: ADMIN_ALL_ORDERs_SUCCESS,
               payload: data,
          })

     } catch (error) {
          dispatch({
               type: ADMIN_ALL_ORDERs_FAIL,
               payload: error.response.data.message // get error
          })
     }
};

export const updateOrderActions = (o_id, formData) => async (dispatch) => {
     try {
          dispatch({
               type: ADMIN_UPDATE_ORDER_REQUEST
          });
          const { data } = await updateOrderAPI(o_id, formData);
          dispatch({
               type: ADMIN_UPDATE_ORDER_SUCCESS,
               payload: data
          });

     } catch (error) {
          dispatch({
               type: ADMIN_UPDATE_ORDER_FAIL,
               payload: error.response.data.message
          })
     }
}

export const deleteOrderActions = (o_id) => async (dispatch) => {
     try {
          dispatch({
               type: ADMIN_DELETE_ORDER_REQUEST
          });
          const { data } = await deleteOrderAPI(o_id);
          dispatch({
               type: ADMIN_DELETE_ORDER_SUCCESS,
               payload: data
          });

     } catch (error) {
          dispatch({
               type: ADMIN_DELETE_ORDER_FAIL,
               payload: error.response.data.message
          })
     }
}