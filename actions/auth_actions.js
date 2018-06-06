import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import {
	FIREBASE_LOGIN_SUCCESS,
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_START,
	LOGIN_COMPLETE
} from './types';


export const emailChanged = (value) => {
	console.log(value);
	return {
		type: EMAIL_CHANGED,
		payload: value
	};
};

export const passwordChanged = (value) => {
	return {
		type: PASSWORD_CHANGED,
		payload: value
	};
};

export const loginUser = ({ email, password }) => async dispatch => {
	const token = await AsyncStorage.getItem('firebase_token');

	if (token) {
		dispatch({ type: FIREBASE_LOGIN_SUCCESS, payload: token });
	} else {
		dispatch({ type: LOGIN_START });
		const newToken = await firebase.auth().signInWithEmailAndPassword(email, password);
		await AsyncStorage.setItem('firebase_token', newToken.user.refreshToken);
		dispatch({ type: FIREBASE_LOGIN_SUCCESS, payload: newToken.user.refreshToken });
		dispatch({ type: LOGIN_COMPLETE });
	}
};

