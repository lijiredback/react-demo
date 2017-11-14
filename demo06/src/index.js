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
    }

    render() {
        const likedText = this.props.likedText || '取消';
        const unlikedText = this.props.unlikedText || '点赞';
        // const wordings = this.props.wordings || {
        //         likedText: '已赞',
        //         unlikedText: '点赞',
        //     };
        return (
            <button onClick={ this.handleOnClickLikeButton.bind(this) }>
                { this.state.isLiked ? likedText : unlikedText }
            </button>
        )
        // return (
        //     <button onClick={ this.handleOnClickLikeButton.bind(this) }>
        //         { this.state.isLiked ? wordings.likedText : wordings.unlikedText }
        //     </button>
        // )
    }
}

class Index extends Component {
    constructor() {
        super();
        this.state = {
            likedText: '111',
            unlikedText: '222',
        }
    }

    handleClickOnChange() {
        this.setState({
            likedText: '333',
            unlikedText: '444',
        })
    }

    render() {
        return(
            <div>
                {/*<LikeButton likedText="我赞了这个信息" unlikedText="我没赞呢，赞不赞"/>*/}
                {/*<LikeButton wordings={{ likedText: '赞赞赞了', unlikedText: '没赞，点赞' }}/>*/}
                <LikeButton likedText={this.state.likedText} unlikedText={this.state.unlikedText}/>
                <div>
                    <button onClick={ this.handleClickOnChange.bind(this)}>
                        修改 wordings
                    </button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
