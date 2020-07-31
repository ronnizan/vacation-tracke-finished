import { Alert } from '../types/alert/alert-type'
import { v4 as uuid } from "uuid";
import { SET_ALERT,  REMOVE_ALERT } from '../types/alert/alert-actions-types';

import { Dispatch } from 'redux';
import { AppState } from '../store/store';
import { AppActions } from '../types/auth/auth-actions-types';


export const setAlert = (alert: Alert): AppActions => ({
  type: SET_ALERT,
  alert
});

export const removeAlert = (id: string): AppActions => ({
  type: REMOVE_ALERT,
  id
});

export const popUpAlert = (alertData: {
  msg?: string;
  alertType?: string;
  timeout?: number;
  id?: string;
  
}) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const {
      msg,
      alertType,
      timeout,
     
    } = alertData;
    const id = uuid();
    const alert = { msg, alertType, timeout, id };
    dispatch(
      setAlert({
        ...alert
      })
    );
    setTimeout(() => {
      dispatch(removeAlert(id))
    }, 5000);
  };
};