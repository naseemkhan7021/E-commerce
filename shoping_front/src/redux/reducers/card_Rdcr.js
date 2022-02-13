import { ADD_TO_CARD_FROM_CARD_LIST, ADD_TO_CARD_FROM_DETAIL, REMOVE_ITEM_FROM_CARD_LIST, SAVE_SHIPPING_INFO } from "../../constants/card_Ctn";

export const cardReducer = (state = { cardItems: [] }, action) => {
     switch (action.type) {
          case ADD_TO_CARD_FROM_DETAIL:
          case ADD_TO_CARD_FROM_CARD_LIST:
               const item = action.payload;
               const isItemExist = state.cardItems.find(i => i.product_id === item.product_id) // 

               if (isItemExist) {

                    if (action.type == ADD_TO_CARD_FROM_DETAIL) {

                         return {
                              ...state,
                              cardItems: state.cardItems.map(i => {
                                   if (i.product_id === isItemExist.product_id) {
                                        item.quantity += i.quantity
                                        return item
                                   } else {
                                        return i
                                   }
                              })
                         }
                    }

                    if (action.type == ADD_TO_CARD_FROM_CARD_LIST) {
                         return {
                              ...state,
                              cardItems: state.cardItems.map(i => i.product_id === isItemExist.product_id ? item : i)
                         }
                    }

               } else {
                    return {
                         ...state,
                         cardItems: [...state.cardItems, item]
                    }
               }
          case REMOVE_ITEM_FROM_CARD_LIST:
               return {
                    ...state,
                    cardItems: state.cardItems.filter(i => i.product_id !== action.payload)
               }
          case SAVE_SHIPPING_INFO:
               return {
                    ...state,
                    shippingInfo: action.payload
               }
          default:
               return state
     }
}