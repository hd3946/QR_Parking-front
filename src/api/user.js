import { user } from './index';

// 프로필 본인 확인 API
function checkMyprofile(hashUrl) {
  return user.get(`${hashUrl}/my/profile`);
}

export { checkMyprofile };
