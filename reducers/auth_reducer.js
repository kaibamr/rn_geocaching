import {
	FIREBASE_LOGIN_SUCCESS,
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_START,
	LOGIN_COMPLETE
} from '../actions/types';

export default function(state = { loading: false }, action) {
	switch (action.type) {
		case EMAIL_CHANGED:
				console.log(action.payload);
				return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };
		case FIREBASE_LOGIN_SUCCESS:
			return {
				token: action.payload
			};
		case LOGIN_START:
			return {
				...state, loading: true
			};
		case LOGIN_COMPLETE:
			return {
				...state, loading: false
			};
		default:
			return state;
	}
}