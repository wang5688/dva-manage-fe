import React from 'react';
import { connect } from 'dva';
import { Layout, Icon, Tooltip, Badge, Avatar, Dropdown } from 'antd';
import Language from './components/Language';
import User from './components/User';
import styles from './style.scss';
const { Header } = Layout;

class HeaderLayout extends React.Component {

  render() {
    const { collapse, onCollapse } = this.props;
    const { user_name: uName, head_icon: avatar } = this.props.userInfo;

    return (
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
              <Avatar size="small" src={`http://localhost:3002${avatar}`}>{!avatar ? (uName && uName.substr(0, 1)) : ''}</Avatar>
              <span className={styles['user-name']}>{uName}</span>
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
  }
}

export default connect((state) => ({
  userInfo: state['LOGIN'].userInfo,
}))(HeaderLayout);
