
import React, { Component } from 'react';
import './LandingPage.css'
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store/store';
import { Auth } from '../../redux/types/auth/auth-type';

type Props = LinkStateProps;


class LandingPage extends Component<Props> {
    render() {
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin !== 1) {
            return <Redirect to="/vacations"></Redirect>
        }
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin === 1) {
            return <Redirect to="/admin-vacations"></Redirect>
        }
        return (
            <div className="container-fluid">


                <header >
                    <div className="overlay" />
                    <video playsInline={true} autoPlay={true} muted={true} loop={true}>
                        <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                    </video>
                    <div className="container h-100">
                        <div className="d-flex h-100 text-center align-items-center">
                            <div className="w-100 text-white">
                                <h1 className="display-3">Vacation Tracker</h1>
                                <div className="links-container">
                                    <button className="btn btn-lg btn-primary text-uppercase landing-buttons" type="submit"><NavLink className="landing-links" to="/login">Sign In</NavLink></button>
                                    <br /> <br />
                                    <button className="btn btn-lg btn-primary text-uppercase landing-buttons" type="submit"><NavLink className="landing-links" to="/register">Register</NavLink></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
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
export default connect(mapStateToProps)(LandingPage);




