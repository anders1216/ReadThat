import { FETCH_VOTES, NEW_VOTE, VOTE_COUNT } from './types'
import { API } from '../containers/MainPage'

    export const fetchVotes = () => dispatch => {
        fetch(API + 'votes')
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
		e === 'up'
			? 
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
							is_down_vote: false 
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
			: 
			await fetch(API + 'votes/delete', {
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
							is_down_vote: true 
						} 
					})
			  })
					.then(res => res.json())
					.then( vote =>
						{
						vote.message ? 
						placeHolder = vote.votes
						:
						placeHolder = vote
					}
					)
				await dispatch({
					type: NEW_VOTE,
					payload: {
						votes: placeHolder,
						updateBool:true
					}
				})
	};

	export const voteCount = () => async (dispatch, getState) => {
		const votes = getState().votes.votes
		let placeholder = {}
			votes.map(vote => {
				if(placeholder[vote.post_id]){
					if(vote.is_down_vote){
						placeholder[vote.post_id] -= 1
					}else{
						placeholder[vote.post_id] += 1
					}
				}else{
					console.log(vote.id)
					if(vote.is_down_vote){
						placeholder[vote.post_id] = -1
					}else{
						placeholder[vote.post_id] = 1
					}
				}
			})
		await dispatch({
			type: VOTE_COUNT,
			payload: placeholder
		})
	}