/**
 * 账号登录
 */
import React from 'react';
import { Input, Icon, Form } from 'antd';
const FormItem = Form.Item;

class LoginMobile extends React.Component {

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
            {getFieldDecorator('mobile', {
              rules: [{ required: true, message: '请输入手机号' }, { validator: this.validate, message: '手机号格式错误', reg: /^1[34578]\d{9}$/ }],
            })(
              <Input size="large" placeholder="手机号" prefix={<Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="mobile" />} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('msgCode', {
              rules: [{ required: true, message: '请输入验证码'}, { validator: this.validate, message: '请输入6位数字验证码', reg: /^\d{6}$/ }]
            })(
              <Input size="large" placeholder="验证码" maxLength={6} prefix={<Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="mail" />} />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default LoginMobile;