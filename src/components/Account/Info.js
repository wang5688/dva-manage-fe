import React from 'react';
import { connect } from 'dva';
import { Button, Input, Form, Select, Upload, Avatar, Icon, Cascader, message } from 'antd';
import { Title } from '../Style';
import styles from './style.scss';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;

    this.init();
    
  }

  init() {
    this.dispatch({ type: 'ACCOUNT/fetchCountry' });
    this.dispatch({ type: 'ACCOUNT/fetchCity' });
  }

  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const param = {
          ...values,
          uid: this.props.userInfo.user_id,
          city: values.city.join(','),
        };
        this.dispatch({ type: 'ACCOUNT/updateUser', param });
      }
    });
  }

  uploadAvatar = (info) => {
    console.log(info)
  }

  beforeUpload(file) {
    const { type, size } = file;
    const ACCEPT_TYPE = ['image/jpeg', 'image/png', 'image/gif'];

    let limitType = true;
    let limitSize = true;
    
    if (ACCEPT_TYPE.indexOf(type) < 0) {
      message.error('仅支持jpeg、png或gif格式的文件');
      limitType = false;
    }
    if (size / 1024 / 1024 > 5) {
      message.error('最大可上传5MB大小的图片');
      limitSize = false;
    }
    return limitSize && limitType;
  }

  render() {
    const { city, country, userInfo } = this.props;
    const { getFieldDecorator } = this.props.form;
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    return (
      <div>
        <Title>账号信息</Title>

        <Form>
          <div className={styles['user-avatar']}>
            <Avatar
              style={{ marginBottom: 15 }}
              size={120}
              src={`http://localhost:3002${userInfo.head_icon}`}
            />
            <Upload
              name="files"
              action="http://localhost:3002/upload"
              showUploadList={false}
              beforeUpload={this.beforeUpload}
              onChange={this.uploadAvatar}
            >
              <Button><Icon type="upload" />修改头像</Button>
            </Upload>
          </div>

          <FormItem {...layout} label="用户名">
            <p>{`${userInfo.account}（ID：${userInfo.user_id}）`}</p>
          </FormItem>
          <FormItem {...layout} label="邮箱">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入您的邮箱地址' }, { validate: this.validator, message: '请输入正确的邮箱地址', reg: /^[\w\d]+@[\w\d]+\.[\w\d]+$/ }]
            })(
              <Input placeholder="邮箱地址" />
            )}
          </FormItem>
          <FormItem {...layout} label="昵称">
            {getFieldDecorator('user_name', {
              rules: [{ required: true, message: '请输入昵称' }]
            })(
              <Input placeholder="昵称" />
            )}
          </FormItem>
          <FormItem {...layout} label="个人简介">
            {getFieldDecorator('description')(
              <TextArea placeholder="个人简介" rows={4} />
            )}
          </FormItem>
          <FormItem {...layout} label="国家/地区">
            {getFieldDecorator('country', {
              getValueFromEvent(e) {
                console.log(e)
                return e;
              },
            })(
              <Select placeholder="国家/地区">
                {
                  country.map((item) => (
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem {...layout} label="所在省市">
            {getFieldDecorator('city')(
              <Cascader placeholder="所在省市" options={city} changeOnSelect />
            )}
          </FormItem>
          <FormItem {...layout} label="账号角色">
            <p>{userInfo.role === '1' ? '超级管理员' : '普通用户'}</p>
          </FormItem>
          <FormItem {...{ wrapperCol: { span: 15, offset: 6 } }}>
            <Button type="primary" onClick={this.onSubmit}>更新账号信息</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function getCity(value) {
  if (!value) return [];
  const arr = value.split(',');
  
  return arr.map((t) => t !== undefined && t);
}

const InfoForm = Form.create({
  mapPropsToFields(props) {
    const { userInfo } = props;

    return {
      email: Form.createFormField({ value: userInfo ? userInfo.email : '' }),
      user_name: Form.createFormField({ value: userInfo ? userInfo.user_name : '' }),
      description: Form.createFormField({ value: userInfo ? userInfo.description : '' }),
      country: Form.createFormField({ value: (userInfo && userInfo.country) ? +userInfo.country : '' }),
      city: Form.createFormField({ value: userInfo ? getCity(userInfo.city) : '' }),
    };
  },
})(Info);

export default connect((state) => ({
  userInfo: state['LOGIN'].userInfo,
  country: state['ACCOUNT'].country,
  city: state['ACCOUNT'].city,
}))(InfoForm);