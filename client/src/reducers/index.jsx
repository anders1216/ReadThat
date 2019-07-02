import { combineReducers } from 'redux';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import voteReducer from './voteReducer'
import categoryReducer from './categoryReducer'

export default combineReducers({
    posts: postReducer,
    comments: commentReducer,
    votes: voteReducer,
    categories: categoryReducer
})
