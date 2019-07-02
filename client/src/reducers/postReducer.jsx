import { FETCH_POSTS, NEW_POST, SELECT_POSTS, CLEAR_POST_SELECTION } from '../actions/types'

const initialState = {
    posts: [],
    newPost: {},
    selectedPosts: []
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
        default:
            return state
    }
}