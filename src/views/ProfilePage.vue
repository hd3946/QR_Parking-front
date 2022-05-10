<template>
  <div>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <div v-else>
      <ProfileInfo :userData="userData" @refresh="fetchData"></ProfileInfo>
    </div>
    <hr />
  </div>
</template>

<script>
import ProfileInfo from '@/components/contacts/ProfileInfo.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { seeProfile } from '@/api/qrprofile';

export default {
  components: {
    ProfileInfo,
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
      const id = this.$route.params.id;
      this.$store.commit('setQRurl', id);
      const { data } = await seeProfile(id);
      this.isLoading = false;
      this.userData = data;
    },
  },
  async created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped></style>
