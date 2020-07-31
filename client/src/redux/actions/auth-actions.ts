import { popUpAlert } from './alert-actions';
import { REGISTER_SUCCUSS, REGISTER_FAIL, USER_LOADED, LOGIN_SUCCUSS, LOGIN_FAIL, LOGOUT, AUTH_ERROR, AppActions, REFRESH_PAGE, STOP_REFRESH_PAGE } from '../types/auth/auth-actions-types';
import { Dispatch } from 'redux';
import { AppState } from '../store/store';
import axios from 'axios';
import setAuthToken from '../../utills/setAuthToken';
import { Config } from '../../config';


export const loadUser = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get(Config.serverUrl + "/api/auth/user");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {

        dispatch({
            type: AUTH_ERROR
        });
    }
};



export const registerUser = ({ firstName, lastName, username, password }: {
    firstName: string,
    lastName: string,
    username: string,
    password: string
}) => {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ firstName, lastName, username, password });
            const res = await axios.post(Config.serverUrl + "/api/auth/register", body, config);
            dispatch({
                type: REGISTER_SUCCUSS,
                payload: res.data.token
            });
            dispatch(loadUser());
            dispatch(popUpAlert({ msg: "You Have Been Successfully Registered", alertType: "success", timeout: 5000 }))
        } catch (error) {


            const errors = error.response.data.errors;
            if (errors) {
                errors.forEach((err: { msg: string; }) => dispatch(popUpAlert({ timeout: 5000, msg: err.msg, alertType: "danger" })));
            } else {
                dispatch(popUpAlert({ timeout: 5000, msg: "Register User failed.., Please try again", alertType: "danger" }));
            }
            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };
};


export const loginUser = (username: string, password: string) => {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ username, password });
            const res = await axios.post(Config.serverUrl + "/api/auth/login", body, config);
            dispatch({
                type: LOGIN_SUCCUSS,
                payload: res.data.token
            });
            dispatch(loadUser());
            dispatch(popUpAlert({ msg: "You Have Been Successfully Logged In", alertType: "success", timeout: 8000 }))

        } catch (error) {
            const errors = error.response.data.errors;
            if (errors) {
                errors.forEach((err: { msg: string; }) => dispatch(popUpAlert({ timeout: 8000, msg: err.msg, alertType: "danger" })));
            } else {
                dispatch(popUpAlert({ timeout: 8000, msg: "Login User failed.., Please try again", alertType: "danger" }));
            }
            dispatch({
                type: LOGIN_FAIL,
            });
        }
    };
};


export const logoutUser = () => {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        dispatch({
            type: LOGOUT
        });
        dispatch(popUpAlert({ timeout: 8000, msg: "You Have Been Successfully Logged Out", alertType: "danger" }));

    };
};
export const refreshPage = () => {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        dispatch({
            type: REFRESH_PAGE
        });
    };
};
export const stopRefreshPage = () => {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        dispatch({
            type: STOP_REFRESH_PAGE
        });
    };
};