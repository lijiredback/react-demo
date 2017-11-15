import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const HelloWorld = (props) => {
    const sayHi = (event) => {
        console.log('React.js 函数式组件');
    }
    return(
       <button onClick={sayHi}>点我试试</button>
    )
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
