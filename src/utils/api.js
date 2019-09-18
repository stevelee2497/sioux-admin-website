import faker from 'faker';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

// #region Authentication

export const login = async () => {
  await delay(1000);
  return 'login success';
};

// #region

// #region Employee

export const fetchEmployees = async (page = 1, pageSize = 10) => {
  // const response = await api.get(`/employees?page=${page}&limit=${pageSize}`);
  const response = {
    data: {
      data: Array.from({ length: pageSize }).map(_ => ({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        avatar: `https://picsum.photos/id/${faker.random.number({ min: 1, max: 300 })}/500/500`,
        position: faker.name.jobTitle(),
        description: faker.random.words(30),
        skills: Array.from({ length: faker.random.number({ min: 1, max: 7 }) }).map(_ => faker.name.jobType())
      })),
      total: 100
    }
  };
  const { data } = response;
  return data;
};
// #endregion
