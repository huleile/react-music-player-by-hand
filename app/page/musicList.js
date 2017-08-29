/**
 * @Author: Hully
 * @Date:   2017-08-28 18:12:46
 * @Email:  hull@docy.co
 * @Last modified by:   Hully
 * @Last modified time: 2017-08-28 18:38:04
 */
"use strict";
import React from 'react';
import MusicListItem from '../components/musicListItem';

class MusicList extends React.Component {
  render() {
    let listEle = null;
    listEle = this.props.musicList.map((item) => {
      return (
        <MusicListItem key={item.id}
          focus = {item === this.props.currentMusicItem}
          musicItem={item}
          >
             {item.title}
          </MusicListItem>
      )
    })
    return (
      <ul>
        {listEle}
      </ul>
    )
  }
}

export default MusicList;
