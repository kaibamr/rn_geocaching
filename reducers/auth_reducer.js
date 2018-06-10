import {
	FIREBASE_LOGIN_SUCCESS,
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOADING_START,
	LOADING_COMPLETE,
	REGISTER_USER_FAIL,
	AUTO_LOGIN_USER_FAIL
} from '../actions/types';

const default_state = {
	loading: false,
	email: 'wojtek229@o2.pl',
	password: 'wojtek229',
	error: null,
	loggedIn: false,
	uid: null,
	autoLoginFail: false
}

export default function(state = default_state, action) {
	switch (action.type) {
		case EMAIL_CHANGED:
				return { ...state, email: action.payload, error: null };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload, error: null };
		case FIREBASE_LOGIN_SUCCESS:
			return {
				email: action.payload.email,
				password: action.payload.password,
				loggedIn: true,
				uid: action.payload.uid
			};
		case LOADING_START:
			return {
				...state,
				loading: true
			};
		case LOADING_COMPLETE:
			return {
				...state,
				loading: false
			};
		case REGISTER_USER_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false,
				email: null,
				password: null
			}
		case AUTO_LOGIN_USER_FAIL:
			return {
				autoLoginFail: true
			}
		default:
			return state;
	}
}