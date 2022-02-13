import { ADMIN_ALL_ORDERs_FAIL, ADMIN_ALL_ORDERs_SUCCESS, ADMIN_ALL_ORDERs_REQUEST, ALL_ORDERs_FAIL, ALL_ORDERs_REQUEST, ALL_ORDERs_SUCCESS, CLEAR_ERRORS, CREAT_ORDER_FAIL, CREAT_ORDER_REQUEST, CREAT_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ADMIN_UPDATE_ORDER_REQUEST, ADMIN_UPDATE_ORDER_SUCCESS, ADMIN_UPDATE_ORDER_FAIL, ADMIN_UPDATE_ORDER_RESET, ADMIN_DELETE_ORDER_REQUEST, ADMIN_DELETE_ORDER_SUCCESS, ADMIN_DELETE_ORDER_RESET, ADMIN_DELETE_ORDER_FAIL } from "../../constants/order_Ctn";

export const orderReducer = (state = {}, action) => {
     switch (action.type) {
          case CREAT_ORDER_REQUEST:
          case ADMIN_UPDATE_ORDER_REQUEST:
          case ADMIN_DELETE_ORDER_REQUEST:
               return {
                    ...state,
                    loading: true,
               }
          case CREAT_ORDER_SUCCESS:
               return {
                    loading: false,
                    order: action.payload
               }
          case ADMIN_UPDATE_ORDER_SUCCESS:
          case ADMIN_DELETE_ORDER_SUCCESS:
               return {
                    loading: false,
                    isUpdated: action.payload.success,
               }
          case ADMIN_UPDATE_ORDER_RESET:
          case ADMIN_DELETE_ORDER_RESET:
               return {
                    isUpdated: false
               }
          case ADMIN_UPDATE_ORDER_FAIL:
          case ADMIN_DELETE_ORDER_FAIL:
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

export const showMyOrdersReducer = (state = { orders: [] }, action) => {
     switch (action.type) {
          case ALL_ORDERs_REQUEST:
               return {
                    ...state,
                    loading: true,
               }
          case ALL_ORDERs_SUCCESS:
               return {
                    loading: false,
                    orders: action.payload
               }
          case ALL_ORDERs_FAIL:
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
}

export const showAllOrdersReducer = (state = { orders: [] }, action) => {
     switch (action.type) {
          case ADMIN_ALL_ORDERs_REQUEST:
               return {
                    ...state,
                    loading: true,
               }
          case ADMIN_ALL_ORDERs_SUCCESS:
               return {
                    loading: false,
                    orders: action.payload.orders,
                    totalOrders: action.payload.totalOrders,
                    totalAmount: action.payload.totalAmount,
               }
          case ADMIN_ALL_ORDERs_FAIL:
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
}

// export const proccessOrderReducer = (state = {}, action) => {
//      switch (action.type) {
//           case ADMIN_UPDATE_ORDER_REQUEST:
//                return {
//                     ...state,
//                     loading: true,
//                }
//           case ADMIN_UPDATE_ORDER_SUCCESS:
//                return {
//                     loading: false,
//                     isUpdated: action.payload.success,
//                }
//           case ADMIN_UPDATE_ORDER_RESET:
//                return {
//                     isUpdated: false
//                }
//           case ADMIN_UPDATE_ORDER_FAIL:
//                return {
//                     loading: false,
//                     error: action.payload
//                }
//           case CLEAR_ERRORS:
//                return {
//                     ...state,
//                     error: null
//                }
//           default:
//                return state
//      };
// }


// sing order details
export const orderDetailsReducer = (state = { order: {} }, action) => {
     switch (action.type) {
          case ORDER_DETAILS_REQUEST:
               return {
                    ...state,
                    loading: true
               }
          case ORDER_DETAILS_SUCCESS:
               return {
                    loading: false,
                    order: action.payload.order,
               }
          case ORDER_DETAILS_FAIL:
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