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
      const { account, password } = action;

      if (!account || !password) return;
      
    }
  },

  reducers: {

  },
};