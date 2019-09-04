import { FETCH_VOTES, NEW_VOTE, VOTE_COUNT } from '../actions/types'

const initialState = {
    votes: [],
    voteCount: []
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
        case VOTE_COUNT:
                return {
                    ...state,
                    voteCount: action.payload
                }
        default:
            return state
    }
}