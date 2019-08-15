import request from '../utils/request';
import { message } from 'antd';

export default {
  namespace: 'ACCOUNT',

  state: {
    country: [], // 国家列表
    city: [], // 城市列表
  },

  effects: {
    // 获取国家列表
    *fetchCountry(action, { put, call }) {
      const result = yield call(request, 'http://localhost:3002/api/country_list');
      if (result) {
        yield put({ type: 'saveCountry', data: result });
      }
    },
    // 获取城市列表
    *fetchCity(action, { put, call }) {
      const result = yield call(request, 'http://localhost:3002/api/city_list');
      if (result) {
        yield put({ type: 'saveCities', data: result });
      }
    },
    // 更新账号信息
    *updateUser(action, { put, call }) {
      const { param } = action;
      const options = {
        method: 'POST',
        body: param,
      };

      const result = yield call(request, 'http://localhost:3002/user/modify', options);
      console.log(result)
      if (result) {
        message.success('修改成功');
        yield put({ type: 'LOGIN/getUser' });
      }
    }
  },

  reducers: {
    saveCountry(state, payload) {
      const { data } = payload;
      return {...state, country: data || []};
    },
    saveCities(state, payload) {
      const { data } = payload;
      return {...state, city: data || []};
    }
  }
};