import React, { Component } from 'react'


class PostItemBasic extends Component {
    render() {
        return (
            <div className="list-group-item text-center">
                {this.props.textContent}
            </div>
        )
    }
}

class PostItem extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        const data = this.props.data
        const gfyId = data.url.replace(/https?:\/\/gfycat\.com\//, '')
            .replace('gifs/detail/', '')

        const bgImg = {
            backgroundImage: `url('${data.thumbnail}')`,
        }
        const redditLink = `https://www.reddit.com${data.permalink}`
        const gfycatLink = `https://gfycat.com/${gfyId}`

        return (
            <div className="list-group-item d-flex flex-row">
                <div className="d-flex post-item-img" style={bgImg}
                    onClick={() => this.props.showPlayerFrame(gfyId)}></div>

                <div className="d-flex flex-column">
                    <div className="post-item-title d-flex small font-weight-bold mb-1" title={data.title}>
                        {data.title}
                    </div>
                    <div className="d-flex mt-auto">
                        <a target="_blank" className="badge badge-reddit mr-1" href={redditLink}>Reddit</a>
                        <a target="_blank" className="badge badge-gfycat" href={gfycatLink}>Gfycat</a>
                    </div>
                </div>
            </div>
        )
    }
}

export {
    PostItemBasic,
    PostItem,
}
