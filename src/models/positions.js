import { fetchPositions, deletePosition, createNewPosition } from '../utils/api';

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
    *deletePosition({ payload: id }, { call, put }) {
      yield call(deletePosition, id);
      yield put({ type: 'fetchAll' });
    },
    *createNewPosition({ payload: name }, { call, put }) {
      yield call(createNewPosition, name);
      yield put({ type: 'fetchAll' });
    },
  },
  reducers: {
    fetchAlluccess(state, { payload }) {
      return payload;
    },
  },
};
