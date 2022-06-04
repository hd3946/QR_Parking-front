import { user } from './index';

// 프로필 QR을통해 접속후 본인 확인 API
function checkMyprofile(hashUrl) {
  return user.get(`${hashUrl}/my/profile`);
}
// 나의 프로필 페이지 접속
function receiveMyprofile() {
  return user.get(`/myProfile`);
}

export { checkMyprofile, receiveMyprofile };
