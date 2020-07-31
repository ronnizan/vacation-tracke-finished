import { Alert } from '../types/alert/alert-type';
import { AlertActionTypes, SET_ALERT, REMOVE_ALERT } from '../types/alert/alert-actions-types';
const alertReducerDefaultState: Alert[] = [];

const alertReducer = (state = alertReducerDefaultState, action: AlertActionTypes): Alert[] => {

    switch (action.type) {
        case SET_ALERT:
            return [...state, action.alert];

        case REMOVE_ALERT:
            return state.filter((alert) => alert.id !== action.id);

        default:
            return state
    }
}

export {alertReducer}