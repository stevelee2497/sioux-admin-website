import axios from 'axios';
import { APP_CONSTANTS } from './constants';

export const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const api = axios.create({
  baseURL: APP_CONSTANTS.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
});

// #region Authentication

export const login = async (authDto) => {
  const response = await api.post('/users/login', authDto);
  const { data } = response;
  return data;
};

// #endregion

// #region Employee

export const fetchEmployees = async (page = 1, pageSize = 10, positionId, skillIds, name) => {
  const response = await api.get(`/users?name=${name}&positionId=${positionId}&skillIds=${skillIds}`);
  const { data } = response;
  return data;
};

export const fetchEmployee = async (id) => {
  const response = await api.get(`/users/${id}`);
  const { data } = response;
  return data;
};

export const createEmployee = async (employee) => {
  const response = await api.post('/users', employee);
  const { data } = response;
  return data;
};

export const updateEmployee = async (employee) => {
  const response = await api.put(`/users/${employee.id}`, employee);
  const { data } = response;
  return data;
};

// #endregion

// #region Position

export const fetchPositions = async () => {
  const response = await api.get('/positions');
  const { data } = response;
  return data;
};

export const createNewPosition = async (name) => {
  const response = await api.post('/positions', { name });
  const { data } = response;
  return data;
};

export const deletePosition = async (id) => {
  const response = await api.delete(`/positions/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region Skill

export const fetchSkills = async () => {
  const response = await api.get('/skills');
  const { data } = response;
  return data;
};

export const createNewSkill = async (name) => {
  const response = await api.post('/skills', { name });
  const { data } = response;
  return data;
};

export const addUserSkill = async (userSkill) => {
  const response = await api.post('/userSkills', userSkill);
  const { data } = response;
  return data;
};

export const getUserSkills = async (id) => {
  const response = await api.get(`/userSkills?userId=${id}`);
  const { data } = response;
  return data;
};

export const removeUserSkills = async (id) => {
  const response = await api.delete(`/userSkills/${id}`);
  const { data } = response;
  return data;
};

export const deleteSkill = async (id) => {
  const response = await api.delete(`/skills/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region TimeLineEvent

export const addTimeLineEvent = async (event) => {
  const response = await api.post('/timeLineEvents', event);
  const { data } = response;
  return data;
};

export const getTimeLineEvents = async (userId) => {
  const response = await api.get(`/timeLineEvents?userId=${userId}`);
  const { data } = response;
  return data;
};

export const removeTimeLineEvents = async (id) => {
  const response = await api.delete(`/timeLineEvents/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region Project (Board table)

export const createBoard = async (board) => {
  const response = await api.post('/boards', board);
  const { data } = response;
  return data;
};

export const fetchBoard = async (id) => {
  const response = await api.get(`/boards/${id}`);
  const { data } = response;
  return data;
};

export const fetchBoards = async (userId) => {
  const response = await api.get(`/boards?userId=${userId}`);
  const { data } = response;
  return data;
};

export const updateBoard = async (board) => {
  const response = await api.put(`/boards/${board.id}`, board);
  const { data } = response;
  return data;
};

export const deleteBoard = async (id) => {
  const response = await api.delete(`/boards/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region Board User

export const addBoardMember = async (boardUser) => {
  const response = await api.post('/boardUsers', boardUser);
  const { data } = response;
  return data;
};

export const removeBoardMember = async (id) => {
  const response = await api.delete(`/boardUsers/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region TaskAssignee

export const assignTask = async (taskAssignee) => {
  const response = await api.post('/taskAssignees', taskAssignee);
  const { data } = response;
  return data;
};

export const unAssignTask = async (id) => {
  const response = await api.delete(`/taskAssignees/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region Phase

export const createPhase = async (phase) => {
  const response = await api.post('/phases', phase);
  const { data } = response;
  return data;
};

export const fetchPhase = async (id) => {
  const response = await api.get(`/phases/${id}`);
  const { data } = response;
  return data;
};

export const fetchPhases = async (boardId) => {
  const response = await api.get(`/phases?boardId=${boardId}`);
  const { data } = response;
  return data;
};

export const updatePhase = async (board) => {
  const response = await api.put(`/phases/${board.id}`, board);
  const { data } = response;
  return data;
};

export const deletePhase = async (id) => {
  const response = await api.delete(`/phases/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region Task

export const createTask = async (task) => {
  const response = await api.post('/tasks', task);
  const { data } = response;
  return data;
};

export const fetchTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  const { data } = response;
  return data;
};

export const fetchTasks = async (boardId, memberId) => {
  const response = await api.get(`/tasks?boardId=${boardId}&memberId=${memberId}`);
  const { data } = response;
  return data;
};

export const updateTask = async (task) => {
  const response = await api.put(`/tasks/${task.id}`, task);
  const { data } = response;
  return data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region Label

export const createLabel = async (label) => {
  const response = await api.post('/labels', label);
  const { data } = response;
  return data;
};

export const fetchLabel = async (id) => {
  const response = await api.get(`/labels/${id}`);
  const { data } = response;
  return data;
};

export const fetchLabels = async (boardId) => {
  const response = await api.get(`/labels?boardId=${boardId}`);
  const { data } = response;
  return data;
};

export const updateLabel = async (label) => {
  const response = await api.put(`/labels/${label.id}`, label);
  const { data } = response;
  return data;
};

export const deleteLabel = async (id) => {
  const response = await api.delete(`/labels/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region Task Label

export const addTaskLabel = async (taskLabel) => {
  const response = await api.post('/taskLabels', taskLabel);
  const { data } = response;
  return data;
};

export const removeTaskLabel = async (id) => {
  const response = await api.delete(`/taskLabels/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region WorkLogs

export const logWork = async (workLog) => {
  const response = await api.post('/workLogs', workLog);
  const { data } = response;
  return data;
};

export const fetchWorkLogs = async (userId) => {
  const response = await api.get(`/workLogs?userId=${userId}`);
  const { data } = response;
  return data;
};

export const updateWorkLog = async (workLog) => {
  const response = await api.put(`/workLogs/${workLog.id}`, workLog);
  const { data } = response;
  return data;
};

// #endregion

// #region TaskAction

export const getTaskActions = async (taskId) => {
  const response = await api.get(`/taskActions?taskId=${taskId}`);
  const { data } = response;
  return data;
};

export const createTaskAction = async (action) => {
  const response = await api.post('/taskActions', action);
  const { data } = response;
  return data;
};

export const deleteTaskAction = async (id) => {
  const response = await api.delete(`/taskActions/${id}`);
  const { data } = response;
  return data;
};

// #endregion

// #region Comment

export const createComment = async (comment) => {
  const response = await api.post('/comments', comment);
  const { data } = response;
  return data;
};

export const fetchComment = async (id) => {
  const response = await api.get(`/comments/${id}`);
  const { data } = response;
  return data;
};

export const fetchComments = async (taskId) => {
  const response = await api.get(`/comments?taskId=${taskId}`);
  const { data } = response;
  return data;
};

export const updateComment = async (comment) => {
  const response = await api.put(`/comments/${comment.id}`, comment);
  const { data } = response;
  return data;
};

export const deleteComment = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  const { data } = response;
  return data;
};

// #endregion
