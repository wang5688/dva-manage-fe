import React from 'react';
import { Icon, Menu } from 'antd';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1352078_7u82bbqliov.js',
});

export default () => (
  <Menu>
    <Menu.Item>
      <IconFont type="icon-zhongguo" />
      <span>简体中文</span>
    </Menu.Item>
    <Menu.Item>
      <IconFont type="icon-zhongguo" />
      <span>繁体中文</span>
    </Menu.Item>
    <Menu.Item>
      <IconFont type="icon-yingguo" />
      <span>English</span>
    </Menu.Item>
    <Menu.Item>
      <IconFont type="icon-baxi" />
      <span>Português</span>
    </Menu.Item>
    <Menu.Item>
      <IconFont type="icon-xibanya" />
      <span>Español</span>
    </Menu.Item>
  </Menu>
);
