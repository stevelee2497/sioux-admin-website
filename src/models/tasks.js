import _ from 'lodash';

export default {
  namespace: 'tasks',
  state: {},
  effects: {
    *createPhase({ payload }, { call, put }) {
    },
    *fetchTasks({ payload: boardId }, { call, put, select }) {
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
