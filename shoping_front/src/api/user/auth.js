import axios from "axios"
import { API_PATH } from "../../constants/variable";
// import { API_URL } from "../../constants/variable"

export const loginApi = async (email, password) => {
     let link = `/login`
     let headers = {
          "Accept": "application/json",
          "Content-Type": "application/json",
     }
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'POST',
          data: {
               email, password
          },
          headers,
          withCredentials: true,
     });
};

// new user register api
export const registerApi = async (userData) => {
     let link = `/register`
     let headers = {
          'Content-Type': 'multipart/form-data'
     }
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'POST',
          data: userData,
          headers
     });
};

// update user profile
export const updateUserProfileAPI = async (userData) => {
     let link = `/me/update`;
     let headers = {
          'Content-Type': 'multipart/form-data'
     }
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'PUT',
          data: userData,
          headers
     })
}

// update user password
export const udpatePasswordAPI = async (userData) => {
     let link = `/password/update`;
     let headers = {
          'Content-Type': 'application/json'
     }
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'PATCH',
          data: userData,
          headers
     })
}

// forgot user password
export const forgotPasswordAPI = async (userData) => {
     let link = `/password/forgot`;
     let headers = {
          'Content-Type': 'application/json'
     }
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'POST',
          data: userData,
          headers
     })
}

// reset user password
export const resetPasswordAPI = async (token, password) => {
     let link = `/password/reset/${token}`;
     let headers = {
          'Content-Type': 'application/json'
     }
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'PATCH',
          data: password,
          headers
     })
}

export const logoutAPI = async () => {
     let link = `/logout`;
     let headers = {};
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'GET'
     })
}

// new user register api
export const loadUserApi = async () => {
     let link = `/me`
     let headers = {
          'Content-Type': 'multipart/form-data'
     }
     return await axios({
          baseURL: API_PATH,
          url: link,
          method: 'GET',
          headers
     });
};

