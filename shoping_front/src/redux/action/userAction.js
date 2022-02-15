import { forgotPasswordAPI, loadUserApi, loginApi, logoutAPI, registerApi, resetPasswordAPI, udpatePasswordAPI, updateUserProfileAPI } from "../../api/user/auth"
import {
     CLEAR_ERRORS,
     FORGOT_PASSWORD_FAIL,
     FORGOT_PASSWORD_REQUEST,
     FORGOT_PASSWORD_SUCCESS,
     LOAD_USER_FAIL,
     LOAD_USER_REQUEST,
     LOAD_USER_SUCCESS,
     LOGIN_FAIL,
     LOGIN_REQUEST,
     LOGIN_SUCCESS,
     LOGOUT_FAIL,
     LOGOUT_SUCCESS,
     REGISTER_FAIL,
     REGISTER_REQUEST,
     REGISTER_SUCCESS,
     RESET_PASSWORD_FAIL,
     RESET_PASSWORD_REQUEST,
     RESET_PASSWORD_SUCCESS,
     UPDATE_PASSWORD_FAIL,
     UPDATE_PASSWORD_REQUEST,
     UPDATE_PASSWORD_SUCCESS,
     UPDATE_PROFILE_REQUEST,
     UPDATE_PROFILE_SUCCESS
} from "../../constants/user_Ctn"

export const loginAction = (email, password) => async (dispatch) => {
     try {
          dispatch({ type: LOGIN_REQUEST })
          const { data } = await loginApi(email, password);
          // console.log('user data -> ', data);
          dispatch({
               type: LOGIN_SUCCESS,
               payload: data.user
          });
     } catch (error) {
          dispatch({
               type: LOGIN_FAIL,
               payload: error.response.data.message // get error
          });
     };
};

// new user register 
export const registerAction = (userData) => async (dispatch) => {
     try {
          dispatch({ type: REGISTER_REQUEST })
          // console.log('this is register', userData);
          const { data } = await registerApi(userData);
          // console.log('user data -> ', data);
          dispatch({
               type: REGISTER_SUCCESS,
               payload: data.user
          });
     } catch (error) {
          // console.log('error from register -> ', error);
          dispatch({
               type: REGISTER_FAIL,
               payload: error.response.data.message // get error
          });
     };
};

// update user profile 
export const updateUserProfileAction = (userData) => async (dispatch) => {
     try {
          dispatch({ type: UPDATE_PROFILE_REQUEST });
          const { data } = await updateUserProfileAPI(userData);
          // console.log('user data -> ', data);
          dispatch({
               type: UPDATE_PROFILE_SUCCESS,
               payload: data.success
          });
     } catch (error) {
          // console.log('error from register -> ', error);
          dispatch({
               type: REGISTER_FAIL,
               payload: error.response.data.message // get error
          });
     }
}

// update user password
export const updatePassowrdAction = (userData) => async (dispatch) => {
     try {
          dispatch({ type: UPDATE_PASSWORD_REQUEST })
          const { data } = await udpatePasswordAPI(userData);
          dispatch({
               type: UPDATE_PASSWORD_SUCCESS,
               payload: data.success
          })
     } catch (error) {
          // console.log('error from register -> ', error);
          dispatch({
               type: UPDATE_PASSWORD_FAIL,
               payload: error.response.data.message // get error
          });
     }
}

// forgot user password
export const forgotPassowrdAction = (userData) => async (dispatch) => {

     try {
          dispatch({ type: FORGOT_PASSWORD_REQUEST })
          const { data } = await forgotPasswordAPI(userData);
          dispatch({
               type: FORGOT_PASSWORD_SUCCESS,
               payload: data.message
          })
     } catch (error) {
          // console.log('error from register -> ', error);
          dispatch({
               type: FORGOT_PASSWORD_FAIL,
               payload: error.response.data.message // get error
          });
     }
}

// reset user password
export const resetPassowrdAction = (token, password) => async (dispatch) => {

     try {
          dispatch({ type: RESET_PASSWORD_REQUEST })
          const { data } = await resetPasswordAPI(token, password);
          dispatch({
               type: RESET_PASSWORD_SUCCESS,
               payload: data.success
          })
     } catch (error) {
          // console.log('error from register -> ', error);
          dispatch({
               type: RESET_PASSWORD_FAIL,
               payload: error.response.data.message // get error
          });
     }
}

// Logout user
export const logoutAction = () => async (dispatch) => {
     try {

          await logoutAPI();
          // console.log('data logout ', data);
          dispatch({
               type: LOGOUT_SUCCESS
               // payload: data
          })

     } catch (error) {
          dispatch({
               type: LOGOUT_FAIL,
               payload: error.response.data.message // get error
          })
     }
}

// Load user
export const loadUserAction = () => async (dispatch) => {
     try {
          dispatch({ type: LOAD_USER_REQUEST })
          const { data } = await loadUserApi();
          // console.log('user data -> ', data); 
          dispatch({
               type: LOAD_USER_SUCCESS,
               payload: data.user
          });
     } catch (error) {
          // console.log('error load -> ', error);
          dispatch({
               type: LOAD_USER_FAIL,
               payload: error.response.data.message // get error
          });
     };
};



/// clear all error
export const clearErrors = () => (dispatch) => {
     dispatch({
          type: CLEAR_ERRORS
     });
};