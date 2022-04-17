<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
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
      <form @submit.prevent="submitForm" class="form">
        <div class="form-floating">
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
        <div class="form-floating">
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

        <div class="form-floating">
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

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingPhonenumber"
            placeholder="Phonenumber"
            v-model="phonenumber"
            required
          />
          <label for="floatingPhonenumber">휴대폰 번호</label>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingCarnumber"
            placeholder="Carnumber"
            v-model="carnumber"
          />
          <label for="floatingCarnumber">차량 번호</label>
        </div>

        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary">회원 가입</button>
        </div>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      // form values
      emailid: '',
      password: '',
      nickname: '',
      phonenumber: '',
      carnumber: '',
      // log
      logMessage: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.emailid);
    },
  },
  methods: {
    async submitForm() {
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
    },
  },
};
</script>

<style></style>
