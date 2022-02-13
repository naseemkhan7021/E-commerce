import axios from 'axios';
import { API_PATH } from '../../constants/variable';


export const showProducts = async (ratings, category, priceFilter, keyWord, currentPage) => {
     let produtsUrl = `/products?page=${currentPage}&keyword=${keyWord}&price[gte]=${priceFilter[0]}&price[lte]=${priceFilter[1]}${ratings ? `&ratings[gte]=${ratings}` : ''}${category ? `&category=${category}` : ''}`

     // if (category) {
     //      produtsUrl = `/products?page=${currentPage}&${ratings ? `ratings=${ratings}` : ''}category=${category}&keyword=${keyWord}&price[gt]=${priceFilter[0]}&price[lt]=${priceFilter[1]}`
     // }
     // if (ratings) {
     //      produtsUrl = `/products?page=${currentPage}&ratings=${ratings}&keyword=${keyWord}&price[gt]=${priceFilter[0]}&price[lt]=${priceFilter[1]}`
     //      if (category) {
     //           produtsUrl = `/products?page=${currentPage}&category=${category}&ratings=${ratings}&keyword=${keyWord}&price[gt]=${priceFilter[0]}&price[lt]=${priceFilter[1]}`
     //      }
     // }
     return await axios({
          baseURL: API_PATH,
          url: produtsUrl,
          method: 'GET'
     });
};

export const showProductDetails = async (p_id) => {
     return await axios({
          baseURL: API_PATH,
          url: `/product/${p_id}`,
          method: 'GET'
     });
};