import _ from 'lodash';
import { fetchTasks } from '../utils/api';

export default {
  namespace: 'tasks',
  state: {},
  effects: {
    *createPhase({ payload }, { call, put }) {
    },
    *fetchTasks({ payload: boardId }, { call, put, select }) {
      const { data } = yield call(fetchTasks, boardId);
      yield put({ type: 'fetchTasksSuccess', payload: data });
    },
    *deletePhase({ payload: id }, { call, put }) {
    },
  },
  reducers: {
    fetchTasksSuccess(state, { payload }) {
      return _.keyBy(payload, 'id');
    },
  },
};
