import firebase from 'firebase';
import {
    GET_RIDDLES,
    GET_CURRENT_RIDDLE,
    SET_CURRENT_RIDDLE,
    GET_CURRENT_STEP,
    GET_COMPLETED,
    GET_RIDDLES_SUCCESS
} from './types';

export const riddlesFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref('/riddles')
            .on('value', snapshot => {
                dispatch({ type: GET_RIDDLES, payload: snapshot.val() });
            });
        firebase.database().ref(`/users/${currentUser.uid}/currentRiddle`)
            .on('value', snapshot => {
                dispatch({ type: GET_CURRENT_RIDDLE, payload: snapshot.val() });
                // dispatch({ type: GET_COMPLETED, payload: snapshot.val() });
                dispatch({ type: GET_RIDDLES_SUCCESS });       
        });
        firebase.database().ref(`/users/${currentUser.uid}/currentStep`)
            .on('value', snapshot => {
                dispatch({ type: GET_CURRENT_STEP, payload: snapshot.val() });   
        });  
        firebase.database().ref(`/users/${currentUser.uid}/completed`)
            .on('value', snapshot => {
                dispatch({ type: GET_COMPLETED, payload: snapshot.val() });      
        });
    };
};

export const setCurrentRiddle = (currentRiddle) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/currentRiddle`)
            .set(currentRiddle)
            .then(() => {
                dispatch({ type: GET_CURRENT_RIDDLE, payload: currentRiddle });
            });
            
        firebase.database().ref(`/users/${currentUser.uid}/currentStep`)
            .set(1)
            .then(() => {
                dispatch({ type: GET_CURRENT_STEP, payload: 1 });
            }); 
    };
};

export const setCurrentStep = (currentStep) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/currentStep`)
            .set(currentStep)
            .then(() => {
                dispatch({ type: GET_CURRENT_STEP, payload: currentStep });
            });       
    };
};

export const setCompleted = (riddleId) => {
    const { currentUser } = firebase.auth();
    let completed;

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/completed`)
        .once('value').then((snapshot) => {
            completed = snapshot.val();
        }).then(() => {
            firebase.database().ref(`/users/${currentUser.uid}/completed`)
            .set(completed + "," + riddleId)
            .then(() => {
                dispatch({ type: GET_COMPLETED, payload: snapshot.val() });
            }); 
        });   
    };
};