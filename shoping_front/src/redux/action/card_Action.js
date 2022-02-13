import { showProductDetails } from "../../api/product/product"
import { ADD_TO_CARD_FROM_CARD_LIST, ADD_TO_CARD_FROM_DETAIL, REMOVE_ITEM_FROM_CARD_LIST, SAVE_SHIPPING_INFO } from "../../constants/card_Ctn"

export const addToCardAction = (p_id, quantity, from = 'product_details') => async (dispatch, getState) => {
     const { data } = await showProductDetails(p_id)
     dispatch({
          type: from == 'product_details' ? ADD_TO_CARD_FROM_DETAIL : ADD_TO_CARD_FROM_CARD_LIST,
          payload: {
               product_id: data.product._id,
               name: data.product.name,
               price: data.product.price,
               image: data.product.images[0].url,
               stock: data.product.stock,
               quantity
          }
     });
     localStorage.setItem('cardItems', JSON.stringify(getState().card.cardItems));
};

export const removeItemFromCardList = (p_id) => (dispatch, getState) => {
     dispatch({
          type: REMOVE_ITEM_FROM_CARD_LIST,
          payload: p_id
     });
     localStorage.setItem('cardItems', JSON.stringify(getState().card.cardItems));
}

export const addShippingInfoAction = addressData => (dispatch) => {
     dispatch({
          type: SAVE_SHIPPING_INFO,
          payload: addressData
     });

     localStorage.setItem('shippingInfo', JSON.stringify(addressData))
}