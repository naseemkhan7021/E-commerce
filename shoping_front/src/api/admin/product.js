import axios from "axios";
import { API_PATH } from "../../constants/variable";

const api_url = `${API_PATH}/admin`
// get all products 
export const showAllProductsAPI = async () => {
     // /admin/products
     return await axios({
          baseURL: api_url,
          url: `/products`,
          method: 'GET'
     });
}

// create new product
export const creaNewProductAPI = async (formdata) => {
     return await axios({
          baseURL: api_url,
          url: '/product/new',
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          data: formdata
     })
}

// UPDATE product 
export const updateProductAPI = async (p_id, formdata) => {
     return await axios({
          baseURL: api_url,
          url: `/product/${p_id}`,
          method: 'PUT',
          headers: {
               'Content-Type': 'application/json'
          },
          data: formdata
     })
}

// delete product 
export const deleteProductAPI = async (p_id) => {
     return await axios({
          baseURL: api_url,
          url: `/product/${p_id}`,
          method: 'DELETE',
     })
}