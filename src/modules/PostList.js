import React, { Component } from 'react'
import { PostItem, PostItemBasic } from './PostItem'


class PostList extends Component {
    render() {
        const isLoading = this.props.isLoading
        const isError = this.props.isError
        const data = this.props.data

        let postListContent = null

        if (isLoading) {
            postListContent = (
                <PostItemBasic textContent="Loading content..." />
            )
        }
        else {
            if (isError) {
                postListContent = (
                    <PostItemBasic textContent="Error performing ajax!" />
                )
            }
            else {
                postListContent = data.filter((item) => {
                    let isProviderGfycat = false

                    try {
                        isProviderGfycat = (item.data.secure_media.oembed.provider_name === 'gfycat')
                    }
                    catch (e) {}

                    return isProviderGfycat

                }).map((item) => {
                    const data = item.data
                    const itemKey = `${data.subreddit_id}_${data.id}`

                    return (
                        <PostItem key={itemKey} data={data}
                            showPlayerFrame={this.props.showPlayerFrame} />
                    )
                })
            }
        }

        return (
            <div id="post-list" className="list-group mt-3">
                {postListContent}
            </div>
        )
    }
}

export default PostList
