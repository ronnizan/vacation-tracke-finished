import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './PageNotFound.css'
class PageNotFound extends Component {
    render() {
        return (
            <div className="container-fluid page-not-found">
                <h1><NavLink className="nav-link" to="/vacations" > Page Not Found!, Click to go back to vacations page</NavLink> </h1>
            </div>
        );
    }
} 

export default PageNotFound;
