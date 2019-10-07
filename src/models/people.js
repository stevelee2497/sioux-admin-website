import { fetchEmployees, delay, updateEmployee, fetchEmployee, addUserSkill, getUserSkills, removeUserSkills, getTimeLineEvents, addTimeLineEvent, removeTimeLineEvents, createNewSkill } from '../utils/api';
import { PROFILE_MODAL_TYPE } from '../utils/constants';

export default {
  namespace: 'people',
  state: {
    dataSource: [],
    page: 1,
    pageSize: 20,
    total: 100,
    selectedEmployee: JSON.parse(localStorage.getItem('profile')),
    modalVisible: true,
    selectedPosition: undefined,
    selectedSkills: [],
    profileModalType: PROFILE_MODAL_TYPE.EDIT
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.toLowerCase() === '/people') {
          dispatch({
            type: 'fetch',
            payload: {
              page: 1,
              pageSize: 20,
            },
          });
        }
      });
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const { page, pageSize } = yield select(state => state.people);
      const response = yield call(fetchEmployees, page, pageSize);
      yield put({ type: 'fetchSuccess', payload: response });
    },
    *changePagination({ payload }, { call, put, select }) {
      yield put({ type: 'savePagination', payload });
      yield put({ type: 'fetch' });
    },
    *changePositionFilter({ payload }, { call, put, select }) {
      yield put({ type: 'savePositionTag', payload });
      yield put({ type: 'fetch' });
    },
    *changeSkillsFilter({ payload }, { call, put, select }) {
      yield put({ type: 'saveSkillTags', payload });
      yield put({ type: 'fetch' });
    },
    *updateEmployeeProfile({ payload }, { call, put, select }) {
      yield call(updateEmployee, payload);
      yield put({ type: 'closeModal' });
      const { profile } = yield select(state => state.passport);
      if (payload.id === profile.id) {
        yield put({ type: 'passport/updateProfile', payload: profile.id });
      }
    },
    *showProfile({ payload: id }, { call, put, select }) {
      const { data } = yield call(fetchEmployee, id);
      yield put({ type: 'selectEmployee', payload: data });
      const selectedEmployee = yield select(state => state.people.selectedEmployee);
      yield put({ type: 'getTimeLineEvents', payload: selectedEmployee.id });
    },
    *addUserSkill({ payload }, { call, put, select }) {
      const { newSkillName, skillId, userId } = payload;
      if (newSkillName) {
        const { data: { id } } = yield call(createNewSkill, newSkillName);
        yield call(addUserSkill, { userId, skillId: id });
      } else {
        yield call(addUserSkill, { userId, skillId });
      }
      yield put({ type: 'getUserSkills' });
    },
    *getUserSkills({ payload }, { call, put, select }) {
      const { id } = yield select(state => state.people.selectedEmployee);
      const { data } = yield call(getUserSkills, id);
      yield put({ type: 'getUserSkillsSuccess', payload: data });
    },
    *removeUserSkills({ payload: id }, { call, put, select }) {
      yield call(removeUserSkills, id);
      yield put({ type: 'getUserSkills' });
    },
    *addTimeLineEvent({ payload }, { call, put, select }) {
      yield call(addTimeLineEvent, payload);
      const { id } = yield select(state => state.people.selectedEmployee);
      yield put({ type: 'getTimeLineEvents', payload: id });
    },
    *getTimeLineEvents({ payload: userId }, { call, put, select }) {
      const { data } = yield call(getTimeLineEvents, userId);
      yield put({ type: 'getTimeLineEventsSuccess', payload: data });
    },
    *removeTimeLineEvents({ payload: id }, { call, put, select }) {
      yield call(removeTimeLineEvents, id);
      const { id: userId } = yield select(state => state.people.selectedEmployee);
      yield put({ type: 'getTimeLineEvents', payload: userId });
    },
  },
  reducers: {
    fetchSuccess(state, { payload }) {
      return {
        ...state,
        dataSource: payload.data,
        total: payload.total,
      };
    },
    savePagination(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    closeModal(state, { payload }) {
      return {
        ...state,
        modalVisible: false,
        selectedEmployee: null,
      };
    },
    selectEmployee(state, { payload: selectedEmployee }) {
      return {
        ...state,
        modalVisible: true,
        selectedEmployee,
        profileModalType: PROFILE_MODAL_TYPE.VIEW
      };
    },
    savePositionTag(state, { payload }) {
      return {
        ...state,
        selectedPosition: payload,
      };
    },
    saveSkillTags(state, { payload }) {
      const { tag, checked } = payload;
      return {
        ...state,
        selectedSkills: checked
          ? [...state.selectedSkills, tag]
          : state.selectedSkills.filter(t => t !== tag),
      };
    },
    changeViewType(state, { payload: profileModalType }) {
      return {
        ...state,
        profileModalType
      };
    },
    openEmployeeForm(state, { payload }) {
      return {
        ...state,
        profileModalType: PROFILE_MODAL_TYPE.CREATE,
        modalVisible: true
      };
    },
    getUserSkillsSuccess(state, { payload: skills }) {
      return {
        ...state,
        selectedEmployee: {
          ...state.selectedEmployee,
          skills
        }
      };
    },
    getTimeLineEventsSuccess(state, { payload: timeLineEvents }) {
      return {
        ...state,
        selectedEmployee: {
          ...state.selectedEmployee,
          timeLineEvents
        }
      };
    },
  },
};
