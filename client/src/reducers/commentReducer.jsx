import { FETCH_COMMENTS, NEW_COMMENT } from '../actions/types'

const initialState = {
    comments: [],
    newComment: {}
}

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_COMMENTS: 
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state
    }
}