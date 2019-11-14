import { MODAL_TYPE } from '../utils/constants';

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
