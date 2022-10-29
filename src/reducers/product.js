import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    loading: false,
    error: null
};

const productReducer = (state = initState, action) => {

    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state = {
                ...initState,
                error: action.payload.error
            }
            break;
        case productConstants.ADD_NEW_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.ADD_NEW_PRODUCT_SUCCESS:

            state.products.push(action.payload.product);
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.ADD_NEW_PRODUCT_FAILURE:
            state = {
                ...initState,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state;
};

export default productReducer