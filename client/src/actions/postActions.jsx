import { FETCH_POSTS, NEW_POST, SELECT_POSTS, CLEAR_POST_SELECTION, FILTER_POSTS } from './types'
import { API } from '../containers/MainPage'

export const fetchPosts = () => async (dispatch, getState) => {
        const { selectedCategories } = getState().categories
        const token = localStorage.getItem('user-token');
        await dispatch({
            type: CLEAR_POST_SELECTION,
        })
		if (selectedCategories.length < 1) {
			fetch(`${API}posts`, {
				headers: { Authorization: `Bearer ${token}` }
			})
				.then(res => res.json())
				.then(posts => dispatch({
                    type: FETCH_POSTS,
                    payload: posts
                }));
		} else {
            selectedCategories.forEach(category => {
				fetch(`${API}categories/${category.value}`, {
					headers: { Authorization: `Bearer ${token}` }
				})
                    .then(res => res.json())
                    .then(posts => dispatch({
                        type: SELECT_POSTS,
                        payload: posts}))   
            })
 
		}
    };

export const filterPosts = () => async (dispatch, getState) => {
   
    const { countedVotes } = getState().countedVotes
    let keys = Object.keys(countedVotes)
    keys.sort((a, b) => {return countedVotes[a] - countedVotes[b]})
    let filteredPosts = keys.map(key => {
        return {[key]: countedVotes[key]}
    })

    dispatch({
        type: FILTER_POSTS,
        payload: filterPosts
    })

}

export const createPost = (post) => async (dispatch) => {
    const token = localStorage.getItem('user-token')
    await fetch(`${API}posts`, {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-type': 'Application/JSON',
        },
        body: JSON.stringify({post: post})
    })
    .then(res => res.json())
    .then(post => post.errors ? window.alert(post.errors) : dispatch({
        type: NEW_POST,
        payload: post
    }))
}

