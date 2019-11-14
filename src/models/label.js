import _ from 'lodash';
import { createLabel, fetchLabels, updateLabel, deleteLabel } from '../utils/api';

export default {
  namespace: 'labels',
  state: {},
  effects: {
    *createLabel({ payload }, { call, put }) {
      const { data } = yield call(createLabel, payload);
      yield put({ type: 'saveLabel', payload: data });
    },
    *fetchLabels({ payload: boardId }, { call, put }) {
      const { data } = yield call(fetchLabels, boardId);
      yield put({ type: 'fetchLabelsSuccess', payload: data });
    },
    *updateLabel({ payload }, { call, put }) {
      yield put({ type: 'saveLabel', payload });
      yield call(updateLabel, payload);
    },
    *deleteLabel({ payload: id }, { call, put }) {
      yield put({ type: 'deleteLabelSuccess', payload: id });
      yield call(deleteLabel, id);
    },
  },
  reducers: {
    fetchLabelsSuccess(state, { payload: labels }) {
      return _.keyBy(labels, 'id');
    },
    saveLabel(state, { payload: label }) {
      return {
        ...state,
        [label.id]: label
      };
    },
    deleteLabelSuccess(state, { payload: id }) {
      return _.omit(state, id);
    },
  },
};
