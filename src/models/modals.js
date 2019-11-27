import { MODAL_TYPE } from '../utils/constants';
import { fetchBoard, fetchLabels, fetchTask } from '../utils/api';

export default {
  namespace: 'modals',
  state: {
    projectModalVisible: false,
    taskModalVisible: false,
    labelModalVisible: false,
    modalType: MODAL_TYPE.CLOSED,
    task: null,
  },
  subscriptions: {

  },
  effects: {
    *showTask({ payload: task }, { call, put, select }) {
      yield put({ type: 'changeTaskModalState', payload: { modalType: MODAL_TYPE.VIEW, task } });
    },
    *showTaskFromTimeSheets({ payload: task }, { call, put, select }) {
      // fetch sufficient data to display the task modal
      const { data: board } = yield call(fetchBoard, task.boardId);
      const { data: labels } = yield call(fetchLabels, task.boardId);
      yield put({ type: 'projects/fetchProjectSuccess', payload: board });
      yield put({ type: 'labels/fetchLabelsSuccess', payload: labels });

      // display the task modal
      const { data } = yield call(fetchTask, task.id);
      yield put({ type: 'changeTaskModalState', payload: { modalType: MODAL_TYPE.VIEW, task: data } });
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
    changeTaskModalState(state, { payload: { modalType, task } }) {
      return {
        ...state,
        modalType,
        taskModalVisible: modalType !== MODAL_TYPE.CLOSED,
        task
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
