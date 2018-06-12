import { 
    GET_COMPLETED,
    GET_RIDDLES_SUCCESS,
    GET_RIDDLES,
    GET_CURRENT_RIDDLE,
    SET_CURRENT_RIDDLE,
    GET_CURRENT_STEP,
	  ERROR_RIDDLE
} from '../actions/types';

const INITIAL_STATE = {
    riddles: null,
    currentRiddle: null,
    currentStep: null,
    completedRiddles: null,
    loading: true,
    error: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_RIDDLES:
            return { ...state, riddles: action.payload };
        case GET_CURRENT_RIDDLE:
            return { ...state, currentRiddle: action.payload };
        case GET_CURRENT_STEP:
            return { ...state, currentStep: action.payload };
        case GET_RIDDLES_SUCCESS:
            return { ...state, loading: false };
        case GET_COMPLETED:
            return { ...state, completedRiddles: action.payload };
      case ERROR_RIDDLE:
            return { ...state, error: 'Some error occured'}
        default:
            return state;
    }     
}