import React, { Component } from 'react'

class PlayerFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollbarWidth: 0,
            backdrop: null,
        }

        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount() {
        this.setState({
            scrollbarWidth: this.getScrollbarWidth(),
            backdrop: this.prepareBackdropElem(),
        })
    }

    componentDidUpdate(prevProps, prevState) {
        let backdropElem = this.state.backdrop
        if (this.props.isShow === true) {
            backdropElem.classList.remove('d-none')
            backdropElem.paddingRight = `${this.state.scrollbarWidth}px`

            document.body.classList.add('modal-open')
            document.body.style.paddingRight = `${this.state.scrollbarWidth}px`
        } else if (this.props.isShow === false) {
            backdropElem.classList.add('d-none')
            backdropElem.paddingRight = '0px'

            document.body.classList.remove('modal-open')
            document.body.style.paddingRight = '0px'
        }
    }

    render() {
        const isShow = this.props.isShow
        const modalClass = 'modal ' + (isShow ? 'd-block' : 'd-none')

        const gfyData = this.props.gfyData
        let gfyId = null
        let videoElem = null
        let modalDimension = {}

        if (gfyData) {
            gfyId = gfyData.gfyId

            const dimension = this.getModalSize(gfyData.width, gfyData.height)
            modalDimension = {
                width: `${dimension.width}px`,
                height: `${dimension.height}px`,
            }

            videoElem = (
                <video
                    class="d-block"
                    poster={`https://thumbs.gfycat.com/${gfyId}-mobile.jpg`}
                    preload="auto"
                    controls
                    autoPlay
                    style={modalDimension}
                >
                    <source
                        src={`https://thumbs.gfycat.com/${gfyId}-mobile.mp4`}
                        type="video/mp4"
                    />
                </video>
            )
        }

        return (
            <div className={modalClass} onClick={(e) => this.closeModal(e)}>
                <div
                    className="modal-dialog modal-dialog-centered"
                    style={modalDimension}
                >
                    <div className="modal-content">
                        <div className="modal-body p-0 position-relative">
                            <button
                                className="gfycat-close position-absolute btn btn-lg btn-danger"
                                type="button"
                                onClick={(e) => this.closeModal(e, true)}
                            >
                                ×
                            </button>

                            <div className="gfycat-embed position-relative">
                                {videoElem}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // =====

    getScrollbarWidth() {
        let scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        document.body.appendChild(scrollDiv)
        let scrollbarWidth =
            scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth
        document.body.removeChild(scrollDiv)

        return scrollbarWidth
    }

    prepareBackdropElem() {
        let backdrop = document.createElement('div')
        backdrop.className = 'modal-backdrop show'
        document.body.appendChild(backdrop)
        return backdrop
    }

    closeModal(e, force = false) {
        if (force) {
            this.props.hidePlayerFrame()
        } else {
            const modalBody = e.target.closest('.modal-content')
            if (!modalBody) {
                this.props.hidePlayerFrame()
            }
        }
    }

    getModalSize(originalWidth, originalHeight) {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const modalGap = 20

        let maxWidth = Math.min(windowWidth, 800) - modalGap
        let maxHeight = maxWidth * (originalHeight / originalWidth)

        if (maxHeight > windowHeight) {
            maxHeight = Math.min(windowHeight, originalHeight) - modalGap
            maxWidth = maxHeight * (originalWidth / originalHeight)
        }

        return {
            width: maxWidth,
            height: maxHeight,
        }
    }
}

export default PlayerFrame
