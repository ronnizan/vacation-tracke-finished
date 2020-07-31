import { Alert } from './alert-type';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';


export interface SetAlertAction{
    type: typeof SET_ALERT;
    alert: Alert;
}
export interface RemoveAlertAction{
    type: typeof REMOVE_ALERT;
    id: string;
}

export type AlertActionTypes = SetAlertAction | RemoveAlertAction



