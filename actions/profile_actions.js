import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import {
	GET_PROFILE_START,
	GET_PROFILE_COMPLETED,
    GET_PROFILE_LOADED,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL
} from './types';

export const getProfile = () => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		dispatch({
			type: GET_PROFILE_START
		});
		firebase.database().ref(`/users/${currentUser.uid}`).on('value', snapshot => {
            dispatch({
				type: GET_PROFILE_COMPLETED,
				payload: snapshot.val(),
			});
		});
		dispatch({
			type: GET_PROFILE_LOADED
		});
	}
}

export const logoutUser = () => {
    return (dispatch) => {
        try {
            dispatch({ type: USER_LOGOUT_SUCCESS });

            firebase.auth().signOut().then(() => {
                AsyncStorage.removeItem('user_login');
                AsyncStorage.removeItem('user_password');
            })
            .catch((err) => {
                dispatch({ type: USER_LOGOUT_FAIL })
            })
        } catch (err) {
            dispatch({ type: USER_LOGOUT_FAIL })
        }
    }
}