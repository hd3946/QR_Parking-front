<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">id: </label>
          <input id="username" type="text" v-model="username" />
        </div>
        <button type="submit" class="btn btn-primary">만들기</button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { makeQR } from '@/api/qrprofile';

export default {
  data() {
    return {
      // form values
      username: '',
      // log
      logMessage: '',
    };
  },
  methods: {
    async submitForm() {
      const userData = {
        emailid: this.username,
      };
      const { data } = await makeQR(userData);
      console.log(data.user);
      this.logMessage = `${data.user} 님이 가입되었습니다`;
      this.initForm();
      //this.$router.push('/login');
    },
    initForm() {
      this.username = '';
    },
    async submitverify() {},
  },
};
</script>

<style></style>
