import _ from 'lodash';
import { fetchPhases, createPhase, deletePhase, updatePhase } from '../utils/api';

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
    *updatePhase({ payload: phase }, { call, put, select }) {
      yield call(updatePhase, phase);
      yield put({ type: 'updatePhaseSuccess', payload: phase });
    },
    *deletePhase({ payload: id }, { call, put, select }) {
      yield call(deletePhase, id);
      yield put({ type: 'deletePhaseSuccess', payload: id });

      // update phaseOrder of project
      const { selectedProject } = yield select(state => state.projects);
      const newOrder = selectedProject.phaseOrder.filter(x => x !== id);
      yield put({ type: 'projects/updateProject', payload: { ...selectedProject, phaseOrder: newOrder } });
    },
  },
  reducers: {
    fetchPhasesSuccess(state, { payload }) {
      return _.keyBy(payload, 'id');
    },
    updatePhaseSuccess(state, { payload }) {
      return {
        ...state,
        [payload.id]: payload
      };
    },
    deletePhaseSuccess(state, { payload: id }) {
      return _.omit(state, id);
    },
  },
};
