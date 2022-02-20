<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <div class="image-wrapper">
        <img class="imgMain" src="../assets/sana.gif" alt="Main image" />
      </div>
      <form @submit.prevent="submitForm" class="form">
        <div>
          <b-form-input
            id="id"
            type="text"
            v-model="username"
            placeholder="계정 이메일"
          />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && username">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <b-form-input
            id="password"
            type="text"
            v-model="password"
            placeholder="비밀번호"
          />
        </div>
        <div>
          <b-button
            id="btnLogin"
            variant="primary"
            :disabled="!isUsernameValid || !password"
            type="submit"
          >
            로그인
          </b-button>
        </div>
        <div class="kakao">
          <button id="btnKaKao" type="submit">
            <img
              class="img"
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
import { validateEmail } from "@/utils/validation";

export default {
  data() {
    return {
      // form values
      username: "",
      password: "",
      // log
      logMessage: "",
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          username: this.username,
          password: this.password,
        };
        await this.$store.dispatch("LOGIN", userData);
        this.$router.push("/main");
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
        this.logMessage = error.response.data;
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style>
#btnLogin {
  margin-top: 30px;
  width: 100%;
}
#btnKaKao {
  align-content: center;
  margin-top: 30px;
  background: rgba(240, 230, 140, 0);
  border: 0;
  outline: 0;
}
.kakao {
  align-content: center;
  text-align: center;
}
.image-wrapper {
  text-align: center;
  margin-bottom: 30px;
}
.imgMain {
  width: 50%;
  height: 50%;
}
</style>
