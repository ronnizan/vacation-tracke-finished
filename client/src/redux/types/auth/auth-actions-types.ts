import { AlertActionTypes } from '../alert/alert-actions-types';
export const REGISTER_SUCCUSS = 'REGISTER_SUCCUSS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCUSS = 'LOGIN_SUCCUSS';
export const LOGOUT = 'LOGOUT';
export const REFRESH_PAGE = 'REFRESH_PAGE';
export const STOP_REFRESH_PAGE = 'STOP_REFRESH_PAGE';

export interface RegisterSuccussAction {
    type: typeof REGISTER_SUCCUSS;
    payload: string;
}
export interface UserLoadedAction {
    type: typeof USER_LOADED;
    payload: object;

}


export interface RegisterFailAction {
    type: typeof REGISTER_FAIL;
}

export interface AuthErrorAction {
    type: typeof AUTH_ERROR;
}
export interface LoginSuccussAction {
    type: typeof LOGIN_SUCCUSS;
    payload: string
}
export interface LoginFailAction {
    type: typeof LOGIN_FAIL;
}
export interface LogoutAction {
    type: typeof LOGOUT;
}
export interface RefreshAction {
    type: typeof REFRESH_PAGE;
}
export interface StopRefreshAction {
    type: typeof STOP_REFRESH_PAGE;
}

export type AuthActionTypes = RegisterSuccussAction | RegisterFailAction | UserLoadedAction | AuthErrorAction | LoginSuccussAction | LoginFailAction | LogoutAction | RefreshAction | StopRefreshAction



export type AppActions = AuthActionTypes | AlertActionTypes