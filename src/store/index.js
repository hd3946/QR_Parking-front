import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser, logoutUser } from '@/api/auth';
import { receiveMyprofile } from '@/api/user';

Vue.use(require('vue-cookies'));
Vue.use(Vuex);

const cookieUser = 'til_user';
const cookieToken = 'til_token';

export default new Vuex.Store({
  state: {
    user: $cookies.get(cookieUser) || '', //로그인 유저
    token: $cookies.get(cookieToken) || '',
    OtherUser: '',
    snsId: '',
    carnumber: '',
    phonenumber: '',
    profileurl: '',
    SMS_Messages: '',
  },
  getters: {
    isLogin(state) {
      return state.user !== '';
    },
    isReceiveApi(state) {
      return state.phonenumber === '';
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      $cookies.set(cookieUser, user);
    },
    setToken(state, token) {
      state.token = token;
      $cookies.set(cookieToken, token);
    },
    setSNSid(state, snsId) {
      state.snsId = snsId;
    },
    setCarnumber(state, carnumber) {
      state.carnumber = carnumber;
    },
    setPhonenumber(state, phonenumber) {
      state.phonenumber = phonenumber;
    },
    setProfileurl(state, profileurl) {
      state.profileurl = profileurl;
    },
    setQRurl(state, qrurl) {
      state.qrurl = qrurl;
    },
    setSMS(state, text) {
      if (text != '') {
      }
      state.SMS_Messages = `${text}차량좀 빼주시겠어용~💕`;
    },
    //쿠키제거 확인필요~!
    clearUsername(state) {
      $cookies.remove(cookieToken);
      $cookies.remove(cookieUser);
      state.user = '';
      state.token = '';
      state.qrurl = '';
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      commit('setToken', data.token);
      commit('setUser', data.user);
    },
    async LOGOUT({ commit }) {
      commit('clearUsername');
      await logoutUser();
    },
    async RECEIVEOTHER({ commit }) {
      // const { data } = await receiveMyprofile();
      // commit('OtherUser', data);
      // commit('setSNSid', data.user.snsId);
      // commit('setCarnumber', data.user.carnumber);
      // commit('setPhonenumber', data.user.phonenumber);
      // commit('setProfileurl', data.user.profileurl);
    },
  },
});
