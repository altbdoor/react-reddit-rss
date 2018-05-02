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

        this.setSettings = this.setSettings.bind(this)
    }

    componentDidMount() {
        const currentSettings = this.loadSettingsFromStorage()
        this.setState({
            settings: currentSettings,
        })
    }

    render() {
        return (
            <div className="container py-3">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-6">
                        <Navbar />
                        <SettingsContainer currentSettings={this.state.settings}
                            setSettings={this.setSettings} />
                    </div>
                </div>
            </div>
        )
    }

    // =====

    setSettings(newSettings) {
        let validatedSettings = {}

        const validKeys = this.getStorageValidKeys()
        validKeys.forEach((key) => {
            validatedSettings[key] = newSettings[key]
        })

        this.saveSettingsIntoStorage(validatedSettings)
        this.setState({
            settings: validatedSettings,
        })
    }

    getStorageSettingsKey() {
        return 'v1-settings'
    }

    getStorageValidKeys() {
        const validKeys = [
            'fnUrl',
            'fnData',
            'subredditUrl',
        ]

        return validKeys
    }

    loadSettingsFromStorage() {
        let currentSettings = {
            fnUrl: [
                'function() {',
                '    return "https://cors-anywhere.herokuapp.com/{subredditUrl}"',
                '}',
            ].join('\n'),

            fnData: [
                'function(ajaxData) {',
                '    return ajaxData.data.children',
                '}',
            ].join('\n'),

            subredditUrl: 'https://www.reddit.com/r/RocketLeague/hot/.json',
        }

        let userSettings = localStorage.getItem(this.getStorageSettingsKey())

        try {
            userSettings = JSON.parse(userSettings)
        }
        catch(e) {
            userSettings = {}
        }

        const validKeys = this.getStorageValidKeys()
        validKeys.forEach((key) => {
            currentSettings[key] = userSettings[key]
        })

        return currentSettings
    }

    saveSettingsIntoStorage(newSettings) {
        let copyNewSettings = {}

        const validKeys = this.getStorageValidKeys()
        validKeys.forEach((key) => {
            copyNewSettings[key] = newSettings[key]
        })

        copyNewSettings = JSON.stringify(copyNewSettings)
        localStorage.setItem(this.getStorageSettingsKey(), copyNewSettings)
    }
}

export default App;
