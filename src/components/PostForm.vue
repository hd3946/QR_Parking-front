<template>
  <div>
    <b-container
      ref="notification-list"
      @scroll="handleNotificationListScroll"
      fluid
      class="p-1 bg-dark"
    >
      <b-row>
        <b-col v-for="작명 in 메뉴들" :key="작명" class="col-4">
          <b-img-lazy
            thumbnail
            v-bind="mainProps"
            :src="작명"
            class="img"
            alt="..."
          ></b-img-lazy>
        </b-col>
        <b-col v-for="post in posts" :key="post.id" class="col-4">
          <b-img-lazy
            thumbnail
            v-bind="mainProps"
            :src="post.img"
            class="img"
            alt="..."
          ></b-img-lazy>
        </b-col>
      </b-row>
    </b-container>
  </div>
  <!-- 
    <p class="h4 mb-2">
        <b-icon icon="suit-heart" style="color: red"></b-icon>
        <b-icon icon="chat-text" style="color: black"></b-icon>
        <b-icon icon="share-fill" style="color: black"></b-icon>
    </p> -->
</template>

<script>
import { searchUserPost } from '@/api/posts';
export default {
  props: {
    posts: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      mainProps: {
        fluidGrow: true,
        blank: true,
        class: 'my-1',
      },
      메뉴들: [
        'http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg',
        'https://picsum.photos/400/400/?image=42',
        'https://picsum.photos/400/400/?image=43',
        'https://picsum.photos/400/400/?image=44',
        'https://picsum.photos/400/400/?image=45',
        'https://picsum.photos/400/400/?image=46',
        'https://picsum.photos/400/400/?image=47',
        'https://picsum.photos/400/400/?image=48',
        'https://picsum.photos/400/400/?image=50',
        'https://picsum.photos/1024/400/?image=41',
        'https://picsum.photos/400/400/?image=1',
        'https://picsum.photos/300/1024/?image=41',
      ],
    };
  },
  async created() {
    window.addEventListener('scroll', this.handleNotificationListScroll);
    // const { data } = await searchUserPost();
    // console.log('포스트 가져오기', data.url);
    //this.메뉴들[12] = data.url;
    //console.log('ㅇ', this.메뉴들);
  },
  methods: {
    // 무한 스크롤 정의
    handleNotificationListScroll(e) {
      console.log('스크롤 실행');
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      // 일정 한도 밑으로 내려오면 함수 실행
      if (isAtTheBottom) this.handleLoadMore();
    },

    // 내려오면 api 호출하여 아래에 더 추가, total값 최대이면 호출 안함
    handleLoadMore() {
      if (this.notifications.length < this.total) {
        const params = {
          limit: this.params.limit,
          page: this.params.page + 1,
        };
        console.log('이거머임', params);
        // this.$store.commit(
        //   'notification/SET_PARAMS',
        //   this.filterValue ? { ...params, type: this.filterValue } : params,
        // );
        this.dispatchGetNotifications(false);
      }
    },

    // 스크롤을 맨위로 올리고 싶을 때
    handleClickTitle() {
      this.$refs['notification-list'].scroll({ top: 0, behavior: 'smooth' });
    },

    // 새로고침
    handleClickRefresh() {
      this.$refs['notification-list'].scroll({ top: 0 });
      this.dispatchGetNotifications(true);
    },

    // 처음 렌더링시 이전 알림 불러오기 or reset=true시 새로고침, false시 이전 목록에 추가
    dispatchGetNotifications(reset) {
      this.$store.dispatch('notification/getNotifications', reset);
    },
  },
};
</script>

<style>
.img {
  height: 250px;
}
</style>
