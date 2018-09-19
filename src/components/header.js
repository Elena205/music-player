import React from 'react';
import "../css/Header.less";
import logo from "../images/logo.png";

class Header extends React.Component {
  render() {
    return (
        <div className="components-header row">
        <img src={logo} width="40" alt="music-player logo" className="-col-auto"/>
        <h1 className="caption">Music Player Built By React</h1>
        </div>
    );
  }
}

export default Header;
