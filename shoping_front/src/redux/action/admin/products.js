import { creaNewProductAPI, deleteProductAPI, showAllProductsAPI, updateProductAPI } from "../../../api/admin/product";
import { ADMIN_ALL_PRODUCTS_FAIL, ADMIN_ALL_PRODUCTS_REQUEST, ADMIN_ALL_PRODUCTS_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_CREAT_FAIL, NEW_PRODUCT_CREAT_REQUEST, NEW_PRODUCT_CREAT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../../../constants/product_Ctn";

export const getAllProductsAction = () => async (dispatch) => {
     try {
          dispatch({
               type: ADMIN_ALL_PRODUCTS_REQUEST
          });
          // send request
          const { data } = await showAllProductsAPI();

          dispatch({
               type: ADMIN_ALL_PRODUCTS_SUCCESS,
               payload: data,
          })

     } catch (error) {
          dispatch({
               type: ADMIN_ALL_PRODUCTS_FAIL,
               payload: error.response.data.message // get error
          })
     }
};

export const creatNewProductAction = (productData) => async (dispatch) => {
     try {
          dispatch({
               type: NEW_PRODUCT_CREAT_REQUEST
          });
          const { data } = await creaNewProductAPI(productData);
          dispatch({
               type: NEW_PRODUCT_CREAT_SUCCESS,
               payload: data
          });

     } catch (error) {

          dispatch({
               type: NEW_PRODUCT_CREAT_FAIL,
               error: error.response.data.message
          });
     }
};

export const updateProductAction = (p_id, productData) => async (dispatch) => {
     try {
          dispatch({
               type: UPDATE_PRODUCT_REQUEST
          });
          const { data } = await updateProductAPI(p_id, productData);
          dispatch({
               type: UPDATE_PRODUCT_SUCCESS,
               payload: data
          });

     } catch (error) {

          dispatch({
               type: UPDATE_PRODUCT_FAIL,
               error: error.response.data.message
          });
     }
};

export const deleteProductAction = (p_id) => async (dispatch) => {
     try {
          dispatch({
               type: DELETE_PRODUCT_REQUEST
          });
          const { data } = await deleteProductAPI(p_id);
          dispatch({
               type: DELETE_PRODUCT_SUCCESS,
               payload: data
          });

     } catch (error) {
          dispatch({
               type: DELETE_PRODUCT_FAIL,
               error: error.response.data.message
          });
     }
}