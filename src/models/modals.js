import { MODAL_TYPE } from '../utils/constants';
import { fetchBoard, fetchLabels, fetchTask, fetchPhases } from '../utils/api';

export default {
  namespace: 'modals',
  state: {
    projectModalVisible: false,
    taskModalVisible: false,
    labelModalVisible: false,
    modalType: MODAL_TYPE.CLOSED,
    taskId: null,
  },
  subscriptions: {

  },
  effects: {
    *showTask({ payload: taskId }, { call, put, select }) {
      yield put({ type: 'changeTaskModalState', payload: { modalType: MODAL_TYPE.VIEW, taskId } });
      yield put({ type: 'tasks/getTaskActions', payload: taskId });
    },
    *showTaskFromTimeSheets({ payload: task }, { call, put, select }) {
      // fetch board that the task located in, needed for assign members button
      const { data: board } = yield call(fetchBoard, task.boardId);
      yield put({ type: 'projects/fetchProjectSuccess', payload: board });

      // fetch labels to show in the task modal
      const { data: labels } = yield call(fetchLabels, task.boardId);
      yield put({ type: 'labels/fetchLabelsSuccess', payload: labels });

      // fetch phases so that we can know the status of the task
      const { data: phases } = yield call(fetchPhases, task.boardId);
      yield put({ type: 'phases/fetchPhasesSuccess', payload: phases });

      // update task information
      const { data } = yield call(fetchTask, task.id);
      yield put({ type: 'tasks/saveTask', payload: { ...task, ...data } });

      // display the task modal
      // we need to ensure the other data was loaded before showing the task modal
      yield put({ type: 'changeTaskModalState', payload: { modalType: MODAL_TYPE.VIEW, taskId: task.id } });
    },
  },
  reducers: {
    changeProjectModalState(state, { payload: modalType }) {
      return {
        ...state,
        modalType,
        projectModalVisible: modalType !== MODAL_TYPE.CLOSED
      };
    },
    changeTaskModalState(state, { payload: { modalType, taskId } }) {
      return {
        ...state,
        modalType,
        taskModalVisible: modalType !== MODAL_TYPE.CLOSED,
        taskId
      };
    },
    changeLabelModalState(state, { payload: visible }) {
      return {
        ...state,
        labelModalVisible: visible
      };
    }
  }
};
