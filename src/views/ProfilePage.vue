<template>
  <div>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <div v-else>
      <ProfileInfo :youorme="youorme" @refresh="fetchData"></ProfileInfo>
    </div>
  </div>
</template>

<script>
import ProfileInfo from '@/components/common/ProfileInfo.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { findUser, seeProfile } from '@/api/qrprofile';
import { checkMyprofile } from '@/api/user';

export default {
  components: {
    ProfileInfo,
    LoadingSpinner,
  },
  data() {
    return {
      id: '',
      youorme: false,
      isLoading: false,
    };
  },
  methods: {
    async findUser() {
      const { data } = await findUser(this.id);
      console.log('새로만들기', data);
    },
    async CheckUandI() {
      //유저등록된 상태
      if (this.userData.exist) {
        if (this.$store.getters.isLogin) {
          const { data } = await checkMyprofile(this.id);
          console.log('check-profile', data);
          if (data.youorme) {
            this.$router.push(`/myProfile`);
          }
        }
      } else {
        //유저등록안된 상태 => 유저등록화면
        this.$router.push(`/signup`);
      }
    },
    async fetchData() {
      this.isLoading = true;
      this.id = this.$route.params.id;
      this.$store.commit('setQRurl', this.id);
      const { data } = await seeProfile(this.id);
      this.userData = data.user;
      this.isLoading = false;
    },
  },

  async created() {
    this.isLoading = true;
    this.id = this.$route.params.id;
    await this.findUser();
    this.isLoading = false;
    //await this.fetchData();
    //await this.CheckUandI();
  },
};
</script>

<style lang="scss" scoped></style>
