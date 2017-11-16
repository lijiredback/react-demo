## 简介

这个仓库是根据胡子大哈的《React.js 小书》完成的demo练习，仅作为个人练习与记录笔记使用。

如果想学习，可以访问 http://huziketang.com/books/react/ 。

## demo01（使用 JSX 描述 UI 信息）

写 React.js 组件必须引入```React```和```Component```。

```ReactDOM``` 只有一个作用：把 React 组件渲染到页面上。

### JSX 原理

DOM渲染

```
<div class="box" id="content">
    <div class="title">Hello</div>
    <button>Click</button>
</div>
```

一个DOM元素包含的信息只有三个：标签名、属性、子元素。

所以上面的信息，可以用合法的 JavaScript 对象表示：
```
{
    tag: 'div',
    attrs: { className: 'box', id: 'content'},
    children: [
        {
            tag: 'div',
            attrs: { className: 'title' },
            children: ['Hello'],
        },
        {
            tag: 'button',
            attrs: null,
            children: ['Click'],
        }
    ],
}
```
而 JSX 实际上就是把 HTML 的结构编译成上面 JavaScript 对象的形式。

所以，**所谓的 JSX 其实就是 JavaScript 对象**。

### 总结

1. JSX 是 JavaScript 语言的一个语法扩展，长得像 HTML，但并不是 HTML。
2. React.js 可以用 JSX 来描述你的组件长什么样。
3. JSX 在编译的时候，会把 HTML 变成相应的 JavaScript 对象。
4. ```react-dom```负责把这个 JavaScript 对象变成 DOM，渲染在页面上。

## demo02(组件的 render 方法)

在编写 React.js 组件的时候，一般都需要继承 React.js 的```Component```。

一个组件类，必须要实现一个 ```render``` 方法。这个```render```方法必须返回一个 JSX 元素。

### 表达式插入

表达式用 {} 包裹。

{} 中可以放变量、表达式计算、函数的执行等等。

可以放在标签内部，也可以放在标签的属性上。

### 条件返回
```
render () {
  const isGoodWord = true
  return (
    <div>
      <h1>
        React 小书
        {isGoodWord
          ? <strong> is good</strong>
          : <span> is not good</span>
        }
      </h1>
    </div>
  )
}
```
### JSX 元素变量

```
...
render () {
  const isGoodWord = true
  const goodWord = <strong> is good</strong>
  const badWord = <span> is not good</span>
  return (
    <div>
      <h1>
        React 小书
        {isGoodWord ? goodWord : badWord}
      </h1>
    </div>
  )
}
...
```

## demo03（组件的组合、嵌套和组件树）

```
class Title extends Component {
  render () {
    return (
      <h1>React 小书</h1>
    )
  }
}

class Header extends Component {
  render () {
    return (
      <div>
        <Title />
        <Title />
        <Title />
      </div>
    )
  }
}
```

React.js 会在 ```<Title />``` 所在的地方把```Title```组件的```render```方法表示的 JSX 内容渲染出来，也就是说 ```<h1>React 小书</h1>```会显示在相应的位置上。

可复用性强，可以把组件内容封装好，然后灵活地使用在任何组件内。

参照demo03 index.js 的代码，组件树。

## demo04(事件监听)

在 React.js 中监听事件是一件很容易的事，只需要给要监听的元素加上类似于```onClick```、```onKeyDown```这样的属性。

例如：
```
class Title extends Component {
  handleClickOnTitle () {
    console.log('Click on title.')
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle}>React 小书</h1>
    )
  }
}
```
在 React.js 中，不需要手动调用浏览器原生的 ```addEventListener```进行事件监听，因为 React.js 已经帮助我们封装好了一些列的 ```on*```属性。

注意，如果没有特殊处理的话，**这些```on*```的事件监听只能在普通的 HTML 标签上使用，而不能用在组件标签上**。

### event对象

和普通浏览器一样，事件监听函数会被自动传入一个 ```event``` 对象，这个对象和普通浏览器的 ```event对象```所包含的属性和方法都基本一致。

### 关于事件中的 this

一般在某个类的实例的方法中的 ```this``` 指向的都是这个实例本身。但是你在上面的 ```handleOnClickTitle``` 中把 ```this``` 打印出来，会发现 ```this``` 是 ```null``` 或 ```undefined``` 。

```
...
  handleClickOnTitle (e) {
    console.log(this) // => null or undefined
  }
...
```

