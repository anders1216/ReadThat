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
   
    const { voteCount } = getState().votes
    const { posts } = getState().posts
    let placeholder = []
    let keys = Object.keys(voteCount)
    keys.sort((a, b) => {return voteCount[a] - voteCount[b]})
    let filteredPosts = keys.map(key => {
        return {[key]: voteCount[key]}
    })
    
    await filteredPosts.forEach(post => {
       while(Object.values(post) >= 0){
        debugger
        if (posts.post) {
           placeholder.push(posts.post)
       }}
    })

    console.log("placeholder:", placeholder)

    dispatch({
        type: FILTER_POSTS,
        payload: filteredPosts
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

