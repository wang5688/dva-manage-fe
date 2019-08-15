import React from 'react';
import { withRouter } from 'dva/router';
import { Layout } from 'antd';
import Sider from '../../components/Sider';
import Header from '../../components/Header';
import styles from './style.scss';
const { Content } = Layout;

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapse: true,
    };
  }

  onCollapse = () => {
    this.setState({
      isCollapse: !this.state.isCollapse,
    });
  }

  render() {
    const { isCollapse } = this.state;

    return (
      <Layout className={styles['layout']}>
        <Sider collapse={isCollapse}></Sider>
        <Layout>
          <Header collapse={isCollapse} onCollapse={this.onCollapse}></Header>
          <Content>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
