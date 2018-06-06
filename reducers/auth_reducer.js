import {
	FIREBASE_LOGIN_SUCCESS,
	EMAIL_CHANGED,
	PASSWORD_CHANGED
} from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case EMAIL_CHANGED:
			return {

			};
		case PASSWORD_CHANGED:
			return {

			};
		case FIREBASE_LOGIN_SUCCESS:
			return {
				token: action.payload
			};
		default:
			return state;
	}
}