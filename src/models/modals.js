import { MODAL_TYPE } from '../utils/constants';

export default {
  namespace: 'modals',
  state: {
    projectModalVisible: false,
    modalType: MODAL_TYPE.CLOSED
  },
  subscriptions: {

  },
  effects: {

  },
  reducers: {
    changeProjectModalState(state, { payload: modalType }) {
      return {
        ...state,
        modalType,
        projectModalVisible: modalType !== MODAL_TYPE.CLOSED
      };
    }
  }
};
