## 简介

这个仓库是根据胡子大哈的《React.js 小书》完成的demo练习，仅作为个人练习与记录笔记使用。

如果想学习，可以访问 http://huziketang.com/books/react/ 。

## demo01（使用 JSX 描述 UI 信息）

写 React.js 组件必须引入```React```和```Component```。

```ReactDOM``` 只有一个作用：把 React 组件渲染到页面上。

#### JSX 原理

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

+ 总结

1. JSX 是 JavaScript 语言的一个语法扩展，长得像 HTML，但并不是 HTML。
2. React.js 可以用 JSX 来描述你的组件长什么样。
3. JSX 在编译的时候，会把 HTML 变成相应的 JavaScript 对象。
4. ```react-dom```负责把这个 JavaScript 对象变成 DOM，渲染在页面上。

## demo02(组件的 render 方法)

在编写 React.js 组件的时候，一般都需要继承 React.js 的```Component```。

一个组件类，必须要实现一个 ```render``` 方法。这个```render```方法必须返回一个 JSX 元素。

#### 表达式插入

表达式用 {} 包裹。

{} 中可以放变量、表达式计算、函数的执行等等。

可以放在标签内部，也可以放在标签的属性上。

#### 条件返回
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
#### JSX 元素变量

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

#### event对象

和普通浏览器一样，事件监听函数会被自动传入一个 ```event``` 对象，这个对象和普通浏览器的 ```event对象```所包含的属性和方法都基本一致。

#### 关于事件中的 this

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

#### 总结
1. 为 React.js 的组件添加事件监听是很简单的事，只需要通过 ```on*```即可。
2. React.js 会给每个事件监听传入一个 ```event``` 对象。
3. React.js 的事件监听方法，需要手动 ```bind``` 到当前实例，才能在监听函数内部使用 ```this```。
