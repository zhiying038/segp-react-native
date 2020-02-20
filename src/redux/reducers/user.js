import { combineReducers } from 'redux';

const userReducer = (state = {isLoggedIn: false, isAuthenticated: false}, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                isLoggedIn: true,
                isAuthenticated: true
            }
        case LOGIN_FAILURE:
            return {
                isLoggedIn: false,
                isAuthenticated: false,
                error: action.error
            }
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: false,
                isAuthenticated: true,
                hash: action.hash,
                user: action.user
            }
        default: {
            return state
        }
    }
}

export default combineReducers({
    user: userReducer
});