# React Music Player 
A music player built by React

### overview
![](https://github.com/Elena205/music-player/blob/master/src/images/music-player.png?raw=true)
![](https://github.com/Elena205/music-player/blob/master/src/images/music-list.png?raw=true)

## 说明
一个基于react(16.5.0) + react-router-dom(4.3.1) + ES6 + create-react-app技术栈编写的音乐播放器

### 如何运行

#### 1.将项目克隆到本地，cd到react-music-player
``` bash
git clone https://github.com/Elena205/ReactMusicPlayer.git
cd ReactMusicPlayer
```
#### 2.安装依赖
``` bash
npm install
```
#### 3.执行
``` bash
npm start
```
#### 4.打开浏览器浏览 http://localhost:3000/

## create-react-app项目添加less配置
###暴露配置文件
`create-react-app`生成的项目，看不到webpack相关的配置文件，需要先暴露出来，使用如下命令即可:  

```bash
npm run eject
``` 

**安装`less-loader`和`less`**  

```bash
npm i less-loader less --save
``` 

**修改`webpack`配置**  

修改 `webpack.config.dev.js` 和 `webpack.config-prod.js` 配置文件  
  
*改动1*

+ `/\.css$/` 改为 `/\.(css|less)$/`  

*改动2*  
+ `test: /\.css$/` 改为 `/\.(css|less)$/`  

+ `test: /\.css$/` 的 `use` 数组配置增加 `less-loader`  

修改后如下  
``javascript
  {  
  loader:require.resolve('less-loader')  
  }
``
