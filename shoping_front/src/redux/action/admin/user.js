import { deleteUserAPI, showSllUsersAPI, udpateUserAPI, userDetailsAPI } from "../../../api/admin/user";

const { ADMIN_ALL_USERS_REQUEST,
     ADMIN_ALL_USERS_SUCCESS,
     ADMIN_ALL_USERS_FAIL,
     ADMIN_DELETE_USER_REQUEST,
     ADMIN_DELETE_USER_SUCCESS,
     ADMIN_DELETE_USER_FAIL,
     ADMIN_USER_DETAILS_REQUEST,
     ADMIN_USER_DETAILS_SUCCESS,
     ADMIN_USER_DETAILS_FAIL,
     ADMIN_UPDATE_USER_REQUEST,
     ADMIN_UPDATE_USER_SUCCESS,
     ADMIN_UPDATE_USER_FAIL } = require("../../../constants/user_Ctn");

export const showAlluserAction = () => async (dispatch) => {
     try {
          dispatch({
               type: ADMIN_ALL_USERS_REQUEST
          });

          const { data } = await showSllUsersAPI();
          dispatch({
               type: ADMIN_ALL_USERS_SUCCESS,
               payload: data
          });
     } catch (error) {
          dispatch({
               type: ADMIN_ALL_USERS_FAIL,
               payload: error.response.data.message
          })
     }
}

export const userDetailsAction = (u_id) => async (dispatch) => {
     try {
          dispatch({
               type: ADMIN_USER_DETAILS_REQUEST
          });

          const { data } = await userDetailsAPI(u_id);
          dispatch({
               type: ADMIN_USER_DETAILS_SUCCESS,
               payload: data
          });
     } catch (error) {
          dispatch({
               type: ADMIN_USER_DETAILS_FAIL,
               payload: error.response.data.message
          })
     }
}

export const updateuserAction = (u_id, formData) => async (dispatch) => {
     try {
          dispatch({
               type: ADMIN_UPDATE_USER_REQUEST
          });

          const { data } = await udpateUserAPI(u_id, formData);
          dispatch({
               type: ADMIN_UPDATE_USER_SUCCESS,
               payload: data
          });
     } catch (error) {
          dispatch({
               type: ADMIN_UPDATE_USER_FAIL,
               payload: error.response.data.message
          })
     }
}

export const deleteuserAction = (u_id) => async (dispatch) => {
     try {
          dispatch({
               type: ADMIN_DELETE_USER_REQUEST
          });

          const { data } = await deleteUserAPI(u_id);
          dispatch({
               type: ADMIN_DELETE_USER_SUCCESS,
               payload: data
          });
     } catch (error) {
          dispatch({
               type: ADMIN_DELETE_USER_FAIL,
               payload: error.response.data.message
          })
     }
}