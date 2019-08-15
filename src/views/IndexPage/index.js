import React from 'react';
import { Link } from 'dva/router';

class IndexPage extends React.Component {

  render() {

    return (
      <div>
        <p>index</p>
        <Link to="/page/account">跳转</Link>
      </div>
    );
  }
}

export default IndexPage;
