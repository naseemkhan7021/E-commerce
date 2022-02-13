import axios from 'axios';
import { showProductDetails, showProducts } from '../../api/product/product';
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERRORS } from "../../constants/product_Ctn";
import { API_URL } from "../../constants/variable";

export const getProducts = (ratings, category, priceFilter, keyWord = '', currentPage = 1) => async (dispatch) => {
     try {
          dispatch({
               type: ALL_PRODUCTS_REQUEST
          });
          // send request
          const { data } = await showProducts(ratings, category, priceFilter, keyWord, currentPage);

          dispatch({
               type: ALL_PRODUCTS_SUCCESS,
               payload: data,
          })

     } catch (error) {

          dispatch({
               type: ALL_PRODUCTS_FAIL,
               payload: error.response.data.message // get error
          })
     }
};

// get single product detials 
export const getProductDetails = (p_id) => async (dispatch) => {
     try {
          dispatch({
               type: PRODUCT_DETAILS_REQUEST
          });
          // send request
          const { data } = await showProductDetails(p_id);
          // const { data } = await axios.get(`${API_URL}/product/${p_id}`);

          dispatch({
               type: PRODUCT_DETAILS_SUCCESS,
               payload: data,
          })
     } catch (error) {
          dispatch({
               type: PRODUCT_DETAILS_FAIL,
               payload: error.response.data.message // get error
          })
     }
}

/// clear all error
export const clearErrors = () => async (dispatch) => {
     dispatch({
          type: CLEAR_ERRORS
     })
}