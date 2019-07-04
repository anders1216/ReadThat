import { FETCH_VOTES } from '../actions/types'

const initialState = {
    votes: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_VOTES: 
            return {
                ...state,
                votes: action.payload
            }
        default:
            return state
    }
}