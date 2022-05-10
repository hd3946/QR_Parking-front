<template>
  <div>
    <!-- <LoadingSpinner v-if="isLoading"></LoadingSpinner> -->
    <!-- <ul>
        <PostListItem
          v-for="postItem in postItems"
          :key="postItem._id"
          :postItem="postItem"
          @refresh="fetchData"
        ></PostListItem>
      </ul> -->
    <ProfileInfo />

    <router-link to="/add" class="create-button">
      <i class="ion-md-add"></i>
    </router-link>
  </div>
</template>

<script>
//import PostListItem from '@/components/posts/PostListItem.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import ProfileInfo from '@/components/contacts/ProfileInfo.vue';
import { fetchPosts } from '@/api/posts';

export default {
  components: {
    ProfileInfo,
    // PostListItem,
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
      const { data } = await fetchPosts();
      this.isLoading = false;
      this.postItems = data.posts;
    },
  },
  created() {},
};
</script>

<style></style>
