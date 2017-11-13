## 简介

这个仓库是根据胡子大哈的《React.js 小书》（）完成的demo练习，仅作为个人练习与记录笔记使用。

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



