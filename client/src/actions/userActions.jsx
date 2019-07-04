import { NEW_USER, USER_LOGIN, USER_LOGOUT, PAGE_RELOAD } from '../actions/types'
import { API } from '../containers/MainPage'

    export const pageReload = () => dispatch => {
        const { token } = localStorage.getItem('user-token')
        if( token !== undefined && token !== null) {
            fetch(`${API}users/current_user`, {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => dispatch({
                type: PAGE_RELOAD,
                payload: {
                    currentUser: res, 
                    token: res.token}
                })
            )
        }
    }

    export const userLogin = ( username, password ) => async dispatch => {
		await fetch(API + 'login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ user: { username: username, password: password } })
		})
			.then(res => res.json())
			.then(res => {
				res.errors ? 
				alert(res.errors)
				:
				dispatch({
                    type: USER_LOGIN,
                    payload: { 
                        currentUser: res,
                        token: res.token
                    }
				})
			}
		)
    }

    export const userLogout = () => dispatch => {
        localStorage.clear()
        dispatch({
            type: USER_LOGOUT
        })
    }

    export const newUser = ( username, password, passwordConfirmation) => dispatch => {
		fetch(API + 'users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({
				user: {
					username: username,
					password: password,
					password_confirmation: passwordConfirmation
				}
			})
		})
			.then(res => res.json())
			.then(res => {
				res.error
					? alert(res.error)
					: dispatch({
                        type: NEW_USER,
                        payload: {
							currentUser: res,
							token: res.token
                        }
					  });
			})
    }