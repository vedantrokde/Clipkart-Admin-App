import authReducer from './auth';
import userReducer from './user';
import categoryReducer from './category';
import productReducer from './product';
import orderReducer from './order';
import pageReducer from './page';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    page: pageReducer
});

export default rootReducer;