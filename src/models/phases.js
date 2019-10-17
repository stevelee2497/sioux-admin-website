import _ from 'lodash';
import { fetchPhases, createPhase } from '../utils/api';

export default {
  namespace: 'phases',
  state: {
  },
  effects: {
    *createPhase({ payload: name }, { call, put, select }) {
      const { selectedProject } = yield select(state => state.projects);
      const { data } = yield call(createPhase, { boardId: selectedProject.id, name });
      const newOrder = [...selectedProject.phaseOrder, data.id];
      yield put({ type: 'projects/updateProject', payload: { ...selectedProject, phaseOrder: newOrder } });
      yield put({ type: 'fetchPhases', payload: selectedProject.id });
    },
    *fetchPhases({ payload: boardId }, { call, put, select }) {
      const { data } = yield call(fetchPhases, boardId);
      yield put({ type: 'fetchPhasesSuccess', payload: data });
    },
    *deletePhase({ payload: id }, { call, put }) {
    },
  },
  reducers: {
    fetchPhasesSuccess(state, { payload }) {
      return _.keyBy(payload, 'id');
    },
  },
};
