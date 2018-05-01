import React, { Component } from 'react';
import Navbar from './modules/Navbar';
import PostContainer from './modules/PostContainer';
import SettingsContainer from './modules/SettingsContainer';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: {}
        }
    }

    // componentDidMount() {

    // }

    render() {
        return (
            <div className="container py-3">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-6">
                        <Navbar />
                        <SettingsContainer />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
