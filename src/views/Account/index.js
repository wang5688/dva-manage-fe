/**
 * 个人设置页
 */
import React from 'react';
import { Menu } from 'antd';
import styles from './style/index.scss';
import Info from '../../components/Account/Info';
import Security from '../../components/Account/Security';
import Notice from '../../components/Account/Notice';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ['1'],
    };
  }

  handleSelect = (value) => {
    const { keyPath } = value;
    this.setState({
      selected: keyPath,
    });
  }

  render() {
    const switchPanel = (key) => {
      let pannel = null;
      switch (key) {
        case '1':
          pannel = <Info />;
          break;
        case '2':
          pannel = <Security />;
          break;
        case '3':
          pannel = <Notice />;
          break;
        default:
          pannel = null;
      }

      return pannel;
    };

    return (
      <div className={styles['account-container']}>
        <div className={styles['left']}>
          <Menu
            selectedKeys={this.state.selected}
            onSelect={this.handleSelect}
            style={{ height: '100%' }}
          >
            <Menu.Item key="1">
              账号信息
            </Menu.Item>
            <Menu.Item key="2">
              安全设置
            </Menu.Item>
            <Menu.Item key="3">
              通知设置
            </Menu.Item>
          </Menu>
        </div>
        <div className={styles['right']}>
          <div className={styles['scroll-wrap']}>
            {switchPanel(this.state.selected[0])}
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
