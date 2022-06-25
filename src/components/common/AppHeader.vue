<template>
  <header>
    <div>
      <router-link to="/" class="logo">
        노-브레끼
        <span v-if="isUserLogin">by {{ getUserNickname }}</span>
      </router-link>
    </div>
    <div class="navigations">
      <!-- 1 -->
      <template v-if="isUserLogin">
        <b-icon
          icon="plus-square"
          @click="PostForm"
          font-scale="2"
          style="color: black"
        ></b-icon>
        <b-avatar v-bind:src="getUserProfileUrl" size="2rem" />
        <a href="javascript:;" @click="logoutUser" class="logout-button">
          Logout
        </a>
      </template>
      <!-- 2 -->
      <template v-else>
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">회원가입</router-link>
      </template>
      <div><ModalPost /></div>
    </div>
  </header>
</template>

<script>
import ModalPost from '@/components/common/ModalPostForm';

export default {
  components: {
    ModalPost,
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    getUserNickname() {
      return this.$store.getters.getUser.nickname;
    },
    getUserProfileUrl() {
      return this.$store.getters.getUser.profileurl;
    },
  },
  methods: {
    async logoutUser() {
      await this.$store.dispatch('LOGOUT');
      this.$router.push('/login');
    },
    PostForm() {
      this.$bvModal.show('modal-Post');
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: yellow;
  z-index: 2;
  box-shadow: 0px 3px 10px rgba(150, 184, 47, 0.05);
}
a {
  color: pink;
  font-size: 18px;
}
a.logo {
  font-size: 30px;
  font-weight: 900;
  color: black;
}
.logo > span {
  font-size: 14px;
  font-weight: normal;
}
.navigations a {
  margin-left: 10px;
}
.fixed {
  position: fixed;
  top: 0;
  width: 100%;
}
.logout-button {
  font-size: 14px;
}
a.router-link-exact-active {
  color: black;
  font-weight: bold;
}
</style>
