import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories = (categories, category) => {
    if (!category.parentId) {
        categories.push(category);
        return categories;
    }
    let cats = [];
    for (let cat of categories) {
        if (cat._id === category.parentId) {
            cats.push({
                ...cat,
                children: cat.children ? [...cat.children, category] : [category]
            });
        } else {
            cats.push({
                ...cat,
                children: cat.children ? buildNewCategories(cat.children, category) : []
            });
        }
    }
    return cats;
}

const categoryReducer = (state = initState, action) => {

    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: buildNewCategories(state.categories, action.payload.category)
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState,
                error: action.payload.error
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstants.UPDATE_CATEGORY_FAILURE:
            state = {
                ...initState,
                error: action.payload.error
            }
            break;
        case categoryConstants.DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstants.DELETE_CATEGORY_FAILURE:
            state = {
                ...initState,
                error: action.payload.error
            }
            break;
        default: break;
    }
    return state;
};

export default categoryReducer