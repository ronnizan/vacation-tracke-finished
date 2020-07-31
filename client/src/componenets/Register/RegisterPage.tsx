import React, { Component, ChangeEvent, FormEvent } from 'react'
import './Register.css'
import { connect } from 'react-redux';
import { AppState } from '../../redux/store/store';
import { Auth } from '../../redux/types/auth/auth-type';
import { Redirect } from 'react-router-dom';
import { Alert } from '../../redux/types/alert/alert-type';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/types/auth/auth-actions-types';
import { bindActionCreators } from 'redux';
import { popUpAlert } from '../../redux/actions/alert-actions';
import { registerUser } from '../../redux/actions/auth-actions';


type Props = LinkStateProps & LinkDispatchProps;
interface RegisterPageState {
    username: string;
    password: string;
    password2: string;
    firstName: string;
    lastName: string;
}
class RegisterPage extends Component<Props, RegisterPageState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            firstName: "",
            lastName: ""
        }
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };


    private onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { username, password, firstName, lastName, password2 } = this.state
        if (password !== password2) {
            return this.props.popUpAlert({ msg: 'passwords do not match', alertType: 'danger', timeout: 5000 });
        } else {
            this.props.registerUser({ username, password, firstName, lastName })
        }

    };

    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/vacations"></Redirect>
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Register</h5>
                                <form className="form-signin" onSubmit={(e) => this.onSubmit(e)}>
                                    <div className="form-label-group">
                                        <input type="text"
                                            id="inputFirstName"
                                            className="form-control"
                                            placeholder="First Name"
                                            value={this.state.firstName}
                                            onChange={(e) => this.onChange(e)}
                                            name='firstName'
                                            required
                                            autoComplete="off"
                                            autoFocus />
                                        <label htmlFor="inputFirstName">First Name </label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="text"
                                            id="inputLastName"
                                            className="form-control"
                                            placeholder="Last Name"
                                            value={this.state.lastName}
                                            onChange={(e) => this.onChange(e)}
                                            name='lastName'
                                            required
                                            autoComplete="off"
                                            autoFocus />
                                        <label htmlFor="inputLastName">Last Name </label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="text"
                                            id="inputUsername"
                                            className="form-control"
                                            placeholder="Username"
                                            value={this.state.username}
                                            onChange={(e) => this.onChange(e)}
                                            name='username'
                                            required
                                            autoComplete="off"
                                            autoFocus />
                                        <label htmlFor="inputUsername">Username </label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password"
                                            id="inputPassword"
                                            className="form-control"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={(e) => this.onChange(e)}
                                            name='password'
                                            minLength={6}
                                            autoComplete="off"
                                            required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password"
                                            id="inputConfirmPassword"
                                            className="form-control"
                                            placeholder="Password"
                                            value={this.state.password2}
                                            onChange={(e) => this.onChange(e)}
                                            name='password2'
                                            minLength={6}
                                            autoComplete="off"
                                            required />
                                        <label htmlFor="inputConfirmPassword">Confirm password</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
interface LinkStateProps {
    auth: Auth
}
interface LinkDispatchProps {
    popUpAlert?: (alert: Alert) => void;
    registerUser?: ({ firstName, lastName, username, password }: {
        firstName: string,
        lastName: string,
        username: string,
        password: string
    }) => void;
}
const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
    popUpAlert: bindActionCreators(popUpAlert, dispatch),
    registerUser: bindActionCreators(registerUser, dispatch)
});

const mapStateToProps = (
    state: AppState,
): LinkStateProps => ({
    auth: state.auth
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);


