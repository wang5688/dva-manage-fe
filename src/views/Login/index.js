/**
 * 登录页
 */
import React from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { Tabs, Button, Checkbox, Row, Col, Form } from 'antd';
import { Link } from 'dva/router';
import LoginAccount from './components/loginAccount';
import LoginMobile from './components/loginMobile';

const { TabPane } = Tabs;
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMode: '0', // 登录模式 0-账号登录 1-手机号登录
      autoLogin: true,
      isLoading: false,
    };
  }

  handleLogin = () => {
    const { dispatch } = this.props;
    const { loginMode } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = loginMode === '0' ? {
          account: values.account,
          password: values.password,
        } : {
          mobile: values.mobile,
          captcha: values.msgCode,
        };
        this.setState();
        dispatch({ type: 'LOGIN/login', params });
      }
    });
  }

  render() {
    const { loginMode: mode, autoLogin } = this.state;

    return (
      <div className={styles['login-page']}>
        <div className={`login-container ${styles['login-container']}`}>
          <h1 className={styles['tit']}>后台管理系统</h1>

          <div className={styles['login-tab']}>
            <Tabs
              defaultActiveKey={mode}
              animated={false}
              onChange={(key) => {
                this.setState({ loginMode: key });
              }}
            >
              <TabPane tab="账号密码登录" key="0">
                <LoginAccount form={this.props.form} />
              </TabPane>
              <TabPane tab="手机号登录" key="1">
                <LoginMobile
                  form={this.props.form}
                  sendMsg={(mobile) => {
                    const { dispatch } = this.props;
                    dispatch({ type: 'LOGIN/sendMsg', mobile });
                  }}
                />
              </TabPane>
            </Tabs>

            <Row>
              <Col span={12}>
                <FormItem>
                  <Checkbox
                    checked={autoLogin}
                    onChange={() => {
                      this.setState({
                        autoLogin: !this.state.autoLogin,
                      });
                      // 自动登录状态存储到cookie中
                      
                    }}
                  >自动登录</Checkbox>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem style={{ float: 'right' }}><Link to="/resetpass">忘记密码</Link></FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button
                size="large"
                style={{ width: '100%' }}
                type="primary"
                onClick={this.handleLogin}
              >登录</Button>
            </FormItem>
          </div>
        </div>
      </div>
    );
  }
}

const LoginForm = Form.create()(Login);
export default connect()(LoginForm);