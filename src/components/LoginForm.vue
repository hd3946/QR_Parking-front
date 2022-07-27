<template>
  <div>
    <div class="form-wrapper form-wrapper-sm">
      <router-link to="/makeqr" class="row justify-content-center gy-5">
        <img class="col-4 p-3" src="../assets/sana.gif" alt="Main image" />
      </router-link>
      <form v-if="!isUserLogin" @submit.prevent="submitForm" class="row g-2">
        <div class="col-12 p-1">
          <b-form-input type="text" v-model="email" placeholder="계정 이메일" />
          <p v-if="!isUsernameValid && email">Please enter an email address</p>
        </div>
        <div class="col-12 p-1">
          <b-form-input
            id="password"
            type="text"
            v-model="password"
            placeholder="비밀번호"
          />
        </div>
        <div class="col-12 p-1">
          <b-button
            class="w-100"
            variant="primary"
            :disabled="!isUsernameValid || !password"
            type="submit"
          >
            로그인
          </b-button>
        </div>
        <div class="row p-1 justify-content-center">
          <button id="btnKaKao" class="col-4" type="submit">
            <img
              class="w-100"
              src="../assets/kakao_login_medium_wide.png"
              alt="카카오 로그인"
            />
          </button>
        </div>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      // form values
      email: '',
      password: '',
      // log
      logMessage: '',
    };
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    isUsernameValid() {
      return validateEmail(this.email);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          emailid: this.email,
          password: this.password,
        };
        await this.$store.dispatch('LOGIN', userData);
        this.$router.push('/myProfile');
      } catch (error) {
        // 에러 핸들링할 코드
        //console.log(error.response.data);
        //this.logMessage = error.response.data;
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style>
#btnKaKao {
  background: rgba(240, 230, 140, 0);
  border: 0;
  outline: 0;
}
</style>
