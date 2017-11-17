/**
 * Created by liji on 16/11/2017.
 */
import React, { Component } from 'react';

class CommentInput extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            content: '',
        };
    }

    // Input 的 value 变化时触发
    handleUsernameChange(event) {
        this.setState({
            username: event.target.value,
        })
    }

    // Textarea 的 value 变化时触发
    handleContentChange(event) {
        this.setState({
            content: event.target.value,
        })
    }

    // 点击发布按钮时触发
    handleSubmit() {
        // handleSubmit 方法会判断 props 中，是否传入了 onSubmit 属性。
        // 有的话就调用该函数，并且把用户输入的 用户名 和 内容 传入该函数，然后再通过 setState 清空评论内容
        if (this.props.onSubmit) {
            const { username, content } = this.state;
            this.props.onSubmit({ username, content });
        }
        this.setState({
            content: '',
        })
    }

    // input 和 textarea 控件，允许用户输入，在 React.js 中被称为受控组件
    // 当用户在 CommentInput 中输入完内容后，点击发布，内容需要显示在 CommentList 中
    // 而 CommentInput 和 CommentList 是相互独立的两个组件，所以要找到他们的桥梁，也就是父组件 CommentApp
    // 当用户点击发布按钮的时候，我们将 CommentInput 的 state 当中的评论数据传递给父组件，然后父组件在传给 CommentList 进行渲染
    render() {
        return(
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input
                            type="text"
                            value={ this.state.username }
                            onChange={ this.handleUsernameChange.bind(this) }
                        />
                    </div>
                </div>

                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea
                            value={ this.state.content }
                            onChange={ this.handleContentChange.bind(this) }
                        >
                        </textarea>
                    </div>
                </div>

                <div className="comment-field-button">
                    <button onClick={ this.handleSubmit.bind(this) }>发布</button>
                </div>
            </div>
        )
    }
}

export default CommentInput;