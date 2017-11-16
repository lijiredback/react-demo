import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const users = [
    { username: 'Jerry', age: 21, gender: 'male', id: 1 },
    { username: 'Tomy', age: 22, gender: 'male', id: 2 },
    { username: 'Lily', age: 19, gender: 'female', id: 3 },
    { username: 'Lucy', age: 20, gender: 'female', id: 4 }
];

// class Index extends Component {
//     render() {
//         return (
//             <div>
//                 { users.map((user) => {
//                     return (
//                         <div>
//                             <div>姓名：{ user.username }</div>
//                             <div>年龄：{ user.age }</div>
//                             <div>性别：{ user.gender }</div>
//                             <hr/>
//                         </div>
//                     )
//                 })}
//             </div>
//         )
//     }
// }

class User extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <div>姓名：{ user.username }</div>
                <div>年龄：{ user.age }</div>
                <div>性别：{ user.gender }</div>
                <hr/>
            </div>
        )
    }
}

class Index extends Component {
    render() {
        return(
            <div>
                { users.map((user) => <User user={ user } key={user.id}/>) }
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
