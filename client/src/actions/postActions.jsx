import { FETCH_POSTS, NEW_POST, SELECT_POSTS, CLEAR_POST_SELECTION } from './types'
import { API } from '../containers/MainPage'

export const fetchPosts = () => async (dispatch, getState) => {
		const { selectedCategories } = getState().categories;
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

