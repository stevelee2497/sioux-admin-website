import { fetchEmployees } from '../utils/api';

export default {
  namespace: 'people',
  state: {
    dataSource: [],
    page: 1,
    pageSize: 20,
    total: 100,
    selectedEmployee: undefined,
    modalVisible: false,
    selectedPosition: undefined,
    selectedSkills: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.toLowerCase() === '/people') {
          dispatch({
            type: 'fetch',
            payload: {
              page: 1,
              pageSize: 20
            }
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
        ...payload
      };
    },
    closeModal(state, { payload }) {
      return {
        ...state,
        modalVisible: false,
        selectedEmployee: null
      };
    },
    selectEmployee(state, { payload: selectedEmployee }) {
      return {
        ...state,
        modalVisible: true,
        selectedEmployee
      };
    },
    savePositionTag(state, { payload }) {
      return {
        ...state,
        selectedPosition: payload
      };
    },
    saveSkillTags(state, { payload }) {
      const { tag, checked } = payload;
      return {
        ...state,
        selectedSkills: checked ? [...state.selectedSkills, tag] : state.selectedSkills.filter(t => t !== tag)
      };
    }
  },
};
