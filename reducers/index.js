import { combineReducers } from 'redux';
import auth from './auth_reducer';
import news from './news_reducer';
import riddles from './riddles_reducer';
import profile from './profile_reducer';

export default combineReducers({
	auth,
	news,
	riddles,
	profile
});
