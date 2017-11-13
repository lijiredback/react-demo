import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Header extends Component {
    render() {
        // 表达式插入
        const word = 'is good';
        const className = 'header';
        // 条件返回
        const isGoodWord = true;
        // JSX 元素变量
        const goodWord = <strong> is good </strong>
        const badWord = <span> is not good </span>
        return(
            <div>
                {/*表达式插入*/}
                <h1 className={ className }>React 小书 { word }</h1>
                {/*条件返回*/}
                <h2>React 小书
                    {
                        isGoodWord ? <strong> is good</strong> : <span> is not good </span>
                    }
                </h2>
                {/*JSX 元素变量*/}
                <p>React 小书
                    { isGoodWord ? goodWord : badWord }
                </p>
            </div>
        )
    }
}

ReactDOM.render(<Header />, document.getElementById('root'));
