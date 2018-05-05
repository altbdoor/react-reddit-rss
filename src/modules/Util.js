class Util {
    // static isObjectEqual(obj1, obj2) {
    //     let isEqual = true

    //     if (Object.keys(obj1).length === Object.keys(obj2).length) {
    //         for (var key in obj1) {
    //             if (key in obj2) {
    //                 isEqual = (obj1[key] === obj2[key])
    //             }
    //             else {
    //                 isEqual = false
    //             }

    //             if (!isEqual) {
    //                 break
    //             }
    //         }
    //     }
    //     else {
    //         isEqual = false
    //     }

    //     return isEqual
    // }

    static getStorageSettingsKey() {
        return 'v1-settings'
    }

    static getStorageValidKeys() {
        const validKeys = [
            'fnUrl',
            'fnData',
            'subredditUrl',
        ]

        return validKeys
    }

    static loadSettings() {
        let currentSettings = {
            fnUrl: [
                '(function getCorsUrl() {',
                '    return "https://cors-anywhere.herokuapp.com/{subredditUrl}"',
                '})',
            ].join('\n'),

            fnData: [
                '(function getAjaxData(ajaxData) {',
                '    return ajaxData.data.children',
                '})',
            ].join('\n'),

            subredditUrl: 'https://www.reddit.com/r/RocketLeague/hot/.json',
        }

        let userSettings = localStorage.getItem(this.getStorageSettingsKey())

        try {
            userSettings = JSON.parse(userSettings)

            if (!userSettings) {
                userSettings = {}
            }
        }
        catch(e) {
            userSettings = {}
        }

        const validKeys = this.getStorageValidKeys()
        validKeys.forEach((key) => {
            if (key in userSettings) {
                currentSettings[key] = userSettings[key]
            }
        })

        return currentSettings
    }

    static saveSettings(newSettings) {
        let copyNewSettings = {}

        const validKeys = this.getStorageValidKeys()
        validKeys.forEach((key) => {
            copyNewSettings[key] = newSettings[key]
        })

        copyNewSettings = JSON.stringify(copyNewSettings)
        localStorage.setItem(this.getStorageSettingsKey(), copyNewSettings)
    }

    // https://stackoverflow.com/a/24107550
    static closest(el, selector) {
        var matchesFn

        // find vendor prefix
        ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
            if (typeof document.body[fn] === 'function') {
                matchesFn = fn
                return true
            }
            return false
        })

        var parent

        // traverse parents
        while (el) {
            parent = el.parentElement
            if (parent && parent[matchesFn](selector)) {
                return parent
            }
            el = parent
        }

        return null
    }
}

export default Util
