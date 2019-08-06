/**
 * 账号登录
 */
import React from 'react';
import { Input, Icon, Form, Col, Row, Button } from 'antd';
const FormItem = Form.Item;

class LoginMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cutdown: false,
      seconds: 120,
    };
  }

  // 获取验证码
  getCode = () => {
    const { validateFields } = this.props.form;

    // 校验手机号
    validateFields(['mobile'], (err, values) => {
      if (!err) {
        this.props.sendMsg(values.mobile);
        this.startCutdown();
      }
    });
  }

  startCutdown = () => {
    if (this.state.cutdown) return;

    this.setState({
      cutdown: true,
    });
    let seconds = this.state.seconds;
    this.timer = setInterval(() => {
      seconds -= 1;
      this.setState({
        seconds,
      });
      if (seconds <= 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

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
    const { cutdown, seconds } = this.state;

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
          <Row>
            <Col span={16}>
              <FormItem>
                {getFieldDecorator('msgCode', {
                  rules: [{ required: true, message: '请输入验证码'}, { validator: this.validate, message: '请输入6位数字验证码', reg: /^\d{6}$/ }]
                })(
                  <Input size="large" placeholder="验证码" maxLength={6} prefix={<Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="mail" />} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <Button size="large" style={{ float: 'right', width: 112 }} disabled={cutdown} onClick={this.getCode}>{cutdown ? `${seconds}秒` : '获取验证码'}</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default LoginMobile;