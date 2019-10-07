import { fetchSkills, deleteSkill } from '../utils/api';

export default {
  namespace: 'skills',
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
      const { data } = yield call(fetchSkills);
      yield put({ type: 'fetchAlluccess', payload: data });
    },
    *deleteSkill({ payload: id }, { call, put }) {
      yield call(deleteSkill, id);
      yield put({ type: 'fetchAll' });
    },
  },
  reducers: {
    fetchAlluccess(state, { payload }) {
      return payload;
    },
  },
};
