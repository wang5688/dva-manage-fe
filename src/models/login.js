import request from '../utils/request';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

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
        body: params,
      };
      const result = yield call(request, 'http://localhost:3002/user/login', options);
      
      if (result) {
        // 登录成功
        message.success('登录成功', 1);
        // 存储用户信息
        yield put({ type: 'getUser' });
        yield put(routerRedux.push('/'));
      }
    },

    // 获取用户信息
    *getUser(action, { call, put }) {
      const result = yield call(request, 'http://localhost:3002/user/getUserInfo', { method: 'POST', credentials: 'include' });
      if (result) {
        yield put({ type: 'saveUser', data: result });
      }
    },

    *sendMsg(action, { call }) {
      console.log(action)
    }
  },

  reducers: {
    saveUser(state, { data }) {
      return { ...state, loginStatus: true, userInfo: data };
    }
  },
};