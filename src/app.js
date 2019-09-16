import router from 'umi/router';

const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

export function render(oldRender) {
  if (localStorage.getItem('authenticated') !== 'true') {
    router.push('/login');
    console.log('not authenticated');
  }

  oldRender();
}

export default dva;
