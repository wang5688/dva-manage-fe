import React from 'react';
import { Menu, Icon } from 'antd';

export default () => (
  <Menu style={{ width: 150 }}>
    <Menu.Item>
      <Icon type="user" />
      <span>个人中心</span>
    </Menu.Item>
    <Menu.Item>
      <Icon type="setting" />
      <span>账号设置</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Icon type="logout" />
      <span>退出登录</span>
    </Menu.Item>
  </Menu>
);
