/**
 * @Author: Hully
 * @Date:   2017-08-28 18:21:48
 * @Email:  hull@docy.co
 * @Last modified by:   hully
 * @Last modified time: 2017-08-29 11:48:30
 */
"use strict";
import React from 'react';
import './musicListItem.less';
import PB from 'pubsub-js';

class MusicListItem extends React.Component {

  playMusic(musicItem) {
    PB.publish('PLAY_MUSIC', musicItem);
  }

  removeMusic(musicItem, e) {
    e.stopPropagation();
    PB.publish('REMOVE_MUSIC', musicItem);
  }

  render() {
    let musicItem = this.props.musicItem;
    return (
      <li onClick = {this.playMusic.bind(this, musicItem)}
        className= {`components-musiclistitem row ${this.props.focus ? "focus": ""}`}>
          <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
          <p onClick={this.removeMusic.bind(this, musicItem)} className = "-col-auto delete"></p>
      </li>
    )
  }
}

export default MusicListItem;
