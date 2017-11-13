import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Title extends Component {
    handleOnClickTitle() {
        console.log('Click on title.');
        console.log(this);
    }

    handleOnClickTitle2(e) {
        console.log(e.target.innerHTML);
    }

    render() {
        return (
            <div>
                <h1 onClick={this.handleOnClickTitle.bind(this)}>React 小书</h1>
                <h2 onClick={this.handleOnClickTitle2}>React 小书2</h2>
            </div>
        )
    }
}

ReactDOM.render(<Title />, document.getElementById('root'));
