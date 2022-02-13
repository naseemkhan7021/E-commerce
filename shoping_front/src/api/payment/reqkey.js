import axios from "axios"
import { API_PATH } from "../../constants/variable"

export const paymentProcessAPI = async (data) => {
     const link = `/payment/process`
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          data
     })
}

export const getStripKeyAPI = async () => {
     const link = `/payment/stripekey`;
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'GET'
     })
}