/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import moment from 'moment';
import { createTask, updateTask, assignTask, unAssignTask, addTaskLabel, removeTaskLabel, fetchBoards, fetchTasks, fetchWorkLogs, logWork, updateWorkLog, deleteTask, getTaskActions, createTaskAction } from '../utils/api';
import taskHelper from '../helpers/taskHelper';

export default {
  namespace: 'tasks',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((props, action) => {
        const { pathname } = props;
        if (pathname.toLowerCase() === '/timesheets') {
          dispatch({
            type: 'fetchTimeSheetTasks'
          });
          dispatch({
            type: 'people/fetch'
          });
        }
      });
    },
  },
  effects: {
    *fetchTimeSheetTasks({ payload }, { call, put, select }) {
      const { timesheetEmployeeId: employeeId, timeSheetMonth: month } = yield select(state => state.commons);

      // fetch projects that user involved in
      const { data: projects } = yield call(fetchBoards, employeeId);
      yield put({ type: 'projects/fetchProjectsSuccess', payload: projects });

      // then fetch tasks that user is assigned or logged work
      const { data } = yield call(fetchTasks, '', employeeId);
      const tasks = taskHelper.saveTimeSheetTask(data, projects, month);
      yield put({ type: 'saveTasks', payload: tasks });

      // ensure that all the tasks is loaded before put action fetchWorkLogs
      yield put({ type: 'fetchWorkLogs', payload: employeeId });
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
      yield put({ type: 'createTaskAction', payload: { action: 'created this task', taskId: data.id } });
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
    *deleteTask({ payload: taskId }, { call, put }) {
      const { data } = yield call(deleteTask, taskId);
      if (data) {
        yield put({ type: 'deleteTaskSuccess', payload: taskId });
      }
    },
    *getTaskActions({ payload: taskId }, { call, put, select }) {
      const { data } = yield call(getTaskActions, taskId);
      yield put({ type: 'saveTaskActions', payload: { taskActions: data, taskId } });
    },
    *createTaskAction({ payload: { action, taskId } }, { call, put, select }) {
      const { id: userId } = yield select(({ passport: { profile } }) => profile);
      const taskAction = {
        taskId,
        userId,
        actionDescription: action
      };
      const { data } = yield call(createTaskAction, taskAction);
      yield put({ type: 'saveTaskAction', payload: data });
    }
  },
  reducers: {
    saveTasks(state, { payload }) {
      return _.keyBy(payload, 'id');
    },
    saveWorkLogs(state, { payload: workLogs }) {
      let newState = state;
      for (const workLog of workLogs) {
        newState = taskHelper.saveWorkLog(newState, workLog);
      }
      return newState;
    },
    saveWorkLog(state, { payload: workLog }) {
      return taskHelper.saveWorkLog(state, workLog);
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
    deleteTaskSuccess(state, { payload: taskId }) {
      return _.omit(state, taskId);
    },
    saveTaskActions(state, { payload: { taskActions, taskId } }) {
      const task = state[taskId];
      return {
        ...state,
        [taskId]: {
          ...task,
          taskActions: _.keyBy(taskActions, 'id')
        }
      };
    },
    saveTaskAction(state, { payload: taskAction }) {
      const task = {
        ...state[taskAction.taskId],
        taskActions: {
          ...state[taskAction.taskId].taskActions,
          [taskAction.id]: taskAction
        }
      };

      return {
        ...state,
        [task.id]: task
      };
    },
    deleteTaskActionSuccess(state, { payload: taskId }) {
      const task = state[taskId];
      return {
        ...state,
        [taskId]: {
          ...task,
          taskActions: _.omit(task.taskActions, taskId)
        }
      };
    },
  },
};
