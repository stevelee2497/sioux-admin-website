import { fetchBoards, deleteBoard, createBoard, fetchBoard } from '../utils/api';
import { MODAL_TYPE } from '../utils/constants';

export default {
  namespace: 'projects',
  state: {
    involvedProjects: [],
    selectedProject: null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.toLowerCase() === '/boards') {
          dispatch({
            type: 'fetchProjects'
          });
        }
      });
    },
  },
  effects: {
    *createBoard({ payload }, { call, put }) {
      const { data } = yield call(createBoard, payload);
      yield put({ type: 'createProjectSuccess', payload: data });
      yield put({ type: 'modals/changeProjectModalState', payload: MODAL_TYPE.CLOSED });
      yield put({ type: 'fetchProject', payload: data.id });
    },
    *fetchProject({ payload: id }, { call, put }) {
      const { data } = yield call(fetchBoard, id);
      yield put({ type: 'fetchProjectSuccess', payload: data });
    },
    *fetchProjects({ payload }, { call, put, select }) {
      const { id } = yield select(state => state.passport.profile);
      const { data } = yield call(fetchBoards, id);
      yield put({ type: 'fetchProjectsSuccess', payload: data });
      yield put({ type: 'fetchProject', payload: data[0].id });
    },
    *deleteBoard({ payload: id }, { call, put }) {
      yield call(deleteBoard, id);
      yield put({ type: 'fetchProjects' });
    },
  },
  reducers: {
    createProjectSuccess(state, { payload: createdProject }) {
      return {
        ...state,
        involvedProjects: [...state.involvedProjects, createdProject]
      };
    },
    fetchProjectSuccess(state, { payload: selectedProject }) {
      return {
        ...state,
        selectedProject
      };
    },
    fetchProjectsSuccess(state, { payload: involvedProjects }) {
      return {
        ...state,
        involvedProjects,
      };
    },
  },
};
