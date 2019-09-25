import { FETCH_VOTES, NEW_VOTE, VOTE_COUNT_POSTS, VOTE_COUNT_COMMENTS } from './types'
import { API } from '../containers/MainPage'

    export const fetchVotes = () => async dispatch => {
        await fetch(API + 'votes')
            .then(res => res.json())
            .then(votes => dispatch({ 
                type: FETCH_VOTES,
                payload: votes })
            );
	}
	
    export const createVote = (ID, e, comment) => async (dispatch, getState) => {
		const token = getState().user.token
		const currentUser = getState().user.currentUser
		let placeHolder;
		let vote;
		let bool = true
		if (e === 'up')
			bool = false
		if(comment){
			vote = {
				comment_id: ID,
				user_id: currentUser.user.id,
				is_down_vote: bool
			}
		}else{
			vote = {
				post_id: ID,
				user_id: currentUser.user.id,
				is_down_vote: bool
			}
		}
		await fetch(API + 'votes', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',	
					Accept: 'application/json'
				},
				body: JSON.stringify({ 
					vote
				})
			})
				.then(res => res.json())
				.then(vote => {
					vote.message ? 
					placeHolder = vote.votes
					: 
					placeHolder = vote;
				})
				
		await dispatch({
			type: NEW_VOTE,
			payload: {
				votes: placeHolder,
				updateBool:true
			}
		})
	};

	export const voteCount = (comOrPost = "post") => async (dispatch, getState) => {
		const votes = await getState().votes.votes
		let placeholder = {};
			await votes.forEach(vote => {
				if(placeholder[vote[`${comOrPost}_id`]]){
					if(vote.is_down_vote){
						placeholder[vote[`${comOrPost}_id`]] -= 1
					}else{
						placeholder[vote[`${comOrPost}_id`]] += 1
					}
				}else{
					if(vote.is_down_vote){
						placeholder[vote[`${comOrPost}_id`]] = -1
					}else if(vote[`${comOrPost}_id`] > 0){
						placeholder[vote[`${comOrPost}_id`]] = 1
					}else{
					}
				}
			})
		if(comOrPost === "post"){

			await dispatch({
				type: VOTE_COUNT_POSTS,
				payload: placeholder
			})
		}else if (comOrPost === "comment"){

			await dispatch({
				type: VOTE_COUNT_COMMENTS,
				payload: placeholder
			})
		}
	}