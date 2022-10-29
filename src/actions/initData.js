import axios from '../helpers/axios'
import { pageConstants, categoryConstants, productConstants, orderConstants } from './constants'


export const getInitData = () => {
    return async dispatch => {

        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
        dispatch({ type: pageConstants.GET_ALL_PAGES_REQUEST });
        dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
        
        const res = await axios.post('/initdata');
        
        if(res.status === 200){
            const { categories, products, pages, orders } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            });
            dispatch({
                type: pageConstants.GET_ALL_PAGES_SUCCESS,
                payload: { pages }
            });
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders }
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                payload: { error: res.data.error }
            });
            dispatch({
                type: pageConstants.GET_ALL_PAGES_FAILURE,
                payload: { error: res.data.error }
            });
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
                payload: { error: res.data.error }
            });
        }
    };
}