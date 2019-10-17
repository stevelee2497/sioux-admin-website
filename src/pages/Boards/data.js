import faker from 'faker';
import _ from 'lodash';

const tasks = Array.from({ length: 50 }).map((value, index) => ({
  id: faker.random.uuid(),
  title: `task ${index + 1}`,
  content: faker.random.words(5)
}));

const columns = [
  {
    id: faker.random.uuid(),
    title: 'Backlog',
    taskIds: tasks.map(task => task.id).splice(0, 10)
  },
  {
    id: faker.random.uuid(),
    title: 'To do',
    taskIds: tasks.map(task => task.id).splice(10, 5)
  },
  {
    id: faker.random.uuid(),
    title: 'Doing',
    taskIds: tasks.map(task => task.id).splice(15, 3)
  },
  {
    id: faker.random.uuid(),
    title: 'Review',
    taskIds: tasks.map(task => task.id).splice(18, 4)
  },
  {
    id: faker.random.uuid(),
    title: 'Done',
    taskIds: []
  },
];

const initialData = {
  tasks: _.keyBy(tasks, 'id'),
  columns: _.keyBy(columns, 'id'),
  columnOrder: columns.map(col => col.id)
};

export default initialData;
