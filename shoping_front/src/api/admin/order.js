import axios from "axios"
import { API_PATH } from "../../constants/variable"

export const showAllOrdersAPI = async () => {
     return await axios({
          baseURL: API_PATH,
          url: '/admin/orders',
          method: 'GET'
     })
}

export const updateOrderAPI = async (o_id, formdata) => {
     return await axios({
          baseURL: API_PATH,
          url: `/admin/order/${o_id}`,
          method: 'PATCH',
          headers: {
               'Content-Type': 'application/json'
          },
          data: formdata
     })
}

export const deleteOrderAPI = async (o_id) => {
     return await axios({
          baseURL: API_PATH,
          url: `/admin/order/${o_id}`,
          method: 'DELETE'
     })
}