import axios from 'axios';

import React, { Component } from 'react'
import PostList from './PostList'
import PlayerFrame from './PlayerFrame'


class PostContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isError: false,
            postListData: [],
            isShowPlayerFrame: false,
            gfyId: null,
        }

        this.source = null

        this.showPlayerFrame = this.showPlayerFrame.bind(this)
        this.hidePlayerFrame = this.hidePlayerFrame.bind(this)
    }

    componentDidMount() {
        let self = this
        const fetchUrl = self.getCorsUrl()

        self.source = axios.CancelToken.source()

        axios.get(fetchUrl, {
            cancelToken: self.source.token,
        }).then(function (response) {
            const data = self.getCorsData(response.data)
            let postListData = self.state.postListData

            data.forEach((item) => {
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

    // =====

    getCorsUrl() {
        return 'https://cors-anywhere.herokuapp.com/https://www.reddit.com/r/RocketLeague/hot/.json'
    }

    getCorsData(ajaxData) {
        return ajaxData.data.children
    }
}

export default PostContainer
