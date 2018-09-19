import React from 'react';
import ReactDOM from 'react-dom';
import '../css/progress.less'

class Progress extends React.Component {
  changeProgress(e) {
      let progressBar = ReactDOM.findDOMNode(this.refs.progressBar);
      let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
      this.props.onProgressChange && this.props.onProgressChange(progress);
  };
  render() {
    let barStyle = {
      width: `${this.props.progress}%`,
      background:this.props.barColor,
    }
    return (
        <div className="components-progress" onClick={this.changeProgress.bind(this)}
              ref="progressBar">
            <div className="progress" style={barStyle}></div>
        </div>
    );
  }
}

export default Progress;