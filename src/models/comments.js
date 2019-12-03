import _ from 'lodash';
import { createComment, fetchComments, updateComment, deleteComment } from '../utils/api';

export default {
  namespace: 'comments',
  state: {
  },
  effects: {
    *createComment({ payload: comment }, { call, put }) {
      const { data } = yield call(createComment, comment);
      yield put({ type: 'saveComment', payload: data });
    },
    *fetchComments({ payload: taskId }, { call, put }) {
      const { data } = yield call(fetchComments, taskId);
      yield put({ type: 'saveComments', payload: { taskId, comments: data } });
    },
    *updateComment({ payload: comment }, { call, put }) {
      yield put({ type: 'saveComment', comment });
      yield call(updateComment, comment);
    },
    *deleteComment({ payload: comment }, { call, put }) {
      yield put({ type: 'deleteCommentSuccess', payload: comment });
      yield call(deleteComment, comment.id);
    },
  },
  reducers: {
    saveComment(state, { payload: comment }) {
      const comments = state[comment.taskId];
      return {
        ...state,
        [comment.taskId]: {
          ...comments,
          [comment.id]: comment
        }
      };
    },
    saveComments(state, { payload: { taskId, comments } }) {
      return {
        ...state,
        [taskId]: _.keyBy(comments, 'id')
      };
    },
    deleteCommentSuccess(state, { payload: comment }) {
      const comments = state[comment.taskId];
      return {
        ...state,
        [comment.id]: _.omit(comments, comment.id)
      };
    },
  },
};
