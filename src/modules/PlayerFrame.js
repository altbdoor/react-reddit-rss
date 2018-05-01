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
            backdropElem.paddingRight = this.state.scrollbarWidth + 'px'

            document.body.classList.add('modal-open')
            document.body.style.paddingRight = this.state.scrollbarWidth + 'px'
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
        const gfyId = this.props.gfyId

        const modalClass = 'modal ' + (isShow ? 'd-block' : 'd-none')
        let iframeSrc = null

        if (gfyId) {
            iframeSrc = 'https://gfycat.com/ifr/' + gfyId
        }
        else {
            iframeSrc = 'about:blank'
        }

        return (
            <div className={modalClass} onClick={(e) => this.closeModal(e)}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body p-0 position-relative">
                            <button className="gfycat-close position-absolute btn btn-sm btn-danger" type="button"
                                onClick={(e) => this.closeModal(e, true)}>×</button>

                            <div className="gfycat-embed position-relative">
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
            var modalBody = this.closest(e.target, '.modal-content')
            if (!modalBody) {
                this.props.hidePlayerFrame()
            }
        }
    }

    // https://stackoverflow.com/a/24107550
    closest(el, selector) {
        var matchesFn

        // find vendor prefix
        ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
            if (typeof document.body[fn] === 'function') {
                matchesFn = fn
                return true
            }
            return false
        })

        var parent

        // traverse parents
        while (el) {
            parent = el.parentElement
            if (parent && parent[matchesFn](selector)) {
                return parent
            }
            el = parent
        }

        return null
    }
}

export default PlayerFrame
