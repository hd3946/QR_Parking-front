import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser, logoutUser } from '@/api/auth';

Vue.use(require('vue-cookies'));
Vue.use(Vuex);

const cookieUser = 'til_user';
const cookieAuth = 'til_auth';

export default new Vuex.Store({
  state: {
    username: $cookies.get(cookieUser) || '',
    token: $cookies.get(cookieAuth) || '',
    userinfo: {},
    SMS_Messages: '',
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
    getUser(state) {
      return state.username;
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
      $cookies.remove(cookieAuth);
      $cookies.remove(cookieUser);
      state.username = '';
      state.token = '';
      state.qrurl = '';
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data);
      commit('setToken', data.token);
      commit('setUsername', data.user);
      $cookies.set(cookieAuth, data.token);
      $cookies.set(cookieUser, data.user);
      return data;
    },
    async LOGOUT({ commit }) {
      await logoutUser();
      commit('clearUsername');
    },
  },
});
