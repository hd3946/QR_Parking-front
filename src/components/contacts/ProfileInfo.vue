<template>
  <div class="contents">
    <div class="row my-3 align-items-center">
      <div class="col-4" @click="clickProfile()">
        <img
          v-bind:src="profileImage"
          class="profile-img"
          alt="hello"
          @error="replaceByDefault"
        />
        <input
          class="form-control"
          type="file"
          id="imageUpload"
          ref="selectFile"
          accept="image/*"
          @change="fileUpload($event)"
          hidden
        />
      </div>
      <div class="col-auto">
        <h4 class="font-weight-bold">{{ userData.user.nickname }} 님의 계정</h4>
        <p class="fs-6">안녕하세요~</p>
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-outline-primary my-2 my-sm-0">
          프로필 편집
        </button>
      </div>
    </div>
    <hr />
    <div class="row" :hidden="youAndme">
      <div class="col text-center" @click="callUser()">
        <h6 class="font-weight-bold">통화</h6>
        <img
          src="../../assets/phone_640.png"
          class="rounded img-thumbnail"
          alt="..."
        />
      </div>
      <div class="col text-center" @click="sendSMS()">
        <h6 class="font-weight-bold">메시지 전달</h6>
        <img src="../../assets/mail_640.png" class="img-thumbnail" alt="..." />
      </div>
      <div class="col text-center" @click="sendKaKao()">
        <h6 class="font-weight-bold">팔로우</h6>
        <img
          src="../../assets/follow_640.png"
          class="img-thumbnail"
          alt="..."
        />
      </div>
      <hr />
    </div>
    <div><ModalSMS v-if="this.message !== ''" :Messages="message" /></div>
    <div><ModalImage /></div>
  </div>
</template>

<script>
import errorimg from '@/assets/ddd.jpg';
import ModalSMS from '@/components/common/ModalSMS';
import ModalImage from '@/components/common/ModalProfileImage';
import { checkMyprofile } from '@/api/user';
import { PostUserProfile } from '@/api/posts';

export default {
  components: {
    ModalSMS,
    ModalImage,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 메시지 전달
      message: '',
      // check me, other
      youAndme: false,
      // log
      logMessage: '',
      // loading
      isLoading: false,
      // 프로필이미지
      profileImage: '',
    };
  },
  methods: {
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
        await PostUserProfile(this.selectFile);
        //const { data } = await PostUserProfile(this.selectFile);
        //console.log('test', data);
        //this.profileImage = data.url;
        //this.$router.push(`/`);
      } else {
        // 파일을 선택하지 않았을때
        this.selectFile = null;
      }
    },
    clickProfile() {
      if (this.$store.getters.isLogin) {
        try {
          if (this.youAndme) {
            //나의 프로필
            this.$bvModal.show('modal-profileimage');
          } else {
            //남의 프로필
            alert('hi~');
          }
        } catch (error) {
          alert('다시 로그인을 해주세요~!', error);
        }
      } else {
        //test 중
        document.getElementById('imageUpload').click();
      }
    },

    callUser() {
      document.location.href = `tel:${this.userData.user.phonenumber}`;
    },
    sendSMS() {
      if (this.isLoading) this.$bvModal.show('modal-sms');
    },
    sendKaKao() {
      alert('개발중~!');
    },
    //에러 이미지 대체
    replaceByDefault(e) {
      e.target.src = errorimg;
    },
  },
  async created() {
    this.youAndme = this.userData.status;
    this.isLoading = true;

    //프로필 사진 존재 확인
    if (this.userData.user.profileUrl) {
      this.profileImage = this.userData.user.profileUrl;
    }
  },
};
</script>

<style>
.img-thumbnail {
  border: 0px;
}
.page-profile {
  padding: 20px;
  height: 200px;
}
.profile-header-id {
  font-size: 35px;
  font-weight: 600;
  color: #456155;
}
.profile-img {
  overflow: hidden;
  border-radius: 70%;
  width: 100px;
  height: 100px;
  margin: 0px 0px 0px 10px;
}
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
