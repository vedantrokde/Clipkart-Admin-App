import axios from '../helpers/axios'
import { pageConstants } from './constants';

export const addPage = (form) => {
    return async dispatch => {

        dispatch({ type: pageConstants.ADD_NEW_PAGE_REQUEST });
        const res = await axios.post('/page/create', form);
        
        if(res.status === 201){
            dispatch({
                type: pageConstants.ADD_NEW_PAGE_SUCCESS,
                payload: { page: res.data.page }
            });
        } else {
            dispatch({
                type: pageConstants.ADD_NEW_PAGE_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
};