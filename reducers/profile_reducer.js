import {
	GET_PROFILE_START,
	GET_PROFILE_COMPLETED,
    GET_PROFILE_LOADED,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_SUCCESS
} from '../actions/types';

const default_state = {
	profile: null,
    loading: false,
    logout: false
}

export default function(state = default_state, action) {
	switch (action.type) {
		case GET_PROFILE_START:
			return { loading: true }
		case GET_PROFILE_COMPLETED:
			return {
				...state,
				profile: action.payload,
				loading: false
			}
		case GET_PROFILE_LOADED:
			return {
				...state,
				loading: false
            }
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                logout: true
            }
		default:
			return state;
	}
}