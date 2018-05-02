import React, { Component } from 'react'


class SettingsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAdvanced: false,
            fnUrl: '',
            fnData: '',
            subredditUrl: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.saveSettingsToParent = this.saveSettingsToParent.bind(this)
        this.toggleAdvancedFields = this.toggleAdvancedFields.bind(this)
    }

    componentDidMount() {
        this.updatePropSettingsToState(this.props.currentSettings)
    }

    componentDidUpdate(prevProps, prevState) {
        const currentSettings = this.props.currentSettings
        const previousSettings = prevProps.currentSettings

        const isSettingsSame = this.isObjectEqual(currentSettings, previousSettings)

        if (!isSettingsSame) {
            this.updatePropSettingsToState(currentSettings)
        }
    }

    render() {
        return (
            <form onSubmit={(e) => this.saveSettingsToParent(e)}>
                <SettingsField fieldType="input" name="subredditUrl"
                    label="Subreddit RSS URL"
                    value={this.state.subredditUrl}
                    helpText="Too complex? Just change 'RocketLeague' to the subreddit of your choice."
                    onChange={this.handleInputChange} />

                <div className="text-right">
                    <a href="" className="small" onClick={(e) => this.toggleAdvancedFields(e)}>
                        Show advanced settings
                    </a>
                </div>

                <div className={this.state.showAdvanced ? '': 'd-none'}>
                    <hr/>
                    <div className="alert alert-info small">
                        <p>
                            Here you can configure the two main functions which are used call the API.
                        </p>

                        <p>
                            The first is <b>Function to obtain the RSS URL</b>, which is the function to obtain the URL. By default, the code uses <a className="alert-link" href="https://cors-anywhere.herokuapp.com/">cors-anywhere</a> by <a className="alert-link" href="https://robwu.nl/">Rob Wu</a>. If you want to, you can change it to use a CORS Proxy of your choice. Make sure the <code>{'{subredditUrl}'}</code> is a part of the returned string, as it will be replaced by the URL in <b>Subreddit RSS URL</b>.
                        </p>

                        <p>
                            The second is <b>Function to obtain the data from AJAX call</b>. Assuming the CORS Proxy does not tamper with the data structure, you should not need to change this. But if it does, you need to change the function to return the <code>children</code> key.
                        </p>

                        <p className="mb-0">
                            These two functions will be evaluated directly on the browser. <code>eval</code> is evil, but sorry, I cannot think of a better way.
                        </p>
                    </div>

                    <SettingsField fieldType="textarea" name="fnUrl"
                        label="Function to obtain the RSS URL"
                        value={this.state.fnUrl}
                        onChange={this.handleInputChange} />

                    <SettingsField fieldType="textarea" name="fnData"
                        label="Function to obtain the data from AJAX call"
                        value={this.state.fnData}
                        onChange={this.handleInputChange} />
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">
                    Save Settings
                </button>
            </form>
        )
    }

    // =====

    toggleAdvancedFields(e) {
        e.preventDefault()
        this.setState({
            showAdvanced: !this.state.showAdvanced,
        })
    }

    handleInputChange(e) {
        const target = e.target

        this.setState({
            [target.name]: target.value
        })
    }

    updatePropSettingsToState(propSettings) {
        for (var key in propSettings) {
            this.setState({
                [key]: propSettings[key]
            })
        }
    }

    saveSettingsToParent(e) {
        e.preventDefault()
        this.props.setSettings(this.state)
    }

    isObjectEqual(obj1, obj2) {
        let isEqual = true

        if (Object.keys(obj1).length === Object.keys(obj2).length) {
            for (var key in obj1) {
                if (key in obj2) {
                    isEqual = (obj1[key] === obj2[key])
                }
                else {
                    isEqual = false
                }

                if (!isEqual) {
                    break
                }
            }
        }
        else {
            isEqual = false
        }

        return isEqual
    }
}

class SettingsField extends Component {
    render() {
        let fieldComponent = null

        if (this.props.fieldType === 'textarea') {
            fieldComponent = (
                <textarea rows="3" name={this.props.name} className="form-control"
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(e)}></textarea>
            )
        }
        else {
            fieldComponent = (
                <input type="text" name={this.props.name} className="form-control"
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(e)} />
            )
        }

        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                {fieldComponent}
                <small className="form-text text-muted">{this.props.helpText}</small>
            </div>
        )
    }

}

export default SettingsContainer
