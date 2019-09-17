import router from 'umi/router';
import { fetchEmployees } from '../utils/api';

export default {
  namespace: 'employee',
  state: {
    dataSource: [],
    page: 1,
    pageSize: 20,
    total: 100,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.toLowerCase() === '/people') {
          dispatch({
            type: 'fetch',
            payload: {
              page: 1,
              pageSize: 20
            }
          });
        }
      });
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { page, pageSize } = yield select(state => state.employee);
      const response = yield call(fetchEmployees, page, pageSize);
      console.log(response);
      yield put({ type: 'fetchSuccess', payload: response });
    },
  },
  reducers: {
    fetchSuccess(state, { payload }) {
      return {
        ...state,
        dataSource: payload.data,
        total: payload.total
      };
    },
  },
};
