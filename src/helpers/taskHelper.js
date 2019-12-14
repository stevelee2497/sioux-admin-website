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

const saveTimeSheetTask = (tasks, projects, month) => {
  const involvedProjects = _.keyBy(projects, 'id');
  const timeSheetTask = _.map(tasks, value => ({
    ...value,
    key: value.id,
    boardKey: involvedProjects[value.boardId].key,
    workLogs: _.keyBy(Array.from({ length: month.daysInMonth() }).map((foo, index) => ({
      id: null,
      day: index + 1,
      amount: 0,
      taskId: value.id,
      description: ''
    })), 'day'),
  }));
  const total = {
    id: 'total',
    title: 'Total',
    workLogs: _.keyBy(Array.from({ length: month.daysInMonth() }).map((value, index) => ({
      day: index + 1,
      amount: timeSheetTask.reduce((a, b) => a + parseInt(b.workLogs[index + 1].amount), 0)
    })), 'day')
  };

  return [...timeSheetTask, total];
};

export default {
  saveWorkLog,
  saveTimeSheetTask,
};
