import axios from "axios";
import { API_PATH } from "../../constants/variable";

export const getProductReviewsAPI = async (p_id) => {
     // /admin/products
     return await axios({
          baseURL: API_PATH,
          url: `/reviews?id=${p_id}`,
          method: 'GET'
     });
}

export const deleteProductReviewAPI = async (p_id, r_id) => {
     // /admin/products
     return await axios({
          baseURL: API_PATH,
          url: `/review?productId=${p_id}&reviewId=${r_id}`,
          method: 'DELETE'
     });
}