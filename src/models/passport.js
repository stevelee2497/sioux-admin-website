import router from 'umi/router';
import { login } from '../utils/api';

export default {
  namespace: 'passport',
  state: {
    authenticated: localStorage.getItem('authenticated') === 'true',
    token: localStorage.getItem('token'),
    user: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      localStorage.setItem('authenticated', true);
      localStorage.setItem('token', response);
      yield put({ type: 'loginSuccess', payload: response });
      router.push('/');
    },
    *logout({ payload }, { call, put }) {
      localStorage.setItem('authenticated', false);
      localStorage.setItem('token', '');
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
