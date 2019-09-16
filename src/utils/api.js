const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const login = async () => {
  await delay(1000);
  return 'login success';
};
