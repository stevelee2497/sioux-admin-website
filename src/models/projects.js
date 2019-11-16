import _ from 'lodash';
import { fetchBoards, deleteBoard, createBoard, fetchBoard, updateBoard, addBoardMember, removeBoardMember, fetchTasks, fetchLabels } from '../utils/api';
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
      const { data: board } = yield call(fetchBoard, id);
      const { data: tasks } = yield call(fetchTasks, id);
      const { data: labels } = yield call(fetchLabels, id);
      yield put({ type: 'labels/fetchLabelsSuccess', payload: labels });
      yield put({ type: 'tasks/fetchTasksSuccess', payload: tasks });
      yield put({ type: 'fetchProjectSuccess', payload: board });
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
      yield put({ type: 'addUserToProjectSuccess', payload: data });
    },
    *removeBoardMember({ payload: member }, { call, put }) {
      const { data } = yield call(removeBoardMember, member.id);
      if (data) {
        yield put({ type: 'removeBoardMemberSuccess', payload: member.userId });
      }
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
        selectedProject: {
          ...project,
          users: _.keyBy(project.users, 'userId')
        }
      };
    },
    fetchProjectsSuccess(state, { payload }) {
      return {
        ...state,
        involvedProjects: _.keyBy(payload, 'id'),
      };
    },
    addUserToProjectSuccess(state, { payload }) {
      const { selectedProject } = state;
      return {
        ...state,
        selectedProject: {
          ...selectedProject,
          users: { ...selectedProject.users, [payload.userId]: payload }
        }
      };
    },
    removeBoardMemberSuccess(state, { payload: userId }) {
      const { selectedProject } = state;
      return {
        ...state,
        selectedProject: {
          ...selectedProject,
          users: _.omit(selectedProject.users, userId)
        }
      };
    },
  },
};
