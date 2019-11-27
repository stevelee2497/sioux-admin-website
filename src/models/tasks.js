import _ from 'lodash';
import moment from 'moment';
import { fetchTasks, createTask, updateTask, assignTask, unAssignTask, addTaskLabel, removeTaskLabel } from '../utils/api';

export default {
  namespace: 'tasks',
  state: {},
  subscriptions: {
  },
  effects: {
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
