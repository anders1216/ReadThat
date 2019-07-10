import { FETCH_VOTES, NEW_VOTE } from '../actions/types'

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
        case NEW_VOTE:
                return {
                    ...state,
                    votes: action.payload.votes
                }
        default:
            return state
    }
}