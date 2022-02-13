import { ADMIN_ALL_PRODUCTS_REQUEST, ADMIN_ALL_PRODUCTS_SUCCESS, ADMIN_ALL_PRODUCTS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CLEAR_ERRORS, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, NEW_PRODUCT_REVIEW_REQUEST, NEW_PRODUCT_REVIEW_SUCCESS, NEW_PRODUCT_REVIEW_FAIL, NEW_PRODUCT_REVIEW_RESET, NEW_PRODUCT_CREAT_RESET, NEW_PRODUCT_CREAT_REQUEST, NEW_PRODUCT_CREAT_SUCCESS, NEW_PRODUCT_CREAT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_RESET, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_FAIL, PRODUCT_REVIEWS_REQUEST, PRODUCT_REVIEWS_SUCCESS, PRODUCT_REVIEWS_FAIL, DELETE_PRODUCT_REVIEW_REQUEST, DELETE_PRODUCT_REVIEW_SUCCESS, DELETE_PRODUCT_REVIEW_FAIL, DELETE_PRODUCT_REVIEW_RESET } from "../../constants/product_Ctn";

export const productsReducer = (state = { products: [] }, action) => {
     switch (action.type) {
          case ALL_PRODUCTS_REQUEST:
          case ADMIN_ALL_PRODUCTS_REQUEST:
               return {
                    loading: true,
                    products: []
               }
          case ALL_PRODUCTS_SUCCESS:
               return {
                    loading: false,
                    products: action.payload.products,
                    totalProductCount: action.payload.totalProductCount,
                    pageDataLen: action.payload.pageDataLen,
                    resPerPage: action.payload.resPerPage
                    // error:'this is error',
               }
          case ADMIN_ALL_PRODUCTS_SUCCESS:
               return {
                    loading: false,
                    products: action.payload.products,
                    totalProducts: action.payload.totalProducts,
                    outOfStockProducts: action.payload.outOfStockProducts
               }
          case ALL_PRODUCTS_FAIL:
          case ADMIN_ALL_PRODUCTS_FAIL:
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

// sing product details
export const productDetailsReducer = (state = { product: {} }, action) => {
     switch (action.type) {
          case PRODUCT_DETAILS_REQUEST:
               return {
                    ...state,
                    loading: true
               }
          case PRODUCT_DETAILS_SUCCESS:
               return {
                    loading: false,
                    product: action.payload.product,
               }
          case PRODUCT_DETAILS_FAIL:
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

export const updateProductReducer = (state = { product: {} }, action) => {
     switch (action.type) {
          case UPDATE_PRODUCT_REQUEST:
               return {
                    ...state,
                    loading: true,
               }
          case UPDATE_PRODUCT_SUCCESS:
               return {
                    loading: false,
                    success: action.payload.success,
                    product: action.payload.product
               }
          case UPDATE_PRODUCT_RESET:
               return {
                    ...state,
                    success: false
               }
          case UPDATE_PRODUCT_FAIL:
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

export const deleteProductReducer = (state = {}, action) => {
     switch (action.type) {
          case DELETE_PRODUCT_REQUEST:
               return {
                    ...state,
                    loading: true,
               }
          case DELETE_PRODUCT_SUCCESS:
               return {
                    loading: false,
                    success: action.payload.success
               }
          case DELETE_PRODUCT_RESET:
               return {
                    ...state,
                    success: false
               }
          case DELETE_PRODUCT_FAIL:
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

export const addUpdateRiviewReducer = (state = {}, action) => {
     switch (action.type) {
          case NEW_PRODUCT_REVIEW_REQUEST:
               return {
                    ...state,
                    loading: true
               }
          case NEW_PRODUCT_REVIEW_SUCCESS:
               return {
                    loading: false,
                    success: action.payload
               }
          case NEW_PRODUCT_REVIEW_RESET:
               return {
                    success: false
               }
          case NEW_PRODUCT_REVIEW_FAIL:
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

export const getRiviewsReducer = (state = { reviews: [] }, action) => {
     switch (action.type) {
          case PRODUCT_REVIEWS_REQUEST:
               return {
                    ...state,
                    loading: true
               }
          case PRODUCT_REVIEWS_SUCCESS:
               return {
                    loading: false,
                    reviews: action.payload.reviews,
                    totalReviews: action.payload.totalReviews,
                    productId: action.productId
               }
          case PRODUCT_REVIEWS_FAIL:
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

export const deleteRiviewReducer = (state = {}, action) => {
     switch (action.type) {
          case DELETE_PRODUCT_REVIEW_REQUEST:
               return {
                    ...state,
                    loading: true
               }
          case DELETE_PRODUCT_REVIEW_SUCCESS:
               return {
                    loading: false,
                    success: action.payload.success
               }
          case DELETE_PRODUCT_REVIEW_RESET:
               return {
                    success: false
               }
          case DELETE_PRODUCT_REVIEW_FAIL:
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

export const creatNewProductReducer = (state = { product: {} }, action) => {
     switch (action.type) {
          case NEW_PRODUCT_CREAT_REQUEST:
               return {
                    ...state,
                    loading: true,
               }
          case NEW_PRODUCT_CREAT_SUCCESS:
               return {
                    loading: false,
                    success: action.payload.success,
                    product: action.payload.product
               }
          case NEW_PRODUCT_CREAT_RESET:
               return {
                    ...state,
                    success: false
               }
          case NEW_PRODUCT_CREAT_FAIL:
               return {
                    loading: false,
                    erro: action.payload
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