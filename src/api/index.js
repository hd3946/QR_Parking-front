import axios from 'axios';
import { setInterceptors } from './common/interceptors';

axios.defaults.baseURL = 'https://qrparking.herokuapp.com/';
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

export const instance = createInstance();
export const posts = createInstanceWithAuth('posts');
export const qrprofile = createInstanceWithAuth('qr');
export const verify = createInstanceWithAuth('verify');
