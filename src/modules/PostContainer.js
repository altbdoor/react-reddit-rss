import axios from 'axios';

import React, { Component } from 'react'
import PostList from './PostList'
import PlayerFrame from './PlayerFrame'
import Util from './Util'


class PostContainer extends Component {
    source = null

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isError: false,
            postListData: [],
            isShowPlayerFrame: false,
            gfyId: null,
        }

        this.showPlayerFrame = this.showPlayerFrame.bind(this)
        this.hidePlayerFrame = this.hidePlayerFrame.bind(this)
    }

    componentDidMount() {
        this.loadPostList()
    }

    componentWillUnmount() {
        this.source.cancel('MANUALCANCEL')
        this.source = null
    }

    render() {
        return (
            <div>
                <PostList isLoading={this.state.isLoading}
                    isError={this.state.isError}
                    data={this.state.postListData}
                    showPlayerFrame={this.showPlayerFrame} />

                <PlayerFrame isShow={this.state.isShowPlayerFrame}
                    hidePlayerFrame={this.hidePlayerFrame}
                    gfyId={this.state.gfyId} />
            </div>
        )
    }

    // =====

    showPlayerFrame(gfyId) {
        this.setState({
            isShowPlayerFrame: true,
            gfyId: gfyId,
        })
    }

    hidePlayerFrame() {
        this.setState({
            isShowPlayerFrame: false,
            gfyId: null,
        })
    }

    loadPostList() {
        let self = this
        const currentSettings = Util.loadSettings()

        // eslint-disable-next-line
        let fetchUrl = eval(currentSettings.fnUrl)()
        fetchUrl = fetchUrl.replace('{subredditUrl}', currentSettings.subredditUrl)

        self.source = axios.CancelToken.source()

        axios.get(fetchUrl, {
            cancelToken: self.source.token,
        }).then(function (response) {
            // eslint-disable-next-line
            const data = eval(currentSettings.fnData)(response.data)
            let postListData = self.state.postListData

            data.filter((item) => {
                let isProviderGfycat = false

                try {
                    isProviderGfycat = (item.data.secure_media.oembed.provider_name === 'gfycat')
                }
                catch(e) {}

                return isProviderGfycat

            }).forEach((item) => {
                postListData.push(item)
            })

            if (self.source) {
                self.setState({
                    isLoading: false,
                    postListData: postListData,
                })
            }

        }).catch(function (error) {
            if (self.source && error !== 'MANUALCANCEL') {
                self.setState({
                    isLoading: false,
                    isError: true,
                })
            }
        })
    }

}

export default PostContainer
