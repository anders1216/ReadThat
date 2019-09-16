import { FETCH_VOTES, NEW_VOTE, VOTE_COUNT } from './types'
import { API } from '../containers/MainPage'

    export const fetchVotes = () => async dispatch => {
        await fetch(API + 'votes')
            .then(res => res.json())
            .then(votes => dispatch({ 
                type: FETCH_VOTES,
                payload: votes })
            );
	}
	
    export const createVote = (postID, e) => async (dispatch, getState) => {
		const token = getState().user.token
		const currentUser = getState().user.currentUser
		let placeHolder;
		let bool = true
			if (e === 'up')
				bool = false
			await fetch(API + 'votes', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',	
						Accept: 'application/json'
					},
					body: JSON.stringify({ 
						vote: {
							post_id: postID,
							user_id: currentUser.user.id,
							is_down_vote: bool
						} 
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
		let placeholder = {
				"post": {},
				"comment": {}}
			await votes.forEach(vote => {
				if(placeholder[comOrPost][vote[`${comOrPost}_id`]]){
					if(vote.is_down_vote){
						placeholder[comOrPost][vote[`${comOrPost}_id`]] -= 1
					}else{
						placeholder[comOrPost][vote[`${comOrPost}_id`]] += 1
					}
				}else{
					if(vote.is_down_vote){
						placeholder[comOrPost][vote[`${comOrPost}_id`]] = -1
					}else{
						placeholder[comOrPost][vote[`${comOrPost}_id`]] = 1
					}
				}
			})
		await dispatch({
			type: VOTE_COUNT,
			payload: placeholder
		})
	}