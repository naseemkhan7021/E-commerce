import { addUpdateReviewAPI } from "../../api/product/review";
import { NEW_PRODUCT_REVIEW_REQUEST, NEW_PRODUCT_REVIEW_SUCCESS, NEW_PRODUCT_REVIEW_FAIL } from "../../constants/product_Ctn"

export const addUpdateReviewAction = (reviewData) => async (dispatch) => {
     try {
          dispatch({
               type: NEW_PRODUCT_REVIEW_REQUEST
          });

          const { data } = await addUpdateReviewAPI(reviewData);
          dispatch({
               type: NEW_PRODUCT_REVIEW_SUCCESS,
               payload: data.success
          })
     } catch (error) {
          dispatch({
               type: NEW_PRODUCT_REVIEW_FAIL,
               payload: error.response.data.message
          })
     }
}