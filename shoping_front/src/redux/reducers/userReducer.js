const { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, CLEAR_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, ADMIN_ALL_USERS_REQUEST, ADMIN_ALL_USERS_SUCCESS, ADMIN_ALL_USERS_FAIL, ADMIN_DELETE_USER_REQUEST, ADMIN_DELETE_USER_SUCCESS, ADMIN_DELETE_USER_FAIL, ADMIN_UPDATE_USER_REQUEST, ADMIN_UPDATE_USER_SUCCESS, ADMIN_DELETE_USER_RESET, ADMIN_UPDATE_USER_RESET, ADMIN_UPDATE_USER_FAIL, ADMIN_USER_DETAILS_REQUEST, ADMIN_USER_DETAILS_SUCCESS, ADMIN_USER_DETAILS_FAIL } = require("../../constants/user_Ctn");


export const usersReducer = (state = { users: [] }, action) => {
     switch (action.type) {
          case ADMIN_ALL_USERS_REQUEST:
               return {
                    loading: true,
                    users: []
               }
          case ADMIN_ALL_USERS_SUCCESS:
               return {
                    loading: false,
                    users: action.payload.users,
                    totalusersCount: action.payload.totalusersCount,
                    // error:'this is error',
               }
          case ADMIN_ALL_USERS_FAIL:
               return {
                    loading: false,
                    error: action.payload
               }
          case CLEAR_ERRORS:
               return {
                    ...state,
                    error: null
               }
          default:
               return state
     };
};

export const userDetailsReducer = (state = { user: {} }, action) => {
     switch (action.type) {
          case ADMIN_USER_DETAILS_REQUEST:
               return {
                    ...state,
                    loading: true
               }
          case ADMIN_USER_DETAILS_SUCCESS:
               return {
                    loading: false,
                    user: action.payload.user
                    // error:'this is error',
               }
          case ADMIN_USER_DETAILS_FAIL:
               return {
                    loading: false,
                    error: action.payload
               }
          case CLEAR_ERRORS:
               return {
                    ...state,
                    error: null
               }
          default:
               return state
     };
};

export const UDuserReducer = (state = {}, action) => {
     switch (action.type) {
          case ADMIN_UPDATE_USER_REQUEST:
          case ADMIN_DELETE_USER_REQUEST:
               return {
                    ...state,
                    loading: true
               }
          case ADMIN_UPDATE_USER_SUCCESS:
          case ADMIN_DELETE_USER_SUCCESS:
               return {
                    loading: false,
                    success: action.payload.success
               }
          case ADMIN_UPDATE_USER_RESET:
          case ADMIN_DELETE_USER_RESET:
               return {
                    ...state,
                    success: false
               }
          case ADMIN_UPDATE_USER_FAIL:
          case ADMIN_DELETE_USER_FAIL:
               return {
                    loading: false,
                    error: action.payload
               }
          case CLEAR_ERRORS:
               return {
                    ...state,
                    error: null
               }
          default:
               return state
     };
};


export const authReducer = (state = { user: {} }, action) => {
     switch (action.type) {
          case LOGIN_REQUEST:
          case REGISTER_REQUEST:
          case LOAD_USER_REQUEST:
               return {
                    loading: true,
                    isAuthenticated: false
               }
          case LOGIN_SUCCESS:
          case REGISTER_SUCCESS:
          case LOAD_USER_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    isAuthenticated: true,
                    user: action.payload
               }
          case LOGOUT_SUCCESS:
               return {
                    loading: false,
                    isAuthenticated: false,
                    user: null
                    // data: action.payload
               }
          case LOAD_USER_FAIL:
               return {
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    error: action.payload
               }
          case LOGOUT_FAIL:
               return {
                    ...state,
                    error: action.payload
               }
          case LOGIN_FAIL:
          case REGISTER_FAIL:
               return {
                    loading: false,
                    isAuthenticated: false,
                    error: action.payload
               }
          case CLEAR_ERRORS:
               return {
                    ...state,
                    error: null
               }
          default:
               return state;
     }
}

export const userReducer = (state = { user: {} }, action) => {
     switch (action.type) {
          case UPDATE_PROFILE_REQUEST:
          case UPDATE_PASSWORD_REQUEST:
               return {
                    ...state,
                    loading: true,
               }
          case UPDATE_PROFILE_SUCCESS:
          case UPDATE_PASSWORD_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload
               }
          case UPDATE_PROFILE_RESET:
          case UPDATE_PASSWORD_RESET:
               return {
                    ...state,
                    isUpdated: false
               }
          case UPDATE_PROFILE_FAIL:
          case UPDATE_PASSWORD_FAIL:
               return {
                    ...state,
                    loading: false,
                    error: action.payload
               }
          case CLEAR_ERRORS:
               return {
                    ...state,
                    error: null
               }
          default:
               return state;
     }
}

export const forgotPassowrdReducer = (state = { user: {} }, action) => {
     switch (action.type) {
          case FORGOT_PASSWORD_REQUEST:
          case RESET_PASSWORD_REQUEST:
               return {
                    ...state,
                    loading: true
               }
          case FORGOT_PASSWORD_SUCCESS:
               return {
                    loading: false,
                    message: action.payload
               }
          case RESET_PASSWORD_SUCCESS:
               return {
                    loading: false,
                    success: action.payload
               }
          case FORGOT_PASSWORD_FAIL:
          case RESET_PASSWORD_FAIL:
               return {
                    loading: false,
                    error: action.payload
               }
          case CLEAR_ERRORS:
               return {
                    ...state,
                    error: null
               }
          default:
               return state
     }
}