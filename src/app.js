import router from 'umi/router';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      if (err.response) {
        console.log(err.response.data.errorMessage);
      } else {
        console.log(err.message);
      }
    }
  },
};

export function render(oldRender) {
  if (localStorage.getItem('authenticated') !== 'true') {
    router.push('/login');
    console.log('not authenticated');
  }

  oldRender();
}
