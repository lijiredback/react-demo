/**
 * Created by liji on 16/11/2017.
 */
import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

// 在 CommentApp 中，给 CommentInput 传入一个 onSubmit 属性
// 这个属性的值是 CommentApp 自己的一个方法。
// 这样， CommentInput 就可以调用 this.props.onSubmit() 把数据传给 CommentApp 了。
class CommentApp extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
        };
    }

    handleSubmitContent(comment) {
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入内容');
        this.state.comments.push(comment);
        this.setState({
            comments: this.state.comments,
        })
    }

    render() {
        return(
            <div className="wrapper">
                <CommentInput
                    onSubmit={ this.handleSubmitContent.bind(this) }/>
                <CommentList comments={ this.state.comments }/>
            </div>
        )
    }
}

export default CommentApp;