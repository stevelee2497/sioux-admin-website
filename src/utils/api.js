const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const login = async () => {
  await delay(500);
  return 'login success';
};
