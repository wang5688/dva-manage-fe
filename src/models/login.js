import request from '../utils/request';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import MD5 from 'md5.js';

// 密码加密
const encryption = (str) => {
  const md5 = (str) => new MD5().update(str).digest('base64');

  return md5(md5(str).substr(2, 7) + md5(str));
}

export default {
  namespace: 'LOGIN',

  state: {
    userInfo: {},
    loginStatus: false,
    autoLogin: false,
  },

  effects: {
    // 登录
    *login(action, { call, put }) {
      const { params } = action;

      const options = {
        method: 'POST',
        body: {
          account: params.account,
          password: encryption(params.password),
        },
      };
      const result = yield call(request, 'http://localhost:3002/user/login', options);

      if (result) {
        // 登录成功
        yield message.success('登录成功', 1);
        // 存储用户信息
        yield put({ type: 'getUser' });
        yield put(routerRedux.push('/'));
        yield put({ type: 'GLOBAL/loading', loading: false });
      }
    },

    // 修改密码
    *reset(action, { call, put}) {
      const { account, password } = action;
      const options = {
        method: 'POST',
        body: {
          account,
          password: encryption(password),
        }
      };
      const result = yield call(request, 'http://localhost:3002/user/resetpass', options);

      if (result) {
        yield message.success('修改成功', 2);
        yield put(routerRedux.replace('/login'));
      }
    },

    // 获取用户信息
    *getUser(action, { call, put }) {
      const result = yield call(request, 'http://localhost:3002/user/getUserInfo', { method: 'POST' });
      if (result) {
        yield put({ type: 'saveUser', data: result });
      }
    }
  },

  reducers: {
    saveUser(state, { data }) {
      return { ...state, loginStatus: true, userInfo: data };
    }
  },

  subscriptions: {

  }
};
