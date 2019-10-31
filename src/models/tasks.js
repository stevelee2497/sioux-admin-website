import _ from 'lodash';
import { fetchTasks, createTask, updateTask } from '../utils/api';

export default {
  namespace: 'tasks',
  state: {},
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
    *fetchTasks({ payload: boardId }, { call, put, select }) {
      const { data } = yield call(fetchTasks, boardId);
      yield put({ type: 'fetchTasksSuccess', payload: data });
    },
    *updateTask({ payload: task }, { call, put }) {
      yield put({ type: 'saveTask', payload: task });
      yield call(updateTask, task);
    },
    *deletePhase({ payload: id }, { call, put }) {
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
  },
};
