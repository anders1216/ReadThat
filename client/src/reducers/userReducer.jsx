import { USER_LOGIN, USER_LOGOUT, NEW_USER, PAGE_RELOAD } from "../actions/types";


const initialState = {
    token: null,
    isLoggedIn: false,
    currentUser: null
}

export default function(state = initialState, action) {
    switch(action.type){
        case USER_LOGIN: {
            return {
                ...state, 
                currentUser: action.payload.currentUser,
                token: action.payload.token,
                isLoggedIn: true
            }
        }
        case USER_LOGOUT: {
            return {
                ...state,
                token: null,
                currentUser: null,
                isLoggedIn: false,
                isNewUser: false
            }
        }

        case NEW_USER: {
            return {
                ...state, 
                currentUser: action.payload.currentUser,
                token: action.payload.token,
                isLoggedIn: true
            }
        }

        case PAGE_RELOAD: {
            return {
                ...state, 
                currentUser: action.payload.currentUser,
                token: action.payload.token,
                isLoggedIn: true
            }
        }
        default:
            return state
    }
}

