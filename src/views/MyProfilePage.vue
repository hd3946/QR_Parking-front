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
// import { seeProfile } from '@/api/qrprofile';

export default {
  components: {
    // ProfileInfo,
    LoadingSpinner,
  },
  data() {
    return {
      userData: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      const id = this.$store.getters.getUser;
      console.log('나의계정 id', id);
      //const { data } = await seeProfile(id);
      this.isLoading = false;
      //this.userData = data;
    },
  },

  created() {
    if (this.$store.getters.isLogin) {
      this.fetchData();
    } else {
      alert('로그인~!');
    }
  },
};
</script>

<style lang="scss" scoped></style>
