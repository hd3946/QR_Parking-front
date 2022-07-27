<template>
  <div>
    <!-- <LoadingSpinner v-if="isLoading"></LoadingSpinner> -->
    <ProfileInfo />

    <router-link to="/add" class="create-button">
      <i class="ion-md-add"></i>
    </router-link>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import ProfileInfo from '@/components/common/ProfileInfo.vue';

export default {
  components: {
    ProfileInfo,
    // LoadingSpinner,
  },
  data() {
    return {
      postItems: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      //const { data } = await fetchPosts();
      this.isLoading = false;
    },
  },
  created() {},
};
</script>

<style></style>
