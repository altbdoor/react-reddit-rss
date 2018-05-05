import React, { Component } from 'react'

import Util from './Util'


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
        }
        else if (this.props.isShow === false) {
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
        let gfyId = 'Blank'
        let iframeSrc = null
        let width = 0
        let height = 0

        if (gfyData) {
            gfyId = gfyData.gfyId
            iframeSrc = `https://gfycat.com/ifr/${gfyId}`

            const dimension = this.getModalSize(gfyData.width, gfyData.height)
            width = dimension.width
            height = dimension.height
        }
        else {
            iframeSrc = 'about:blank'
        }

        const modalDimension = {
            width: `${width}px`,
            height: `${height}px`,
        }

        return (
            <div className={modalClass} onClick={(e) => this.closeModal(e)}>
                <div className="modal-dialog" style={modalDimension}>
                    <div className="modal-content">
                        <div className="modal-body p-0 position-relative">
                            <button className="gfycat-close position-absolute btn btn-lg btn-danger" type="button"
                                onClick={(e) => this.closeModal(e, true)}>×</button>

                            <div className="gfycat-embed position-relative" style={modalDimension}>
                                <iframe src={iframeSrc} className="position-absolute" frameBorder="0" scrolling="no"
                                    width="100%" height="100%" title={gfyId} allowFullScreen></iframe>
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
        let scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth
        document.body.removeChild(scrollDiv)

        return scrollbarWidth
    }

    prepareBackdropElem() {
        let backdrop = document.createElement('div')
        backdrop.className = 'modal-backdrop show'
        document.body.appendChild(backdrop)
        return backdrop
    }

    closeModal(e, force=false) {
        if (force) {
            this.props.hidePlayerFrame()
        }
        else {
            const modalBody = Util.closest(e.target, '.modal-content')
            if (!modalBody) {
                this.props.hidePlayerFrame()
            }
        }
    }

    getModalSize(originalWidth, originalHeight) {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        let maxWidth = Math.min(windowWidth, 800)
        let maxHeight = maxWidth * (originalHeight / originalWidth)

        if (maxHeight > windowHeight) {
            maxHeight = Math.min(windowHeight, originalHeight)
            maxWidth = maxHeight * (originalWidth / originalHeight)
        }

        return {
            width: (maxWidth - 20),
            height: (maxHeight - 20),
        }
    }

}

export default PlayerFrame
