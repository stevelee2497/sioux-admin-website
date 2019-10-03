import router from 'umi/router';
import { login } from '../utils/api';

export default {
  namespace: 'passport',
  state: {
    authenticated: localStorage.getItem('authenticated') === 'true',
    token: localStorage.getItem('token'),
    profile: JSON.parse(localStorage.getItem('profile')),
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      const { token, profile } = response.data;
      localStorage.setItem('authenticated', true);
      localStorage.setItem('token', token);
      localStorage.setItem('profile', JSON.stringify(profile));
      yield put({ type: 'loginSuccess', payload: response.data });
      router.push('/');
    },
    *logout({ payload }, { call, put }) {
      localStorage.removeItem('authenticated');
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
      yield put({ type: 'logoutSuccess' });
      router.push('/login');
    },
  },
  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        authenticated: true,
        ...payload
      };
    },
    logoutSuccess(state, { payload }) {
      return {
        ...state,
        authenticated: false,
        token: '',
        profile: ''
      };
    },
  },
};
