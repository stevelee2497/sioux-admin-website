import router from 'umi/router';
import { notification } from 'antd';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      if (err.response) {
        notification.error({
          message: err.response.statusText,
          description: err.response.data.errorMessage,
        });
      } else {
        notification.error({
          message: 'Ops',
          description: err.message,
        });
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
