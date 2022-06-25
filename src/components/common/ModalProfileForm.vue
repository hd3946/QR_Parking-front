<template>
  <b-modal id="modal-profileimage" size="sm" centered>
    <template #modal-header>
      <div class="w-100 text-center">
        <h5>프로필 사진 바꾸기</h5>
      </div>
    </template>
    <div class="text-center" @click="clickProfile()"><h5>사진 업로드</h5></div>
    <input
      class="form-control"
      type="file"
      id="imageUpload"
      ref="selectFile"
      accept="image/*"
      @change="fileUpload($event)"
      hidden
    />
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
import { PostUserProfile } from '@/api/posts';

export default {
  methods: {
    close() {
      this.$bvModal.hide('modal-profileimage');
    },
    clickProfile() {
      document.getElementById('imageUpload').click();
    },
    async fileUpload() {
      // 선택된 파일이 있는가?
      if (0 < this.$refs.selectFile.files.length) {
        // 0 번째 파일을 가져 온다.
        this.selectFile = this.$refs.selectFile.files[0];
        // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
        let fileExt = this.selectFile.name.substring(
          this.selectFile.name.lastIndexOf('.') + 1,
        );
        // 소문자로 변환
        fileExt = fileExt.toLowerCase();
        // 이미지 확장자 체크, 5메가 바이트 이하 인지 체크 && this.selectFile.size <= 15 * 1024 * 1024
        if (['jpeg', 'png', 'gif', 'bmp'].includes(fileExt)) {
        } else {
          alert('파일을 다시 선택해 주세요.');
          this.selectFile = null;
          return;
        }
        const { data } = await PostUserProfile(this.selectFile);
        if (data.status) {
          alert('업로드 성공');
          this.$router.push('/myProfile');
        } else {
          alert('에러 발생');
        }
        close();
      } else {
        // 파일을 선택하지 않았을때
        this.selectFile = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
