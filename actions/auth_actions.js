import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import {
	FIREBASE_LOGIN_SUCCESS,
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOADING_START,
	LOADING_COMPLETE,
	REGISTER_USER_FAIL,
	AUTO_LOGIN_USER_FAIL
} from './types';


export const emailChanged = (value) => {
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

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		const properEmail = String(email).replace(/ /g,'');
		const properPassword = String(password).replace(/ /g,'');
		console.log(properEmail);
		console.log(properPassword);
		try {
			dispatch({ type: LOADING_START });
			firebase.auth().signInWithEmailAndPassword(properEmail, properPassword)
				.then((user) => {
					AsyncStorage.setItem('user_login', properEmail);
					AsyncStorage.setItem('user_password', properPassword);
					loginUserSuccess(dispatch, user, properEmail, properPassword);
				}).catch((error) => {
					loginUserFail(dispatch);
				});
			} catch(error) {
				loginUserFail(dispatch);
		}
	}
}

export const registerUser = ({ email, password })  => {
	return (dispatch) => {
		const properEmail = String(email).replace(/ /g,'');
		const properPassword = String(password).replace(/ /g,'');
		try {
			if (properPassword.length < 6) {
				registerUserFail(dispatch, 'Password must be longer than 6 characters');
				return;
			}
			dispatch({ type: LOADING_START });
			firebase.auth().createUserWithEmailAndPassword(properEmail, properPassword)
				.then((user) => {
					if(user) {
						AsyncStorage.setItem('user_login', properEmail);
						AsyncStorage.setItem('user_password', properPassword);
						registerUserSuccess(dispatch, user, properEmail, properPassword);
					}
				}).catch((error) => {
					registerUserFail(dispatch);
			})
		} catch (error) {
			registerUserFail(dispatch);
		}
	}
}

const registerUserFail = (dispatch, error) => {
	dispatch({
		type: REGISTER_USER_FAIL,
		payload: error || 'Something went wrong please try again'
	});
}

const registerUserSuccess = (dispatch, user, email, password) => {
	const { currentUser } = firebase.auth();
	firebase.database().ref(`/users/${currentUser.uid}/`)
		.set({
			achievements: '',
			createdRiddles: 0,
			friendlist: 0,
			nickname: email,
			totalPoints: 0,
			currentRiddle: -1,
			currentStep: 1,
			completed: ','
		});

	dispatch({
		type: FIREBASE_LOGIN_SUCCESS,
		payload: {
			email,
			password
		}
	});
}

const loginUserSuccess = (dispatch, user, email, password) => {
	const { currentUser } = firebase.auth();
	console.log('login user weszlo v2');
	dispatch({
		type: FIREBASE_LOGIN_SUCCESS,
		payload: {
			email,
			password
		}
	});
}

const loginUserFail = (dispatch, error) => {
	dispatch({
		type: AUTO_LOGIN_USER_FAIL,
		payload: error || 'Something went wrong please try again'
	});
}

