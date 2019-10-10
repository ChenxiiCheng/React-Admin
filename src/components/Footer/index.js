import React, { Component } from 'react';
import './index.less';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        版权所有：Chenxii & <a href="https://github.com/ChenxiiCheng">GitHub</a>{' '}
        &{' '}
        <a href="https://www.linkedin.com/in/chenxi-cheng-42a564159/">
          LinkedIn
        </a>
      </div>
    );
  }
}

export default Footer;
