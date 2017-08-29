/**
 * @Author: Hully
 * @Date:   2017-08-28 16:43:04
 * @Email:  hull@docy.co
 * @Last modified by:   hully
 * @Last modified time: 2017-08-29 14:41:32
 */
"use strict";
import React from 'react';
import Progress from '../components/Progress';
import './player.less';
import {Link} from 'react-router';
import PB from 'pubsub-js';

let duration = null;
class Player extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: ''
    };
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        volume: e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      });
    });
  }

  componentWillUnMount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }

  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress);
  }

  volumeChangeHandler(progress){
    $('#player').jPlayer('volume', progress);
  }

  play() {
      if (this.state.isPlay) {
        $('#player').jPlayer('pause');
      } else {
        $('#player').jPlayer('play');
      }
      if(this.refs.isplay) {
        this.setState({
          isPlay: !this.state.isPlay
        })
      }

  }

  playPrev() {
    PB.publish('PLAY_PREV');
  }

  playNext() {
    PB.publish('PLAY_NEXT');
  }

  changeRepeat() {
    PB.publish('CHANGE_REPEAT');
  }

  formatTime(time) {
    time = Math.floor(time);
    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);
    m = m < 10 ? `0${m}`: m;
    s = s < 10 ? `0${s}` : s;
    return `${m}:${s}`;
  }

  render() {
    return (
      <div className="player-page">
          <h1 className="caption"> <Link to="/list"> 私人乐坊 &gt;</Link></h1>
          <div className="mt20 row">
            <div className="controll-wrapper">
              <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
              <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
              <div className="row mt20">
                <div className="left-time -col-auto">- {this.state.leftTime}</div>
                <div className="volume-container">
                  <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                  <div className="volume-wrapper">
                    <Progress progress={this.state.volume}
                      onProgressChange={this.volumeChangeHandler}
                      barColor='#aaa'/>
                  </div>
                </div>
              </div>
              <div style={{height: 10, lineHeight: '10px', marginTop: '10px'}}>
                <Progress progress={this.state.progress}
                  onProgressChange={this.progressChangeHandler}/>
              </div>
              <div className="mt35 row">
                <div>
                  <i className="icon prev" onClick={this.playPrev.bind(this)}></i>
                  <i ref="isplay" className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
                  <i className="icon next ml20" onClick={this.playNext.bind(this)}></i>
                </div>
                <div className="-col-auto">
                  <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat.bind(this)}></i>
                </div>
              </div>
            </div>
            <div className="-col-auto cover">
              <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
            </div>
          </div>
      </div>

    )
  }
}

export default Player;
