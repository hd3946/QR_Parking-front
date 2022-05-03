import { verify } from './index';

//인증번호 받기
function receiveVerify(phonenumber) {
  return verify.post('/sendphonenumber', phonenumber);
}
// 인증번호 확인
function sendVerifyCheck(verificationCode) {
  return verify.post('/checkverificationcode', verificationCode);
}

export { receiveVerify, sendVerifyCheck };
