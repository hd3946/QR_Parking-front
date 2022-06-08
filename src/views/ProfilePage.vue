<template>
  <div>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <div v-else>
      <ProfileInfo :userData="userData" @refresh="fetchData"></ProfileInfo>
    </div>
  </div>
</template>

<script>
import ProfileInfo from '@/components/contacts/ProfileInfo.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { seeProfile } from '@/api/qrprofile';
import { checkMyprofile } from '@/api/user';

export default {
  components: {
    ProfileInfo,
    LoadingSpinner,
  },
  data() {
    return {
      id: '',
      userData: [],
      isLoading: false,
    };
  },
  methods: {
    setMessage(text) {
      if (text != '') this.message = `${text}차량좀 빼주시겠어용~💕`;
      else this.message = '차좀 빼주시겠어용~💕';
    },
    async CheckUandI() {
      console.log('데이터확인', this.userData.exist);
      //유저등록된 상태
      if (this.userData.exist) {
        this.setMessage(this.userData.user.carnumber);
        this.$store.commit('setUserInfo', this.userData.user);
        if (this.$store.getters.isLogin) {
          const { data } = await checkMyprofile(this.id);
          console.log('check-profile', data);
          if (data.status) {
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
      this.userData = data;
      this.isLoading = false;
    },
  },

  created() {
    this.fetchData();
    this.CheckUandI();
  },
};
</script>

<style lang="scss" scoped></style>
