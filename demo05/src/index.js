import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class LikeButton extends Component {
    constructor() {
        super();
        this.state = { isLiked: false };
    }

    handleOnClickLikeButton() {
        this.setState({
            isLiked: !this.state.isLiked,
        })
        this.setState(() => {
            return { count: 0 }
        })
        this.setState((prevState) => {
            return { count: prevState.count + 1 }
        })
        this.setState((prevState) => {
            return { count: prevState.count + 2 }
        })
        console.log(this.state.count);
    }

    render() {
        return(
            <button onClick={this.handleOnClickLikeButton.bind(this)}>
                { this.state.isLiked ? '取消' : '点赞'}
            </button>
        )
    }
}

ReactDOM.render(<LikeButton />, document.getElementById('root'));
