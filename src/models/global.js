import { routerRedux } from 'dva/router';
import { message } from 'antd';
import tools from '../utils/tools';

export default {
  namespace: 'GLOBAL',

  state: {
    
  },

  reducers: {
    
  },

  subscriptions: {
    setUp({ dispatch, history }) {
      return history.listen((location) => {
        const { pathname } = location;

        if (/login|resetpass/.test(pathname) && tools.getCookie('lg') === '1') {
          dispatch(routerRedux.replace('/'));
        }
        if (!tools.getCookie('lg') && !/login|resetpass/.test(pathname)) {
          message.error('请您先登录', 2).then(() => {
            dispatch(routerRedux.replace('/login'));
          });
        }
      });
    }
  }
};
