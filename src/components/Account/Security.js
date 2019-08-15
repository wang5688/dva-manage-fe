import React from 'react';
import { connect } from 'dva';
import { Title } from '../Style';
import { List } from 'antd';

class Security extends React.Component {

  render() {
    const data = [
      { key: 1, title: '账户密码', description: '当前密码强度：强', content: (<a>修改</a>) },
      { key: 2, title: '密保手机', description: '已绑定手机：188****8888', content: (<a>修改</a>) },
      { key: 3, title: '密保问题', description: '未设置密保问题，密保问题可有效保护账户安全', content: (<a>修改</a>) },
      { key: 4, title: '安全邮箱', description: '已绑定：sdad****126.com', content: (<a>设置</a>) },
    ];

    return (
      <div>
        <Title>安全设置</Title>

        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                key={item.key}
                title={item.title}
                description={item.description}
              ></List.Item.Meta>
              {item.content}
            </List.Item>
          )}
        >
        </List>
      </div>
    );
  }
}

export default connect()(Security);
