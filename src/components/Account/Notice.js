import React from 'react';
import { connect } from 'dva';
import { Title} from '../Style';
import { List, Switch } from 'antd';

class Notice extends React.Component {

  render() {
    const data = [
      {
        key: 1,
        title: '账户密码',
        description: '接收账户密码修改的相关通知消息',
        content: <Switch checkedChildren="开" unCheckedChildren="关"></Switch>,
      },
      {
        key: 2,
        title: '系统消息',
        description: '接收系统通知消息',
        content: <Switch checkedChildren="开" unCheckedChildren="关"></Switch>,
      },
      {
        key: 3,
        title: '待办任务',
        description: '接收待办任务通知消息',
        content: <Switch checkedChildren="开" unCheckedChildren="关"></Switch>,
      },
    ];

    return (
      <div>
        <Title>新消息通知</Title>

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

export default connect()(Notice);
