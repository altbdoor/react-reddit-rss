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

        this.showPlayerFrame = this.showPlayerFrame.bind(this)
        this.hidePlayerFrame = this.hidePlayerFrame.bind(this)
    }

    componentDidMount() {
        const fetchUrl = this.getCorsUrl()
        fetch(fetchUrl)
            .then((res) => res.json())
            .then(
                (result) => {
                    const data = this.getCorsData(result)
                    let postListData = this.state.postListData

                    data.forEach((item) => {
                        postListData.push(item)
                    })

                    this.setState({
                        isLoading: false,
                        postListData: postListData,
                    })
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                        isError: true,
                    })
                },
            )
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
