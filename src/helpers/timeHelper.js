const toTimeSpan = (estimation) => {
  const weeks = estimation.match(/(\d+)[w]/g) && estimation.match(/(\d+)[w]/g)[0].replace('w', '');
  const days = estimation.match(/(\d+)[d]/g) && estimation.match(/(\d+)[d]/g)[0].replace('d', '');
  const hours = estimation.match(/(\d+)[h]/g) && estimation.match(/(\d+)[h]/g)[0].replace('h', '');
  const minutes = estimation.match(/(\d+)[m]/g) && estimation.match(/(\d+)[m]/g)[0].replace('m', '');
  const seconds = estimation.match(/(\d+)[s]/g) && estimation.match(/(\d+)[s]/g)[0].replace('s', '');
  return `${(weeks * 40 + days * 8 + hours).toString().padStart(2, '0')}:${(minutes * 1).toString().padStart(2, '0')}:${(seconds * 1).toString().padStart(2, '0')}`;
};

const toString = (timeSpan) => {
  if (!timeSpan) {
    return '0h';
  }

  const arr = timeSpan.split(':');
  let result = '';
  if (arr[0] !== '00') {
    result += `${arr[0] * 1}h `;
  }
  if (arr[1] !== '00') {
    result += `${arr[1]}m `;
  }
  if (arr[2] !== '00') {
    result += `${arr[2]}s`;
  }
  return result;
};

const totalHours = (timeSpan) => {
  if (!timeSpan) {
    return '0';
  }

  const arr = timeSpan.split(':');
  return parseInt(arr[0]) + parseInt(arr[1]) / 60 + parseInt(arr[2]) / 3600;
};

const getTimeSpanFromHours = (hours) => {
  const totalSeconds = parseInt(parseFloat(hours) * 60);
  return `${(Math.floor(hours)).toString().padStart(2, '0')}:${(totalSeconds % 60).toString().padStart(2, '0')}:00`;
};

export const timeHelper = { toString, toTimeSpan, totalHours, getTimeSpanFromHours };
