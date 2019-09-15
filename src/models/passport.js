import router from 'umi/router';
import { login } from '../utils/api';

export default {
  namespace: 'passport',
  state: {
    authenticated: false,
    token: '',
    user: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(login, payload);
      yield put({ type: 'loginSuccess', payload: response });
      router.push('/');
    },
    *logout({ payload }, { call, put }) {
      console.log(payload);
      yield put({ type: 'logoutSuccess' });
      router.push('/login');
    },
  },
  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        authenticated: true,
        token: payload,
      };
    },
    logoutSuccess(state, { payload }) {
      return {
        ...state,
        authenticated: false,
        token: '',
      };
    },
  },
};
