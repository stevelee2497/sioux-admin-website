import moment from 'moment';
import _ from 'lodash';
import { timeHelper } from './timeHelper';

const saveWorkLog = (state, workLog) => {
  const task = state[workLog.taskId];
  return {
    ...state,
    [workLog.taskId]: {
      ...task,
      workLogs: {
        ...task.workLogs,
        [moment(workLog.dateLog).dates()]: {
          id: workLog.id,
          day: moment(workLog.dateLog).dates(),
          amount: timeHelper.totalHours(workLog.amount),
          taskId: workLog.taskId,
          description: workLog.description
        }
      },
    }
  };
};

const saveTimeSheetTask = (tasks, projects) => {
  const involvedProjects = _.keyBy(projects, 'id');
  return _.map(tasks, value => ({
    ...value,
    key: value.id,
    boardKey: involvedProjects[value.boardId].key,
    workLogs: _.keyBy(Array.from({ length: moment().daysInMonth() }).map((foo, index) => ({
      id: null,
      day: index + 1,
      amount: 0,
      taskId: value.id,
      description: ''
    })), 'day'),
  }));
};

export default {
  saveWorkLog,
  saveTimeSheetTask,
};
