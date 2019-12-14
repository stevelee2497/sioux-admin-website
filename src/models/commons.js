import moment from 'moment';

export default {
  namespace: 'commons',
  state: {
    timesheetEmployeeId: JSON.parse(localStorage.getItem('profile')).id,
    timeSheetMonth: moment(),
  },
  subscriptions: {
  },
  effects: {
    *selectEmployeeTimeSheet({ payload: id }, { call, put }) {
      yield put({ type: 'saveEmployeeId', payload: id });
      yield put({ type: 'tasks/fetchTimeSheetTasks' });
    },
    *selectMonth({ payload: month }, { call, put }) {
      yield put({ type: 'saveMonth', payload: month });
      yield put({ type: 'tasks/fetchTimeSheetTasks' });
    },
  },
  reducers: {
    saveEmployeeId(state, { payload: id }) {
      return {
        ...state,
        timesheetEmployeeId: id
      };
    },
    saveMonth(state, { payload: month }) {
      return {
        ...state,
        timeSheetMonth: month
      };
    }
  }
};
