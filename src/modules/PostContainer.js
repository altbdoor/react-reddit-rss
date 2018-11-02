import React, { Component } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller'

import { loadSettings } from '../helper/settings'
import PostList from './PostList'
import PlayerFrame from './PlayerFrame'

class PostContainer extends Component {
    source = null
    postIdList = []

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isError: false,
            postListData: [],
            isShowPlayerFrame: false,
            gfyData: null,
            hasMoreItems: true,
            nextId: '',
        }

        this.showPlayerFrame = this.showPlayerFrame.bind(this)
        this.hidePlayerFrame = this.hidePlayerFrame.bind(this)
        this.loadPostList = this.loadPostList.bind(this)
    }

    componentDidMount() {
        this.loadPostList()
    }

    componentWillUnmount() {
        this.source.cancel('MANUALCANCEL')
        this.source = null
    }

    render() {
        const loader = (
            <div key="infinite-scroll-loading" className="progress mt-3">
                <div className="progress-bar progress-bar-striped progress-bar-animated w-100" />
            </div>
        )

        let error = null

        if (this.state.isError) {
            error = (
                <div className="text-center mt-3">
                    Error loading content! Please check if the URL is correct.
                </div>
            )
        }

        return (
            <div>
                <InfiniteScroll
                    loadMore={this.loadPostList}
                    hasMore={this.state.hasMoreItems}
                    threshold={200}
                    loader={loader}
                >
                    <PostList
                        data={this.state.postListData}
                        showPlayerFrame={this.showPlayerFrame}
                    />
                </InfiniteScroll>

                {error}

                <PlayerFrame
                    isShow={this.state.isShowPlayerFrame}
                    hidePlayerFrame={this.hidePlayerFrame}
                    gfyData={this.state.gfyData}
                />
            </div>
        )
    }

    // =====

    showPlayerFrame(gfyData) {
        this.setState({
            isShowPlayerFrame: true,
            gfyData: gfyData,
        })
    }

    hidePlayerFrame() {
        this.setState({
            isShowPlayerFrame: false,
            gfyData: null,
        })
    }

    loadPostList() {
        let self = this

        if (!self.state.isLoading && self.state.hasMoreItems) {
            self.state.isLoading = true

            const currentSettings = loadSettings()

            // eslint-disable-next-line
            let fetchUrl = eval(currentSettings.fnUrl)()
            const subredditUrl = currentSettings.subredditUrl
            fetchUrl = fetchUrl.replace('{subredditUrl}', subredditUrl)

            self.source = axios.CancelToken.source()
            let fetchConfig = {
                cancelToken: self.source.token,
            }

            if (this.state.nextId) {
                fetchConfig['params'] = {
                    after: this.state.nextId,
                }
            }

            axios
                .get(fetchUrl, fetchConfig)
                .then(function(response) {
                    // eslint-disable-next-line
                    const data = eval(currentSettings.fnData)(response.data)
                    let postListData = self.state.postListData.slice()

                    const filteredData = data.children.filter((item) => {
                        let isProviderGfycat = false

                        try {
                            isProviderGfycat =
                                item.data.secure_media.oembed.provider_name ===
                                'gfycat'
                        } catch (e) {}

                        const itemId = `${item.data.subreddit_id}_${
                            item.data.id
                        }`
                        const isItemIdValid = !self.postIdList.includes(itemId)

                        if (isItemIdValid) {
                            self.postIdList.push(itemId)
                        }

                        return isProviderGfycat && isItemIdValid
                    })

                    postListData = postListData.concat(filteredData)

                    if (self.source) {
                        self.setState({
                            isLoading: false,
                            postListData: postListData,
                        })

                        if (data.after !== null) {
                            self.setState({
                                hasMoreItems: true,
                                nextId: data.after,
                            })
                        } else {
                            self.setState({
                                hasMoreItems: false,
                                nextId: '',
                            })
                        }
                    }
                })
                .catch(function(error) {
                    if (self.source && error !== 'MANUALCANCEL') {
                        self.setState({
                            isLoading: false,
                            isError: true,
                            hasMoreItems: false,
                            nextId: '',
                        })
                    }
                })
        }
    }
}

export default PostContainer
