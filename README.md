## 简介

这个仓库是根据胡子大哈的《React.js 小书》（）完成的demo练习，仅作为个人练习与记录笔记使用。

如果想学习，可以访问 http://huziketang.com/books/react/ 。

## demo01（使用 JSX 描述 UI 信息）

+ 写 React.js 组件必须引入```React```和```Component```。

+ ```ReactDOM``` 只有一个作用：把 React 组件渲染到页面上。

+ JSX 原理

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

## 总结

1. JSX 是 JavaScript 语言的一个语法扩展，长得像 HTML，但并不是 HTML。
2. React.js 可以用 JSX 来描述你的组件长什么样。
3. JSX 在编译的时候，会把 HTML 变成相应的 JavaScript 对象。
4. ```react-dom```负责把这个 JavaScript 对象变成 DOM，渲染在页面上。

