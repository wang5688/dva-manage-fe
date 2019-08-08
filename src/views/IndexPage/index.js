import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { withRouter } from 'dva/router';
import tools from './../../utils/tools';
import styles from './style.scss';

class IndexPage extends React.Component {

  componentWillMount() {
    if (!this.props.loginStatus && tools.getCookie('lg') === '1') {
      this.props.dispatch({ type: 'LOGIN/getUser' });
    }
  }

  render() {
    const { loading } = this.props;
    console.log(loading)

    return (
      <div className={`container ${styles.container}`}>
        <div className={styles['mask']} style={{ display: loading ? 'flex' : 'none' }}>
          <Spin spinning={loading} tip="请稍后..." size="large" style={{ transform: 'translateY(-120%)'}} />
        </div>
        
        <div className="wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(connect((state) => ({
  loginStatus: state['LOGIN'].loginStatus,
  userInfo: state['LOGIN'].userInfo,
  loading: state['GLOBAL'].loading,
}))(IndexPage));