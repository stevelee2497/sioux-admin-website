/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import moment from 'moment';
import { fetchTasks, fetchWorkLogs, logWork } from '../utils/api';
import { timeHelper } from '../helpers/timeHelper';

const saveWorkLog = (state, workLog) => {
  const task = state[workLog.taskId];
  return {
    ...state,
    [workLog.taskId]: {
      ...task,
      workLogs: {
        ...task.workLogs,
        [moment(workLog.dateLog).dates()]: {
          id: workLog.id,
          day: moment(workLog.dateLog).dates(),
          amount: timeHelper.totalHours(workLog.amount),
          taskId: workLog.taskId
        }
      },
    }
  };
};

export default {
  namespace: 'timesheets',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.toLowerCase() === '/timesheets') {
          dispatch({
            type: 'fetchTimeSheetTasks'
          });
        }
      });
    },
  },
  effects: {
    *fetchTimeSheetTasks({ payload }, { call, put, select }) {
      const { id: memberId } = yield select(({ passport: { profile } }) => profile);
      const { data } = yield call(fetchTasks, '', memberId);
      const tasks = data.map(value => ({
        ...value,
        key: value.id,
        workLogs: _.keyBy(Array.from({ length: moment().daysInMonth() }).map((foo, index) => ({
          id: null,
          day: index + 1,
          amount: 0,
          taskId: value.id
        })), 'day'),
      }));
      yield put({ type: 'saveTasks', payload: tasks });
      yield put({ type: 'fetchWorkLogs', payload: memberId });
    },
    *fetchWorkLogs({ payload: memberId }, { call, put, select }) {
      const { data } = yield call(fetchWorkLogs, memberId);
      yield put({ type: 'saveWorkLogs', payload: data });
    },
    *logWork({ payload: workLog }, { call, put, select }) {
      const { id: userId } = yield select(({ passport: { profile } }) => profile);
      const { data } = yield call(logWork, { ...workLog, dateLog: moment({ day: workLog.day }), userId });
      yield put({ type: 'saveWorkLog', payload: data });
    },
  },
  reducers: {
    saveTasks(state, { payload }) {
      return _.keyBy(payload, 'id');
    },
    saveTask(state, { payload }) {
      return {
        ...state,
        [payload.id]: payload
      };
    },
    saveWorkLogs(state, { payload: workLogs }) {
      let newState = state;
      for (const workLog of workLogs) {
        newState = saveWorkLog(newState, workLog);
      }
      return newState;
    },
    saveWorkLog(state, { payload: workLog }) {
      return saveWorkLog(state, workLog);
    },
  },
};
