import faker from 'faker';
import moment from 'moment';
import axios from 'axios';
import { ROLE, APP_CONSTANTS } from './constants';

export const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const api = axios.create({
  baseURL: APP_CONSTANTS.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
});

const fakeUser = () => ({
  id: faker.random.uuid(),
  fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
  avatar: `https://picsum.photos/id/${faker.random.number({ min: 1, max: 300 })}/500/500`,
  position: faker.name.jobTitle(),
  location: `${faker.address.city()}, ${faker.address.countryCode()}`,
  address: faker.address.streetAddress(),
  description: faker.random.words(30),
  skills: Array.from({ length: faker.random.number({ min: 1, max: 7 }) }).map(_ => faker.name.jobType()),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  socialLink: faker.internet.url(),
  birthDate: faker.date.past(),
  gender: faker.random.boolean() ? 'Male' : 'Female',
  role: faker.random.boolean() ? ROLE.ADMIN : ROLE.EMPLOYEE,
  timeline: Array.from({ length: faker.random.number({ min: 2, max: 4 }) }).map(_ => `${faker.random.words(4)} in ${moment(faker.date.past()).format('DD/MM/YYYY')}`),
});

// #region Authentication

export const login = async (authDto) => {
  const response = await api.post('/users/login', authDto);
  const { data } = response;
  return data;
};

// #region

// #region Employee

export const fetchEmployees = async (page = 1, pageSize = 10) => {
  // const response = await api.get(`/employees?page=${page}&limit=${pageSize}`);
  const response = {
    data: {
      data: Array.from({ length: pageSize }).map(_ => fakeUser()),
      total: 100
    }
  };
  await delay(1000);
  const { data } = response;
  return data;
};

export const fetchEmployee = async (id) => {
  const response = await api.get(`/users/${id}`);
  const { data } = response;
  return data;
};

export const updateEmployee = async (employee) => {
  console.log(employee);
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
