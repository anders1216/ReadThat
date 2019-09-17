import { FETCH_VOTES, NEW_VOTE, VOTE_COUNT_POSTS, VOTE_COUNT_COMMENTS} from '../actions/types'

const initialState = {
    votes: [],
    voteCount: {
        post: {},
        comment: {}
    }
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
        case VOTE_COUNT_POSTS:
            return {
                ...state,
                voteCount: {...state.voteCount, post: action.payload}
            }
        case VOTE_COUNT_COMMENTS:
            return {
                ...state,
                voteCount: {...state.voteCount, comment: action.payload}
            }
        default:
            return state
    }
}