<template>
  <b-modal id="modal-Post" size="lg" centered>
    <template #modal-header>
      <div class="w-100 text-center">
        <h5>새 게시물 만들기</h5>
      </div>
    </template>
    <div>
      <p class="my-4">사진과 동영상을 여기다 끌어다 놓으세요</p>
      <b-avatar src="../../assets/phone_640.png" size="20rem"></b-avatar>
      <b-button variant="primary" @click="clickProfile()">선택하기</b-button>
      <input
        class="form-control"
        type="file"
        id="imageUpload"
        ref="selectFile"
        accept="image/*"
        @change="fileUpload2($event)"
        hidden
      />
    </div>
    <template #modal-footer><p></p></template>
  </b-modal>
</template>

<script>
import { fileUpload } from '@/utils/fileupload';
import { createPostUser } from '@/api/posts';

export default {
  methods: {
    close() {
      this.$bvModal.hide('modal-Post');
    },
    clickProfile() {
      //console.log('클릭');
      document.getElementById('imageUpload').click();
    },
    async fileUpload2() {
      const selectFile = await fileUpload(this.$refs.selectFile);
      //console.log('dd', selectFile);
      const { data } = await createPostUser(selectFile);
      if (data.status) {
        alert('업로드 성공');
        this.$router.push('/myProfile');
      } else {
        alert('에러 발생');
      }
      //close();
    },
  },
};
</script>

<style></style>
