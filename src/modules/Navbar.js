import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <ul className="nav nav-pills mb-3">
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/settings">
                        Settings
                    </NavLink>
                </li>
            </ul>
        )
    }
}

export default Navbar
