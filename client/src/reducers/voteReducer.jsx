import { FETCH_VOTES, NEW_VOTE } from '../actions/types'

const initialState = {
    votes: [],
    newVote: {}
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