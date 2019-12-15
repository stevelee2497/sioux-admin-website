export default {
  namespace: 'commons',
  state: {
    timesheetSelectedEmployeeId: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).id : null
  },
  subscriptions: {
  },
  effects: {
    *selectEmployeeTimeSheet({ payload: id }, { call, put }) {
      yield put({ type: 'saveTimesheetSelectedEmployeeId', payload: id });
      yield put({ type: 'tasks/fetchTimeSheetTasks' });
    },
  },
  reducers: {
    saveTimesheetSelectedEmployeeId(state, { payload: id }) {
      return {
        ...state,
        timesheetSelectedEmployeeId: id
      };
    },
  }
};
