import axios from "axios"
import { API_PATH } from "../../constants/variable"

export const showSllUsersAPI = async () => {
     return await axios({
          baseURL: API_PATH,
          url: '/admin/users',
          method: 'GET'
     })
};

export const userDetailsAPI = async (u_id) => {
     return await axios({
          baseURL: API_PATH,
          url: `/admin/user/${u_id}`,
          method: 'GET'
     })
}

export const udpateUserAPI = async (u_id, formData) => {
     return await axios({
          baseURL: API_PATH,
          url: `/admin/user/${u_id}`,
          method: 'PUT',
          headers: {
               'Content-Type': 'application/json'
          },
          data: formData,
     });
};
export const deleteUserAPI = async (u_id) => {
     return await axios({
          baseURL: API_PATH,
          url: `/admin/user/${u_id}`,
          method: 'DELETE'
     });
};