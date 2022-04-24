<template>
  <b-modal id="modal-profileimage" size="sm" centered>
    <template #modal-header>
      <div class="w-100 text-center"><h5>프로필 사진 바꾸기</h5></div>
    </template>
    <div class="text-center"><h5>사진 업로드</h5></div>
    <hr />
    <div class="text-center"><h5>현재 사진 삭제</h5></div>
    <template #modal-footer>
      <div class="w-100 text-center" @click="close()">
        <h5>취소</h5>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  methods: {
    close() {
      this.$bvModal.hide('modal-profileimage');
    },
  },
};
</script>

<style lang="scss" scoped></style>
