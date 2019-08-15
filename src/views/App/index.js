import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import tools from './../../utils/tools';
import styles from './style.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    if (!this.props.loginStatus && tools.getCookie('lg') === '1') {
      this.props.dispatch({ type: 'LOGIN/getUser' });
    }
  }

  render() {
    const { loading } = this.props;

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

const mapStateToProps = (state) => ({
  loading: state.loading.global,
  loginStatus: state['LOGIN'].loginStatus,
  userInfo: state['LOGIN'].userInfo,
});

export default withRouter(connect(mapStateToProps)(App));