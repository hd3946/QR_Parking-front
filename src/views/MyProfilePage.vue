<template>
  <div>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <div v-else>
      <ProfileInfo
        :user="userData"
        :youorme="true"
        @refresh="fetchData"
      ></ProfileInfo>
      <PostForm :posts="postData"></PostForm>
    </div>
  </div>
</template>

<script>
import ProfileInfo from '@/components/common/ProfileInfo.vue';
import PostForm from '@/components/PostForm.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { searchUserPost } from '@/api/posts';

export default {
  components: {
    ProfileInfo,
    PostForm,
    LoadingSpinner,
  },
  data() {
    return {
      userData: '',
      postData: '',
      isLoading: false,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      this.userData = this.$store.getters.getUser;
      // if (this.$store.getters.isReceiveApi) {
      //   await this.$store.dispatch('RECEIVEOTHER');
      // }
      /////////
      const { data } = await searchUserPost();
      console.log('포스트 가져오기', data);
      this.postData = data.user;
      this.isLoading = false;
    },
  },

  created() {
    if (this.$store.getters.isLogin) {
      this.fetchData();
    } else {
      alert('로그인~! 해주세요~!');
      this.$router.push('/login');
    }
  },
};
</script>

<style lang="scss" scoped></style>