这是因为 React.js 调用你所传给它的方法的时候，并不是通过对象方法的调用模式（```this.handleOnClickTitle```），而是直接通过函数调用（```handleOnclickTitle```）。

所以，事件监听函数内并不能通过```this```获取到实例。

如果想要在事件监听函数内使用当前实例，需要手动地将实例方法 ```bind```到当前实例，再传入给 React.js 。
```
class Title extends Component {
  handleClickOnTitle (e) {
    console.log(this)
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this)}>React 小书</h1>
    )
  }
}
```

### 总结
1. 为 React.js 的组件添加事件监听是很简单的事，只需要通过 ```on*```即可。
2. React.js 会给每个事件监听传入一个 ```event``` 对象。
3. React.js 的事件监听方法，需要手动 ```bind``` 到当前实例，才能在监听函数内部使用 ```this```。

## demo05(组件的 state 和 setState)

### state
一个组件可以拥有自己的状态，就像一个点赞按钮，可以有"已点赞"和"未点赞"两种状态，并且可以在这两种状态之间自由切换。

```
...
class LikeButton extends Component {
  constructor () {
    super()
    this.state = { isLiked: false }
  }

  handleClickOnLikeButton () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render () {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? '取消' : '点赞'} 👍
      </button>
    )
  }
}
...
```

```isliked```存放在```state```对象中，这个对象在构造函数里初始化。这个组件的```render```函数内，会根据组件的```state```中的```isLiked```的不同显示"取消"或"点赞"。

### setState 接收对象参数

在 ```handleOnClickLikeButton```事件监听函数中，调用了 ```setState```函数，每次点击都会更新```isLiked```属性为```!isLiked```。

```setState```方法由父类 ```Component```提供。**当我们调用这个函数的时候，React.js 会更新组件的状态```state```，并且重新调用```render```方法，然后再把```render```方法所渲染的内容显示到页面上**。

更新时，不能直接用 ```this.state = xxx``，一定要用 ```setState```方法，它接收一个**对象或者函数作为参数**。

### 注意
当调用```setState```方法时，React.js 并不会马上修改```state```。而是把这个对象放到一个更新队列里，稍后才会从队列中把新的状态提取出来，合并到```state```当中。

```
...
  handleClickOnLikeButton () {
    console.log(this.state.isLiked)
    this.setState({
      isLiked: !this.state.isLiked
    })
    console.log(this.state.isLiked)
  }
...
```

两次打印都是```false```，这并不是什么bug，只是这个排队机制搞的。

所以，如果你想在```setState```之后使用新的```state```进行运算的话，就只能使用第二种传递参数的方式，把一个函数作为参数，传递给```setState```。

## demo06(配置组件的props)

组件是相互独立的，可复用的单元，一个组件可能在不同的地方被用到。但是在不同的场景下，对这个组件的需求可能会有所不同。这就需要我们的组件具有一定的"可配置性"。

React.js 的```props```就可以帮助我们达到这个效果。每个组件都可以接收一个```props``` 参数，它是一个对象，包含了所有你对这个组件的配置。

```
class LikeButton extends Component {
  constructor () {
    super()
    this.state = { isLiked: false }
  }

  handleClickOnLikeButton () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render () {
    const likedText = this.props.likedText || '取消'
    const unlikedText = this.props.unlikedText || '点赞'
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? likedText : unlikedText} 👍
      </button>
    )
  }
}
```

在组件内部是通过```this.props```的方式获取到组件的参数的。

传入```props```的方式也很简单。就像你在用普通的 HTML 标签的属性一样，可以把参数放在表示组件的标签上，组件内部就可以通过```this.props```来访问到这些配置参数了。
```
class Index extends Component {
  render () {
    return (
      <div>
        <LikeButton likedText='已赞' unlikedText='赞' />
      </div>
    )
  }
}
```

### 默认配置 defaultProps
```
class LikeButton extends Component {
  static defaultProps = {
    likedText: '取消',
    unlikedText: '点赞'
  }

  constructor () {
    super()
    this.state = { isLiked: false }
  }

