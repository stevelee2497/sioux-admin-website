export default {
  namespace: 'tasks',
  state: {},
  effects: {
    *createPhase({ payload }, { call, put }) {
    },
    *fetchPhases({ payload: boardId }, { call, put, select }) {
    },
    *deletePhase({ payload: id }, { call, put }) {
    },
  },
  reducers: {
    fetchPhasesSuccess(state, { payload }) {
      return payload;
    },
  },
};
