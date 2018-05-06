import React, { Component } from 'react'

import Util from './Util'


class PostItemBasic extends Component {
    render() {
        return (
            <div className="list-group-item text-center">
                {this.props.content}
            </div>
        )
    }
}

class PostItem extends Component {
    constructor(props) {
        super(props)

        this.itemClickHandler = this.itemClickHandler.bind(this)
    }

    render() {
        const data = this.props.data
        const gfyId = data.url.split('/').pop()

        const bgImg = {
            backgroundImage: `url('${data.thumbnail}')`,
        }
        const redditLink = `https://www.reddit.com${data.permalink}`
        const gfycatLink = `https://gfycat.com/${gfyId}`
        const gfyData = {
            gfyId: gfyId,
            height: data.secure_media.oembed.height,
            width: data.secure_media.oembed.width,
        }

        return (
            <div className="list-group-item d-flex flex-row" onClick={(e) => this.itemClickHandler(e, gfyData)}>
                <div className="d-flex post-item-img" style={bgImg}></div>

                <div className="d-flex flex-column">
                    <div className="post-item-title d-flex small font-weight-bold mb-1" title={data.title}>
                        {data.title}
                    </div>
                    <div className="d-flex mt-auto not-player">
                        <a target="_blank" className="badge badge-reddit mr-1" href={redditLink}>Reddit</a>
                        <a target="_blank" className="badge badge-gfycat" href={gfycatLink}>Gfycat</a>
                    </div>
                </div>
            </div>
        )
    }

    // =====

    itemClickHandler(e, gfyData) {
        const notPlayer = Util.closest(e.target, '.not-player')
        if (!notPlayer) {
            e.preventDefault()
            this.props.showPlayerFrame(gfyData)
        }
    }
}

export {
    PostItemBasic,
    PostItem,
}
