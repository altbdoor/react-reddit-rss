import React, { Component } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import './polyfill/closest'

import Navbar from './modules/Navbar'
import PostContainer from './modules/PostContainer'
import SettingsContainer from './modules/SettingsContainer'

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div className="container py-3">
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-7 col-xl-6">
                            <Navbar />

                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={PostContainer}
                                />
                                <Route
                                    exact
                                    path="/settings"
                                    component={SettingsContainer}
                                />
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default App
