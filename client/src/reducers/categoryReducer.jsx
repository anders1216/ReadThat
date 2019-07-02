import { FETCH_CATEGORIES, NEW_CATEGORY, SELECT_CATEGORIES } from '../actions/types'

const initialState = {
    categories: [],
    selectedCategories: [],
    newCategory: {}
}

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_CATEGORIES: 
            return {
                ...state,
                categories: action.payload
            }
        case SELECT_CATEGORIES:
            return {
                ...state,
                selectedCategories: action.payload
            }
        case NEW_CATEGORY: 
            return {
                
            }
        default:
            return state
    }
}