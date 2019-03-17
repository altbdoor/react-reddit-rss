const settingsKey = 'v2-settings'

const validStorageKeys = ['fnUrl', 'fnData', 'subredditUrl']

export const defaultSettings = {
    fnUrl: [
        '(function getCorsUrl() {',
        '    return "https://yacdn.org/proxy/{subredditUrl}"',
        '})',
    ].join('\n'),

    fnData: [
        '(function getAjaxData(ajaxData) {',
        '    return ajaxData.data',
        '})',
    ].join('\n'),

    subredditUrl: 'https://www.reddit.com/r/RocketLeague/hot/.json',
}

export function loadSettings() {
    let currentSettings = { ...defaultSettings }
    let userSettings = localStorage.getItem(settingsKey)

    try {
        userSettings = JSON.parse(userSettings)

        if (!userSettings) {
            userSettings = {}
        }
    } catch (e) {
        userSettings = {}
    }

    validStorageKeys.forEach((key) => {
        if (key in userSettings) {
            currentSettings[key] = userSettings[key]
        }
    })

    return currentSettings
}

export function saveSettings(newSettings) {
    let copyNewSettings = {}

    validStorageKeys.forEach((key) => {
        copyNewSettings[key] = newSettings[key]
    })

    copyNewSettings = JSON.stringify(copyNewSettings)
    localStorage.setItem(settingsKey, copyNewSettings)
}
