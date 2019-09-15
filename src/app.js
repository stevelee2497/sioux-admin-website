const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
  initialState: {
    authenticated: false,
    token: '',
  },
};
export default dva;
