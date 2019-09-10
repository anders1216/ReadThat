import { FETCH_POSTS, NEW_POST, SELECT_POSTS, CLEAR_POST_SELECTION, FILTER_POSTS } from '../actions/types'

const initialState = {
    posts: [],
    newPost: {},
    selectedPosts: [],
    howToFilterBool: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_POSTS: 
            return {
                ...state,
                posts: action.payload
            }
        case CLEAR_POST_SELECTION:
            return {
                ...state,
                selectedPosts: []
            }
        case SELECT_POSTS:
            return {
                ...state,
                selectedPosts: [...state.selectedPosts, action.payload].flat()
            }
        case NEW_POST:
            return {
                ...state,
                newPost: action.payload
            }
        case FILTER_POSTS:
            return {
                ...state,
                selectedPosts: action.payload,
                howToFilterBool: !state.howToFilterBool
            }
        default:
            return state
    }
}