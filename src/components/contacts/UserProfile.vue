<template>
  <ul>
    <li class="call-image" @click="callUser()">
      <div class="post-title">통화</div>
      <div class="post-contents"></div>
    </li>
    <li class="message-image">
      <div class="post-title">메시지 전달</div>
      <div class="post-contents"></div>
    </li>
    <li class="follow-image">
      <div class="post-title">팔로우</div>
      <div class="post-contents"></div>
    </li>
  </ul>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.call-image {
  background-size: cover;
  background-image: url('../../assets/phone_640.png');
  background-repeat: no-repeat;
}
.message-image {
  background-size: cover;
  background-image: url('../../assets/mail_640.png');
  background-repeat: no-repeat;
}
.follow-image {
  background-size: cover;
  background-image: url('../../assets/follow_640.png');
  background-repeat: no-repeat;
}
</style>
