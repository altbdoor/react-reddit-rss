import React, { Component } from 'react'
import he from 'he'

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
        const thumbnailUrl = data.secure_media.oembed.thumbnail_url
        const gfyId = thumbnailUrl
            .replace('https://thumbs.gfycat.com/', '')
            .replace('-size_restricted.gif', '')

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
        const decodedTitle = he.decode(data.title)

        return (
            <div
                className="list-group-item d-flex flex-row"
                onClick={(e) => this.itemClickHandler(e, gfyData)}
            >
                <div className="d-flex post-item-img" style={bgImg} />

                <div className="d-flex flex-column">
                    <div
                        className="post-item-title d-flex small font-weight-bold mb-1"
                        title={data.title}
                    >
                        {decodedTitle}
                    </div>
                    <div className="d-flex mt-auto not-player">
                        <a
                            target="_blank"
                            className="badge badge-reddit mr-1"
                            href={redditLink}
                        >
                            Reddit
                        </a>
                        <a
                            target="_blank"
                            className="badge badge-gfycat"
                            href={gfycatLink}
                        >
                            Gfycat
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    // =====

    itemClickHandler(e, gfyData) {
        const notPlayer = e.target.closest('.not-player')
        if (!notPlayer) {
            e.preventDefault()
            this.props.showPlayerFrame(gfyData)
        }
    }
}

export { PostItemBasic, PostItem }
