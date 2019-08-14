import React from 'react';
import { Layout, Icon, Tooltip, Badge, Avatar, Dropdown } from 'antd';
import Language from './components/Language';
import User from './components/User';
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
    <div className={styles['header-control']}>
      <Tooltip title="问题反馈">
        <div className={styles['pointer']}>
          <Icon type="info-circle" />
        </div>
      </Tooltip>
      <Tooltip title="通知">
        <div className={styles['pointer']}>
          <Badge count={99} overflowCount={999} offset={[5, -5]}>
            <Icon type="bell" style={{ fontSize: 18 }} />
          </Badge>
        </div>
      </Tooltip>
      <Dropdown overlay={User}>
        <div className={`${styles['user-info']} ${styles['pointer']}`}>
          <Avatar size="small">User</Avatar>
          <span className={styles['user-name']}>Mr.User</span>
        </div>
      </Dropdown>
      <Dropdown overlay={Language}>
        <div className={styles['pointer']}>
          <Icon type="global" />
        </div>
      </Dropdown>
    </div>
  </Header>
);
