import axios from "axios"
import { API_PATH } from "../../constants/variable"

export const addUpdateReviewAPI = async (data) => {
     const link = `/review`
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'PUT',
          headers: {
               'Content-Type': 'application/json'
          },
          data

     })
}