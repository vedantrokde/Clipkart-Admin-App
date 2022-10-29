import { pageConstants } from "../actions/constants";

const initState = {
    pages: [],
    loading: false,
    error: null
};

const pageReducer = (state = initState, action) => {

    switch (action.type) {
        case pageConstants.GET_ALL_PAGES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case pageConstants.GET_ALL_PAGES_SUCCESS:
            state = {
                ...state,
                pages: action.payload.pages,
                loading: false
            }
            break;
        case pageConstants.GET_ALL_PAGES_FAILURE:
            state = {
                ...initState,
                error: action.payload.error
            }
            break;
        case pageConstants.ADD_NEW_PAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case pageConstants.ADD_NEW_PAGE_SUCCESS:
            state.pages = state.pages.filter((page) => page._id!==action.payload.page._id);
            state.pages.push(action.payload.page);
            
            state = {
                ...state,
                loading: false
            }
            break;
        case pageConstants.ADD_NEW_PAGE_FAILURE:
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

export default pageReducer