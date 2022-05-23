// 로그인, 회원 가입, (ex) 회원 탈퇴
import { auth } from './index';

// 회원가입 API
function registerUser(userData) {
  return auth.post('signup', userData);
}

// 로그인 API
function loginUser(userData) {
  return auth.post('login', userData);
}

// 로그아웃 API
function logoutUser() {
  return auth.post('logout');
}

export { registerUser, loginUser, logoutUser };
