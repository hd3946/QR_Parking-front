<template>
  <div>
    <div class="form-wrapper">
      <div class="d-grid gap-2">
        <button class="btn btn-link" type="submit">
          <img
            src="../assets/kakao_login_medium_wide.png"
            class="img-fluid"
            alt="카카오 로그인"
          />
        </button>
      </div>
      <hr />
      <form class="form">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="emailid"
            required
          />
          <label for="floatingInput">이메일 주소</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="비밀번호"
            v-model="password"
            required
          />
          <label for="floatingPassword">비밀번호</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingconfirmPassword"
            placeholder="비밀번호"
            v-model="confirmPassword"
            required
          />
          <label for="floatingconfirmPassword">비밀번호 확인</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingNickname"
            placeholder="Nickname"
            v-model="nickname"
            required
          />
          <label for="floatingNickname">프로필 이름</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingCarnumber"
            placeholder="Carnumber"
            v-model="carnumber"
          />
          <label for="floatingCarnumber">차량 번호(선택 사항)</label>
        </div>
      </form>

      <div class="input-group input-group-lg mb-3" :disabled="verifycheck">
        <span class="input-group-text" id="basic-addon1">
          <b-icon icon="phone"></b-icon>
        </span>

        <input
          type="tel"
          class="form-control"
          placeholder="휴대폰 번호"
          aria-label="Username"
          aria-describedby="basic-addon1"
          :style="[!verifycheck ? onPhoneClass : outPhoneClass]"
          v-model="phonenumber"
        />
        <button
          type="submit"
          class="btn btn-outline-secondary"
          @click="submitReceiveVerify"
        >
          인증
        </button>
      </div>

      <div
        class="input-group input-group-lg mb-3"
        :hidden="verifyhide"
        :disabled="verifycheck"
      >
        <input
          type="text"
          class="form-control"
          placeholder="인증 번호"
          aria-describedby="basic-addon1"
          v-model="verificationcode"
        />
        <button
          type="submit"
          class="btn btn-outline-secondary"
          @click="submitSendVerifyCheck"
        >
          확인
        </button>
      </div>

      <div class="d-grid gap-2">
        <button type="submit" class="btn btn-primary" @click="submitForm">
          회원 가입
        </button>
      </div>

      <p class="d-grid gap-2" style="color: #ff4057; text-align: center">
        {{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';
import { receiveVerify, sendVerifyCheck } from '@/api/verify';
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      // form values
      emailid: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      phonenumber: '',
      carnumber: '',
      // log
      logMessage: '',
      //verify
      verifyhide: true,
      verificationcode: '',
      verifycheck: true,
      onPhoneClass: { color: 'pink' },
      outPhoneClass: { color: 'red' },
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.emailid);
    },
  },
  methods: {
    //서버로 휴대폰번호 전송 인증번호받기
    async submitReceiveVerify() {
      const userData = {
        phonenumber: this.phonenumber,
      };
      const status = await receiveVerify(userData);
      if (status) {
        this.verifyhide = false;
      } else {
        this.logMessage = '휴대폰 번호 error 발생';
      }
    },
    //서버로 인증번호 전송
    async submitSendVerifyCheck() {
      const userData = {
        phonenumber: this.phonenumber,
        verificationcode: this.verificationcode,
      };
      const status = await sendVerifyCheck(userData);
      if (status) {
        this.verifycheck = true;
      } else {
        this.logMessage = '인증 error 발생';
      }
    },
    async submitForm() {
      if (this.password !== this.confirmPassword) {
        this.logMessage = 'Password does not match.';
        return;
      }
      if (!this.verifycheck) {
        this.logMessage = '휴대폰 인증을 해주세요~!';
        return;
      }
      const userData = {
        emailid: this.emailid,
        password: this.password,
        nickname: this.nickname,
        phonenumber: this.phonenumber,
        carnumber: this.carnumber,
        qrurl: this.$store.state.qrurl,
      };
      console.log('회원가입 페이지', userData.qrurl);
      const { data } = await registerUser(userData);
      this.logMessage = `${data.user} 님이 가입되었습니다`;
      this.initForm();
      this.$router.push(`/login`);
    },
    initForm() {
      this.emailid = '';
      this.password = '';
      this.nickname = '';
      this.phonenumber = '';
      this.carnumber = '';
      this.verifyhide = true;
      this.verifycheck = false;
    },
  },
};
</script>

<style></style>
