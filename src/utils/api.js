import faker from 'faker';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

// #region Authentication

export const login = async () => {
  const response = {
    data: {
      data: {
        token: 'success',
        profile: {
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
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
          gender: faker.random.boolean() ? 'Male' : 'Female'
        }
      },
    }
  };
  await delay(1000);
  const { data } = response;
  return data;
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
        location: `${faker.address.city()}, ${faker.address.countryCode()}`,
        address: faker.address.streetAddress(),
        description: faker.random.words(30),
        skills: Array.from({ length: faker.random.number({ min: 1, max: 7 }) }).map(_ => faker.name.jobType()),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        socialLink: faker.internet.url(),
        birthDate: faker.date.past(),
        gender: faker.random.boolean() ? 'Male' : 'Female'
      })),
      total: 100
    }
  };
  await delay(1000);
  const { data } = response;
  return data;
};
// #endregion
