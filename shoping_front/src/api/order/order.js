import axios from "axios";
import { API_PATH } from "../../constants/variable";

var link = `${API_PATH}/order`
export const createOrderAPI = async (orderData) => {
     const headers = {
          'Content-Type': 'application/json'
     }
     // console.log('orderData -> ', orderData);
     return await axios({
          baseURL: link,
          url: `/new`,
          method: 'POST',
          headers,
          data: orderData
     });
};

export const showUserOrderAPI = async () => {
     return await axios({
          baseURL: API_PATH,
          url: `/orders/my`,
          method: 'GET',
     });
};

export const showSingleOrderAPI = async (o_id) => {
     return await axios({
          baseURL: link,
          url: `/${o_id}`,
          method: 'GET'
     });
};