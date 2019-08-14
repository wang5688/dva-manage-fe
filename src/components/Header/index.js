import React from 'react';
import { Layout, Icon } from 'antd';
import styles from './style.scss';
const { Header } = Layout;

export default ({ collapse, onCollapse }) => (
  <Header theme="light" className={styles['header']}>
    <div
      className={styles['collapse']}
      onClick={onCollapse}
    >
      <Icon type={collapse ? 'menu-unfold' : 'menu-fold'} />
    </div>
  </Header>
);
