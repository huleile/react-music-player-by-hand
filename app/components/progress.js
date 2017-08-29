/**
 * @Author: hully
 * @Date:   2017-08-28T13:53:17+08:00
 * @Last modified by:   Hully
 * @Last modified time: 2017-08-28 17:46:23
 */
"use strict";

import React from 'react';
import './progress.less';

class Progress extends React.Component {

  changeProgress(e) {
    let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		this.props.onProgressChange && this.props.onProgressChange(progress);
  }

  render() {
    return (
      <div className="component-progress" ref="progressBar" onClick={this.changeProgress.bind(this)}>
        <div className="progress"
          style={{width: `${this.props.progress}%`, background: `${this.props.barColor}`}}
          >
      </div>
      </div>
    )
  }
}
Progress.defaultProps = {
  barColor: '#2f9842'
}

export default Progress;
