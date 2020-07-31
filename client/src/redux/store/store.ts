import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { alertReducer } from "../reducers/alert-reducer";
import { AppActions } from '../types/auth/auth-actions-types';
import { authReducer } from "../reducers/auth-reducer";
export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)))



export default store;
