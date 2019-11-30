/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import moment from 'moment';
import { createTask, updateTask, assignTask, unAssignTask, addTaskLabel, removeTaskLabel, fetchBoards, fetchTasks, fetchWorkLogs, logWork, updateWorkLog } from '../utils/api';
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
          taskId: workLog.taskId,
          description: workLog.description
        }
      },
    }
  };
};

export default {
  namespace: 'tasks',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((props, action) => {
        console.log(props, action);
        const { pathname } = props;
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

      // fetch projects that user involved in
      const { data: projects } = yield call(fetchBoards, memberId);
      yield put({ type: 'projects/fetchProjectsSuccess', payload: projects });

      // then fetch tasks that user is assigned or logged work
      const { data } = yield call(fetchTasks, '', memberId);
      const involvedProjects = _.keyBy(projects, 'id');
      const tasks = data.map(value => ({
        ...value,
        key: value.id,
        boardKey: involvedProjects[value.boardId].key,
        workLogs: _.keyBy(Array.from({ length: moment().daysInMonth() }).map((foo, index) => ({
          id: null,
          day: index + 1,
          amount: 0,
          taskId: value.id,
          description: ''
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
    *updateWorkLog({ payload: workLog }, { call, put, select }) {
      const { id: userId } = yield select(({ passport: { profile } }) => profile);
      const { data } = yield call(updateWorkLog, { ...workLog, dateLog: moment({ day: workLog.day }), userId });
      yield put({ type: 'saveWorkLog', payload: data });
    },
    *createTask({ payload }, { call, put }) {
      const { task, phase } = payload;
      const { data } = yield call(createTask, task);
      yield put({ type: 'saveTask', payload: data });
      // Update taskOrder of the phase where the task is created
      const newPhase = {
        ...phase,
        taskOrder: [...phase.taskOrder, data.id]
      };
      yield put({ type: 'phases/updatePhase', payload: newPhase });
    },
    *updateTask({ payload: task }, { call, put }) {
      yield put({ type: 'saveTask', payload: task });
      yield call(updateTask, task);
    },
    *assignTask({ payload: taskAssignee }, { call, put }) {
      const { data } = yield call(assignTask, taskAssignee);
      yield put({ type: 'assignTaskSuccess', payload: data });
    },
    *unAssignTask({ payload: id }, { call, put }) {
      const { data } = yield call(unAssignTask, id);
      yield put({ type: 'unAssignTaskSuccess', payload: data });
    },
    *addTaskLabel({ payload: taskLabel }, { call, put }) {
      const { data } = yield call(addTaskLabel, taskLabel);
      yield put({ type: 'addTaskLabelSuccess', payload: data });
    },
    *removeTaskLabel({ payload: id }, { call, put }) {
      const { data } = yield call(removeTaskLabel, id);
      yield put({ type: 'removeTaskLabelSuccess', payload: data });
    },
  },
  reducers: {
    saveTasks(state, { payload }) {
      return _.keyBy(payload, 'id');
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
    fetchTasksSuccess(state, { payload }) {
      return _.keyBy(payload, 'id');
    },
    saveTask(state, { payload }) {
      return {
        ...state,
        [payload.id]: payload
      };
    },
    assignTaskSuccess(state, { payload: taskAssignee }) {
      const task = state[taskAssignee.taskId];
      return {
        ...state,
        [taskAssignee.taskId]: {
          ...task,
          taskAssignees: [...task.taskAssignees, taskAssignee]
        }
      };
    },
    unAssignTaskSuccess(state, { payload: taskAssignee }) {
      const task = state[taskAssignee.taskId];
      return {
        ...state,
        [taskAssignee.taskId]: {
          ...task,
          taskAssignees: task.taskAssignees.filter(item => item.id !== taskAssignee.id)
        }
      };
    },
    addTaskLabelSuccess(state, { payload: taskLabel }) {
      const task = state[taskLabel.taskId];
      return {
        ...state,
        [taskLabel.taskId]: {
          ...task,
          taskLabels: [...task.taskLabels, taskLabel]
        }
      };
    },
    removeTaskLabelSuccess(state, { payload: taskLabel }) {
      const task = state[taskLabel.taskId];
      return {
        ...state,
        [taskLabel.taskId]: {
          ...task,
          taskLabels: task.taskLabels.filter(item => item.id !== taskLabel.id)
        }
      };
    },
  },
};
