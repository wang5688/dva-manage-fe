/**
 * 修改密码
 */
import React from 'react';
import styles from './style.scss';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

class ResetPass extends React.Component {

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { validateFields, setFields } = this.props.form;

    validateFields((err, values) => {
      if (!err) {
        const { pass, repass, account } = values;
        console.log(pass, repass)
        if (repass !== pass) {
          setFields({
            repass: {
              value: repass,
              errors: [new Error('两次输入的密码不一致')],
            }
          });
          return false;
        }
        dispatch({ type: 'LOGIN/reset', account, password: pass });
      }
    });
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
    const { dispatch } = this.props;

    return (
      <div className={styles['login-page']}>
        <div className={styles['login-container']}>
          <h1 className={styles['tit']}>修改密码</h1>

          <Form>
            <FormItem>
              {getFieldDecorator('account', {
                initialValue: '',
                rules: [{ required: true, message: '请输入账号' }, { validator: this.validate, message: '请输入6-20位账号', reg: /^[\w]{6,20}$/ }],
              })(
                <Input size="large" placeholder="账号" prefix={<Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="user" />} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('pass', {
                initialValue: '',
                rules: [{ required: true, message: '请输入6-20位密码' }, { validator: this.validate, message: '请输入6-20位的数字、字母和字符', reg: /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i }],
              })(
                <Input size="large" type="password" placeholder="请输入密码，至少6位区分大小写" prefix={<Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="lock" />} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('repass', {
                initialValue: '',
                rules: [{ required: true, message: '请再次输入密码' }, { validator: this.validate, message: '请输入6-20位的数字、字母和字符', reg: /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i }],
              })(
                <Input size="large" type="password" placeholder="确认密码" prefix={<Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="lock" />} />
              )}
            </FormItem>

            <FormItem>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button size="large" style={{ width: 160 }} onClick={() => dispatch(routerRedux.replace('/login'))}>返回</Button>
                <Button size="large" style={{ width: 160 }} type="primary" onClick={this.handleSubmit}>提交</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const ResetForm = Form.create()(ResetPass);

export default connect()(ResetForm);