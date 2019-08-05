/**
 * 账号登录
 */
import React from 'react';
import { Input, Icon, Form } from 'antd';
const FormItem = Form.Item;

class LoginAccount extends React.Component {



  validate = (rule, value, callback) => {
    const { reg, message: msg } = rule;
    if (value && !reg.test(value)) {
      callback(msg);
      return;
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-account">
        <Form>
          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入用户名' }, { validator: this.validate, message: '请输入6-20位的数字和字母', reg: /^[\w]{6,20}$/ }],
            })(
              <Input size="large" placeholder="用户名" prefix={<Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="user" />} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码'}, { validator: this.validate, message: '请输入6-20位的数字、字母和字符', reg: /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i }]
            })(
              <Input.Password size="large" placeholder="密码" password="true" prefix={<Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="lock" />} />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default LoginAccount;