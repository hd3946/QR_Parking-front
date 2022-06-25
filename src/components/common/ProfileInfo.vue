<template>
  <div class="contents">
    <div class="row my-3 align-items-center">
      <div class="col-4 mb-2" @click="clickProfile()">
        <b-avatar
          v-bind:src="user.profileurl !== '' ? user.profileurl : ''"
          @error="replaceByDefault"
          size="6rem"
        ></b-avatar>
      </div>
      <div class="col-auto">
        <h4 class="font-weight-bold">{{ user.nickname }} 님의 계정</h4>
        <p class="fs-6">안녕하세요~</p>
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-outline-primary my-2 my-sm-0">
          프로필 편집
        </button>
        <b-button size="sm" variant="primary" class="mb-2">
          <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Settings
        </b-button>
      </div>
      <div>게시글 팔로워 팔로우</div>
    </div>
    <hr />
    <div class="row" :hidden="youorme">
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
import ModalSMS from '@/components/common/ModalSMSForm';
import ModalImage from '@/components/common/ModalProfileForm';
// import { checkMyprofile } from '@/api/user';
// import { PostUserProfile } from '@/api/posts';

export default {
  components: {
    ModalSMS,
    ModalImage,
  },
  props: {
    user: {
      type: Object,
      require: true,
    },
    // check me, other
    youorme: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      // 메시지 전달
      message: '',
      // log
      logMessage: '',
      // loading
      isLoading: false,
    };
  },
  methods: {
    clickProfile() {
      if (this.$store.getters.isLogin) {
        try {
          if (this.youorme) {
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
        //document.getElementById('imageUpload').click();
      }
    },
    callUser() {
      document.location.href = `tel:${this.user.phonenumber}`;
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
    this.isLoading = true;
  },
};
</script>

<style>
.img-thumbnail {
  border: 0px;
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
