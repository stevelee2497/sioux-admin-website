import { fetchBoards, deleteBoard, createBoard } from '../utils/api';

export default {
  namespace: 'projects',
  state: [],
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.toLowerCase() === '/boards') {
          dispatch({
            type: 'fetchProjects'
          });
        }
      });
    },
  },
  effects: {
    *fetchProjects({ payload }, { call, put, select }) {
      const { id } = yield select(state => state.passport.profile);
      const { data } = yield call(fetchBoards, id);
      yield put({ type: 'fetchProjectsSuccess', payload: data });
    },
    *createBoard({ payload }, { call, put }) {
      const { data } = yield call(createBoard, payload);
      yield put({ type: 'fetchProjects', payload: data });
    },
    *deleteBoard({ payload: id }, { call, put }) {
      yield call(deleteBoard, id);
      yield put({ type: 'fetchAll' });
    },
  },
  reducers: {
    fetchProjectsSuccess(state, { payload }) {
      return payload;
    },
  },
};
