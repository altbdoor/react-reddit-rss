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
                <PostItemBasic content={(
                    <div className="py-3">
                        <div className="pb-3">Loading content...</div>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated w-100"></div>
                        </div>
                    </div>
                )} />
            )
        }
        else {
            if (isError) {
                postListContent = (
                    <PostItemBasic content="Error loading content!" />
                )
            }
            else {
                postListContent = data.map((item) => {
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
            <div id="post-list" className="list-group">
                {postListContent}
            </div>
        )
    }
}

export default PostList
