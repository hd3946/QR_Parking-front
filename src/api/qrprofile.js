import { qrprofile } from './index';

// QRURL 생성 API
function makeQR(userData) {
  return qrprofile.post(`/make`, userData);
}

// QRURl에 해당하는 유저 조회 API
function seeProfile(hashUrl) {
  return qrprofile.get(hashUrl + '/profile');
}

export { makeQR, seeProfile };
