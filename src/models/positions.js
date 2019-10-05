import { fetchPositions } from '../utils/api';

export default {
  namespace: 'positions',
  state: [],
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.toLowerCase() === '/people') {
          dispatch({
            type: 'fetchAll'
          });
        }
      });
    },
  },
  effects: {
    *fetchAll({ payload }, { call, put }) {
      const { data } = yield call(fetchPositions);
      yield put({ type: 'fetchAlluccess', payload: data });
    },
  },
  reducers: {
    fetchAlluccess(state, { payload }) {
      return payload;
    },
  },
};
