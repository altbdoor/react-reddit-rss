import React, { Component } from 'react'
import {
    HashRouter,
    Route,
    NavLink,
} from 'react-router-dom'

import PostContainer from './modules/PostContainer'
import SettingsContainer from './modules/SettingsContainer'


class App extends Component {
    render() {
        const injectedSettingsContainer = (props) => (
            <SettingsContainer />
        )

        const injectedPostContainer = (props) => (
            <PostContainer />
        )

        return (
            <HashRouter>
                <div className="container py-3">
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-7 col-xl-6">
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

                            <Route exact path="/settings" render={injectedSettingsContainer} />
                            <Route exact path="/" render={injectedPostContainer} />
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default App
