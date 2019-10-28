import _ from 'lodash';
import { fetchBoards, deleteBoard, createBoard, fetchBoard, updateBoard, delay, addBoardMember } from '../utils/api';
import { MODAL_TYPE } from '../utils/constants';

export default {
  namespace: 'projects',
  state: {
    involvedProjects: null,
    selectedProject: null
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.toLowerCase() === '/boards') {
          dispatch({
            type: 'fetchProjects'
          });
          dispatch({
            type: 'people/fetch'
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
      yield put({ type: 'tasks/fetchTasks', payload: id });
      yield call(delay, 100);
      yield put({ type: 'fetchProjectSuccess', payload: data });
      yield put({ type: 'phases/fetchPhases', payload: id });
    },
    *fetchProjects({ payload }, { call, put, select }) {
      const { id } = yield select(state => state.passport.profile);
      const { data } = yield call(fetchBoards, id);
      yield put({ type: 'fetchProjectsSuccess', payload: data });
      if (data[0]) {
        yield put({ type: 'fetchProject', payload: data[0].id });
      }
    },
    *updateProject({ payload }, { call, put }) {
      yield put({ type: 'fetchProjectSuccess', payload });
      yield call(updateBoard, payload);
      yield put({ type: 'modals/changeProjectModalState', payload: MODAL_TYPE.CLOSED });
    },
    *deleteBoard({ payload: id }, { call, put }) {
      yield call(deleteBoard, id);
      yield put({ type: 'fetchProjects' });
    },
    *addUserToProject({ payload }, { call, put }) {
      const { data } = yield call(addBoardMember, payload);
      console.log(data);
      yield put({ type: 'addUserToProjectSuccess', payload: data });
    },
  },
  reducers: {
    createProjectSuccess(state, { payload: project }) {
      return {
        ...state,
        involvedProjects: { ...state.involvedProjects, [project.id]: project }
      };
    },
    fetchProjectSuccess(state, { payload: project }) {
      return {
        ...state,
        involvedProjects: { ...state.involvedProjects, [project.id]: project },
        selectedProject: project
      };
    },
    fetchProjectsSuccess(state, { payload }) {
      return {
        ...state,
        involvedProjects: _.keyBy(payload, 'id'),
      };
    },
    addUserToProjectSuccess(state, { payload }) {
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          users: [...state.selectedProject.users, payload]
        }
      };
    },
  },
};
