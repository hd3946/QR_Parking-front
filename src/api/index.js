import axios from 'axios';
import { setInterceptors } from './common/interceptors';

axios.defaults.withCredentials = true; // in the frontend
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

// 액시오스 초기화 함수
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}
console.log('현재 APP-URL', process.env.VUE_APP_API_URL);

export const instance = createInstance();
export const auth = createInstanceWithAuth('auth');
export const user = createInstanceWithAuth('user');
export const posts = createInstanceWithAuth('posts');
export const qr = createInstanceWithAuth('qr');
export const verify = createInstanceWithAuth('verify');
