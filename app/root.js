/**
 * @Author: Hully
 * @Date:   2017-08-28 13:36:55
 * @Email:  hull@docy.co
 * @Last modified by:   hully
 * @Last modified time: 2017-08-29 14:32:26
 */

"use strict";
import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musicList';
import MUSIC_LIST from './config/musiclist';
// import { BrowsRouter as Router, Route, Link} from 'react-router-dom';
import {Router, Route, IndexRoute, Link, browserHistory, hashHistory} from 'react-router';
import PB from 'pubsub-js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0],
      repeatType: 'cycle'
    }
  }

  playMusic(musicItem) {
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.path
    }).jPlayer('play');

    this.setState({
      currentMusicItem: musicItem
    });
  }

  playNext(type = "next") {
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length;
    if(type == 'next') {
      newIndex = (index + 1) % musicListLength;
    } else {
      newIndex = (index - 1 + musicListLength) % musicListLength;
    }
    this.playMusic(this.state.musicList[newIndex]);
  }

  findMusicIndex(musicItem) {
    return this.state.musicList.indexOf(musicItem);
  }

  randomRange(low, high) {
      return Math.ceil(Math.random() * (high - low) + low);
  }

  playWhenEnd() {
    if(this.state.repeatType === 'random') {
      let index = this.findMusicIndex(this.state.currentMusicItem);
      let randomIndex = this.randomRange(0, this.state.musicList.length - 1);
      while(index === randomIndex) {
        randomIndex = this.randomRange(0, this.state.musicList.length - 1);
      }
      this.playMusic(this.state.musicList[randomIndex]);
    }else if(this.state.repeatType === 'once') {
      this.playMusic(this.state.currentMusicItem);
    }else {
      this.playNext();
    }
  }

  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window',
      useStateClassSkin: true
    });
    // 默认开始播放第一首歌曲
    this.playMusic(this.state.currentMusicItem);

    // 监听播放结束
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playWhenEnd();
    });

    PB.subscribe('REMOVE_MUSIC', (msg, musicItem) => {
        this.setState({
          musicList: this.state.musicList.filter(m => m !== musicItem)
        });
    });
    // 订阅播放事件
    PB.subscribe('PLAY_MUSIC', (msg, musicItem) => {
        this.playMusic(musicItem);
    });
    // 订阅播放上一首
    PB.subscribe('PLAY_PREV', () => {
        this.playNext('prev');
    });
    // 订阅播放下一首
    PB.subscribe('PLAY_NEXT', () => {
        this.playNext();
    });
    // 订阅播放循环模式
    let repeatList = [
      'cycle',
      'once',
      'random'
    ];
    PB.subscribe('CHANGE_REPEAT', () => {
      let index = repeatList.indexOf(this.state.repeatType);
      index = (index + 1) % repeatList.length;
      this.setState({
        repeatType: repeatList[index]
      });
    })
  }

  componentWillUnMount() {
    PB.unsubscribe('REMOVE_MUSIC');
    PB.unsubscribe('PLAY_MUSIC');
    PB.unsubscribe('PLAY_PREV');
    PB.unsubscribe('PLAY_NEXT');
    PB.unsubscribe('CHANGE_REPEAT');
    $('#player').unbind($.jPlayer.event.ended);
  }


  render() {
    return (
      <div className="container">
        <Header />
        {React.cloneElement(this.props.children, this.state)}
      </div>
    );
  }
}

class Root extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Player}></IndexRoute>
          <Route path="/list" component={MusicList}></Route>
        </Route>
      </Router>
    );
  }
}

export default Root;
