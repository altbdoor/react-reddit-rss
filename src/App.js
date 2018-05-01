import React, { Component } from 'react';
import Navbar from './modules/Navbar';
import PostList from './modules/PostList';
import PlayerFrame from './modules/PlayerFrame';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            postListData: [],
            isShowPlayerFrame: false,
            gfyId: null,
        };

        this.showPlayerFrame = this.showPlayerFrame.bind(this);
        this.hidePlayerFrame = this.hidePlayerFrame.bind(this);
    }

    componentDidMount() {
        const fetchUrl = this.getCorsUrl();
        fetch(fetchUrl)
            .then((res) => res.json())
            .then(
                (result) => {
                    const data = this.getCorsData(result);
                    let postListData = this.state.postListData;

                    data.forEach((item) => {
                        postListData.push(item);
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
            <div className="container py-3">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-6">
                        <Navbar />

                        <PostList isLoading={this.state.isLoading}
                            isError={this.state.isError}
                            data={this.state.postListData}
                            showPlayerFrame={this.showPlayerFrame} />

                        <PlayerFrame isShow={this.state.isShowPlayerFrame}
                            hidePlayerFrame={this.hidePlayerFrame}
                            gfyId={this.state.gfyId} />
                    </div>
                </div>
            </div>
        )
    }

    // =====

    showPlayerFrame(gfyId) {
        this.setState({
            isShowPlayerFrame: true,
            gfyId: gfyId,
        });
    }

    hidePlayerFrame() {
        this.setState({
            isShowPlayerFrame: false,
            gfyId: null,
        });
    }

    // =====

    getCorsUrl() {
        return 'https://cors-anywhere.herokuapp.com/https://www.reddit.com/r/RocketLeague/hot/.json'
    }

    getCorsData(ajaxData) {
        return ajaxData.data.children;
    }
}

export default App;
