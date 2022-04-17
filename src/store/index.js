import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  getQRurlFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
  saveQRurlToCookie,
  deleteCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || '',
    qrurl: getQRurlFromCookie() || '',
    token: getAuthFromCookie() || '',
    userinfo: {},
    SMS_Messages: '',
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setToken(state, token) {
      state.token = token;
    },
    setQRurl(state, qrurl) {
      state.qrurl = qrurl;
      saveQRurlToCookie(qrurl);
    },
    setUserInfo(state, user) {
      state.userinfo = user;
    },
    setSMS(state, text) {
      if (text != '') {
        state.SMS_Messages = text;
        //state.SMS_Messages += `${text}차량좀 빼주시겠어용~💕`;
      }
    },
    //쿠키제거 확인필요~!
    clearUsername(state) {
      deleteCookie(getAuthFromCookie() || '');
      deleteCookie(getUserFromCookie() || '');
      deleteCookie(getQRurlFromCookie() || '');
      state.username = '';
      state.token = '';
      state.qrurl = '';
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data);
      //commit('setToken', data.token);
      commit('setUsername', data.user);
      //saveAuthToCookie(data.token);
      saveUserToCookie(data.user);
      return data;
    },
  },
});
