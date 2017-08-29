## react-music-player-by-hand
第一个 React 单页，采用 react+es6+webpack 搭建的一款网页音乐播放器

### 如何启动
* git clone https://github.com/huleile/react-music-player-by-hand.git
* cd react-music-player-by-hand
* npm install 
* npm start

### Warning Note
* ES6 + React 的方式 与 ES5的方式

ES6的写法
```js
    class Root extends React.Component {
        constructor(props) {
            super(props);
            this.state = {}
        }
        render() {
            return (
                <div></div>
            )
        }
    }
    Root.defaultProps = {};
```
ES5的写法
```js
    let Root = React.createClass({
        getInitialState: function() {
            return {}
        },
        getDefaultProps: function() {
            return {}
        }
        render: function() {
            return (
                <div></div>
            )
        }
    })
```
其中设置初始state, 设置默认props, 以及函数间的标点的省略

* webpack-hot-loader 配置

###TODO
* react-router 2.0 升级到4.0或 react-router-dom
* redux 的使用


###Thanks
感谢慕课网 musiq 老师的悉心讲解！
Course URL: http://www.imooc.com/u/1312558/courses?sort=publish