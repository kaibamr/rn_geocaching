import {
	GET_NEWS_START,
	GET_NEWS_COMPLETED,
	GET_NEWS_LOADED
} from '../actions/types';

const default_state = {
	news: null,
	loading: false
}

export default function(state = default_state, action) {
	switch (action.type) {
		case GET_NEWS_START:
			return { loading: true }
		case GET_NEWS_COMPLETED:
			return {
				...state,
				news: action.payload,
				loading: false
			}
		case GET_NEWS_LOADED:
			return {
				...state,
				loading: false
			}
		default:
			return state;
	}
}