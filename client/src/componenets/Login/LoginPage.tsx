import React, { Component, ChangeEvent, FormEvent } from 'react';
import "./LoginPage.css"
import { NavLink, Redirect } from 'react-router-dom';
import { Auth } from '../../redux/types/auth/auth-type';
import { AppState } from '../../redux/store/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser, loadUser } from '../../redux/actions/auth-actions';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../redux/types/auth/auth-actions-types';

interface LoginProps {
    history: any
}

type Props = LinkStateProps & LinkDispatchProps & LoginProps

interface LoginPageState {
    username: string
    password: string;
}


class LoginPage extends Component<Props, LoginPageState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };


    private onSubmit = (e: FormEvent) => {
        e.preventDefault();
        this.props.loginUser(this.state.username, this.state.password)
    };


    render() {
        if (!this.props.auth.loading && this.props.auth.user.isAdmin === 1) {
            return <Redirect to="/admin-vacations"></Redirect>
        }
        if (this.props.auth.isAuthenticated && !this.props.auth.loading && this.props.auth.user.isAdmin === 0) {
            return <Redirect to="/vacations"></Redirect>
        }

        return (
            <div className="container">

                <div className="row"> 
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div  className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form className="form-signin" onSubmit={(e) => this.onSubmit(e)}>
                                    <div className="form-label-group">
                                        <input type="text" id="inputUsername" className="form-control" placeholder="Username"
                                            name="username"
                                            value={this.state.username}
                                            autoComplete="off"
                                            onChange={(e) => this.onChange(e)}
                                            required autoFocus />
                                        <label htmlFor="inputUsername">Username</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                                            name="password"
                                            value={this.state.password}
                                            autoComplete="off"
                                            onChange={(e) => this.onChange(e)}
                                            required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                    <br/><br/><br/><br/>
                                    <label className="label" htmlFor="register">Don't have an account? Sign Up</label>
                                    <NavLink className="register-btn btn btn-lg btn-primary btn-block text-uppercase" to="/register"> Register</NavLink>
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

const mapStateToProps = (
    state: AppState,
): LinkStateProps => ({
    auth: state.auth
});
interface LinkDispatchProps {
    loginUser?: (username: string, password: string) => void;
    loadUser?: () => void;

}
const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
    loginUser: bindActionCreators(loginUser, dispatch),
    loadUser: bindActionCreators(loadUser, dispatch),

});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