  handleClickOnLikeButton () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render () {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked
          ? this.props.likedText
          : this.props.unlikedText} 👍
      </button>
    )
  }
}
```

### props 不可变
```props```一旦传入进来就不能改变。修改上面的例子：
```
...
  handleClickOnLikeButton () {
    this.props.likedText = '取消'
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
...
```
当点击按钮时，控制台会报错。

你不能改变一个组件被渲染的时候传进来的```props```。

但这并不意味着由 ```props``` 决定的显示形态不能被修改。组件的使用者可以**主动地通过重新渲染的方式**把新的```props```传入组件当中。

```
class Index extends Component {
  constructor () {
    super()
    this.state = {
      likedText: '已赞',
      unlikedText: '赞'
    }
  }

  handleClickOnChange () {
    this.setState({
      likedText: '取消',
      unlikedText: '点赞'
    })
  }

  render () {
    return (
      <div>
        <LikeButton
          likedText={this.state.likedText}
          unlikedText={this.state.unlikedText} />
        <div>
          <button onClick={this.handleClickOnChange.bind(this)}>
            修改 wordings
          </button>
        </div>
      </div>
    )
  }
}
```

### 总结
1. 为了使得组件的可定制性更强，在使用组件的时候，可以在标签上加属性来传入配置参数。
2. 组件可以在内部通过 ```this.props```获取到配置参数。组件可以通过```props```的不同，显示不同的形态。
3. 可以通过给组件添加属性 ```defaultProps``` 来配置默认参数。
4. ```props```一旦传入，不可以在组件内部对它进行修改。但是可以通过父组件主动重新渲染的方式传入新的 ```props```，达到更新的效果。

## demo07(state vs props)

```state```的主要作用是用于组件保存、控制、修改自己的可变状态。```state```在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。

```props```的主要作用是让使用该组件的父组件可以传入可配置的参数。它是外部传来的参数，组件内部无法控制也无法修改。除非外部组件主动传入新的```props```。

**```state```是让组件控制自己的状态，```props```是让外部对组件自己进行配置**。

简单的原则：尽量少使用```state```，多使用```props```。因为状态会带来管理的复杂性。

同时，React.js 也非常鼓励无状态组件。比如一个组件经常这样写：
```
class HelloWorld extends Component {
    constructor() {
        super();
    }

    sayHi() {
        alert('Hello World');
    }

    render() {
        return(
            <div onClick={this.sayHi.bind(this)}></div>
        )
    }
}
```

React.js 提供了函数式组件的编写方式（一种不能使用```state```的组件）
```
    const HelloWorld = (props) => {
        const sayHi = (event) => {
            alert('Hello World');
        }
        return (
            <div onClick={sayHi}>Hello World</div>
        )
    }
```

函数式组件只能接收```props```而无法像类组件一样可以在```constructor```里初始化```state```

## demo08(渲染列表数据)

### 渲染存放 JSX 元素的数组
在 ```{}``` 中可以存放任意数据类型的数据，所以尝试在```{}```中插入一个数组。

```
...

class Index extends Component {
  render () {
    return (
      <div>
        {[
          <span>React.js </span>,
          <span>is </span>,
          <span>good</span>
        ]}
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
```

此时，React.js 会把数组中的每一个元素，一一罗列下来，渲染在页面上。

### 使用 map 渲染列表数据

```
const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
];

class Index extends Component {
  render () {
    return (
      <div>
        {users.map((user) => {
          return (
            <div>
              <div>姓名：{user.username}</div>
              <div>年龄：{user.age}</div>
              <div>性别：{user.gender}</div>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}
```

一般来说，在 React.js 中处理列表就是用```map```来处理、渲染的。

现在进一步把渲染一个单独用户的结构抽离出来，作为一个组件，优化代码如下：
```
const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class User extends Component {
  render () {
    const { user } = this.props
    return (
      <div>
        <div>姓名：{user.username}</div>
        <div>年龄：{user.age}</div>
        <div>性别：{user.gender}</div>
        <hr />
      </div>
    )
  }
}

class Index extends Component {
  render () {
    return (
      <div>
        {users.map((user) => <User user={user} />)}
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
```

这里把负责展示用户数据的 JSX 结构抽离成一个组件 ```user``` ，并且通过```props```把```user```数据作为组件的配置参数传了进去；这样改写```Index```就非常清晰了，看一眼就知道负责渲染```users```列表的就是```User```组件了。

### key
**对于用表达式套数组罗列到页面上的元素，要为每个元素加上```key```属性，这个```key```属性必须是每个元素的唯一的标识**。一般来说，```key```的值可以直接用后台数据返回的```id```，因为后台的```id```都是唯一的。