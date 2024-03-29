import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import styles from './style.scss';
const { Sider } = Layout;

export default class LeftSide extends React.Component {

  render() {
    const { collapse } = this.props;

    return (
      <Sider collapsed={collapse}>
        <h1 className={styles['title']}>{ !collapse && '后台管理系统'}</h1>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Icon type="desktop" />
            <span>用户中心</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

LeftSide.propTypes = {
  collapse: PropTypes.bool,
};
