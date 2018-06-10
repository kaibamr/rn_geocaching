import firebase from 'firebase';
import {
	GET_NEWS_START,
	GET_NEWS_COMPLETED,
	GET_NEWS_LOADED
} from './types';

export const getNews = () => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		dispatch({
			type: GET_NEWS_START
		});
		firebase.database().ref('/news').on('value', snapshot => {
			dispatch({
				type: GET_NEWS_COMPLETED,
				payload: snapshot.val(),
			});
		});
		dispatch({
			type: GET_NEWS_LOADED
		});
	}
}