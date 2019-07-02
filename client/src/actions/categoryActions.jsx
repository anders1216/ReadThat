import { FETCH_CATEGORIES, NEW_CATEGORY, SELECT_CATEGORIES } from './types'
import { API } from '../containers/MainPage'

export const fetchCategories = () => dispatch => {
    const token = localStorage.getItem('user-token')
    fetch(API + 'categories', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(res => res.json())
        .then(categories => dispatch({ 
            type: FETCH_CATEGORIES,
            payload: categories
        }));
}

export const createCategory = (category) => dispatch => {
    const token = localStorage.getItem('user-token')
    fetch(API + 'categories', {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-type': 'Application/JSON',
        },
        body: JSON.stringify(category)
    })
    .then(res => res.json())
    .then(category => dispatch({
        type: NEW_CATEGORY,
        payload: category
    }))
}

export const selectCategories = (category) => dispatch => {
    dispatch({
        type: SELECT_CATEGORIES,
        payload: category
    })
}