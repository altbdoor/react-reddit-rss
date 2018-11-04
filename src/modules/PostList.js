import React, { Component } from 'react'
import PostItem from './PostItem'

class PostList extends Component {
    render() {
        const data = this.props.data

        const postListContent = data.map((item) => {
            const data = item.data
            const itemKey = `${data.subreddit_id}_${data.id}`

            return (
                <PostItem
                    key={itemKey}
                    data={data}
                    showPlayerFrame={this.props.showPlayerFrame}
                />
            )
        })

        return (
            <div id="post-list" className="list-group">
                {postListContent}
            </div>
        )
    }
}

export default PostList
