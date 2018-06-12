import firebase from 'firebase';
import {
	GET_PROFILE_START,
	GET_PROFILE_COMPLETED,
	GET_PROFILE_LOADED
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