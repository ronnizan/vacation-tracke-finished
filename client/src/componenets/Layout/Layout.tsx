
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './Layout.css'
import Alert from '../Alert/Alert';
import store from '../../redux/store/store';
import setAuthToken from '../../utills/setAuthToken';
import { loadUser } from '../../redux/actions/auth-actions';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../Login/LoginPage';
import VacationPage from '../Vacations-page/VacationPage';
import LoggedUser from '../Private-routing/LoggedUser';
import Navbar from '../Navbar/Navbar';
import LandingPage from '../Landing-Page/LandingPage';
import Register from '../Register/RegisterPage';
import AdminRoute from '../Private-routing/AdminRoute';
import AdminVacationPage from '../Admin-vacations-page/AdminVacationPage';
import AddVacation from '../Add-vacation/AddVacation';
import adminVacationsTracker from '../Admin-vacations-tracker/adminVacationsTracker';
import PageNotFound from '../Page-not-found/PageNotFound';
if (localStorage.token) {
    setAuthToken(localStorage.token);
}
class Layout extends Component {
    componentDidMount() {
        if (localStorage.token) {

            store.dispatch(loadUser())
        }
    }
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar></Navbar>
                    <Alert />
                    <Switch>
                        <Route path="/landing-page" component={LandingPage} exact></Route>
                        <Route path="/login" component={LoginPage} exact></Route>
                        <Route path="/register" component={Register} exact></Route>
                        <LoggedUser path="/vacations" component={VacationPage} exact></LoggedUser>
                        <AdminRoute path="/add-vacation" component={AddVacation} exact></AdminRoute>
                        <AdminRoute path="/admin-vacations" component={AdminVacationPage} exact></AdminRoute>
                        <AdminRoute path="/admin-vacations-tracker" component={adminVacationsTracker} exact></AdminRoute>
                        <Redirect from="/" to="/landing-page" exact />
                        <Route component={PageNotFound} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
export default Layout;







