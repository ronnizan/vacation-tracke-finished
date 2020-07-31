
import { Auth } from '../types/auth/auth-type';
import { AuthActionTypes, REGISTER_SUCCUSS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCUSS, LOGIN_FAIL, LOGOUT, REFRESH_PAGE, STOP_REFRESH_PAGE } from '../types/auth/auth-actions-types';
import { UserModel } from '../../models/user-model';


const authReducerDefaultState: Auth = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: new UserModel(),
    refreshPage: false
};

const authReducer = (state = authReducerDefaultState, action: AuthActionTypes): Auth => {

    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case REGISTER_SUCCUSS:
        case LOGIN_SUCCUSS:
            localStorage.setItem("token", action.payload)
            return { ...state, token: action.payload, isAuthenticated: true, loading: false };

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: new UserModel()
            }

        case REFRESH_PAGE:
            return {
                ...state,
                refreshPage: true
            }
        case STOP_REFRESH_PAGE:
            return {
                ...state,
                refreshPage: false
            }

        default: return state
    }
}

export { authReducer }