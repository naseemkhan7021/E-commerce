import { deleteProductReviewAPI, getProductReviewsAPI } from "../../../api/admin/review";
import { DELETE_PRODUCT_REVIEW_FAIL, DELETE_PRODUCT_REVIEW_REQUEST, DELETE_PRODUCT_REVIEW_SUCCESS, PRODUCT_REVIEWS_FAIL, PRODUCT_REVIEWS_REQUEST, PRODUCT_REVIEWS_SUCCESS } from "../../../constants/product_Ctn";

export const getProductReviewsAction = (p_id) => async (dispatch) => {
     try {
          dispatch({
               type: PRODUCT_REVIEWS_REQUEST
          });
          const { data } = await getProductReviewsAPI(p_id);
          dispatch({
               type: PRODUCT_REVIEWS_SUCCESS,
               payload: data,
               productId: p_id
          });

     } catch (error) {
          dispatch({
               type: PRODUCT_REVIEWS_FAIL,
               payload: error.response.data.message
          });
     }
}

export const deleteProductReviewsAction = (p_id, r_id) => async (dispatch) => {
     try {
          dispatch({
               type: DELETE_PRODUCT_REVIEW_REQUEST
          });
          const { data } = await deleteProductReviewAPI(p_id, r_id);
          dispatch({
               type: DELETE_PRODUCT_REVIEW_SUCCESS,
               payload: data
          });

     } catch (error) {

          dispatch({
               type: DELETE_PRODUCT_REVIEW_FAIL,
               payload: error.response.data.message
          });
     }
}