<template>
  <div class="contents">
    <div class="row my-3 align-items-center">
      <div class="col-4" @click="uplodeImage()">
        <img src="../../assets/ddd.jpg" class="profile-img" alt="hello" />
        <input
          class="form-control"
          type="file"
          id="imageUpload"
          accept="image/*"
          @change="fileUpload($event)"
          hidden
        />
      </div>
      <div class="col-auto">
        <h4 class="font-weight-bold">{{ username }} 님의 계정</h4>
        <p class="fs-6">안녕하세요~</p>
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-outline-primary my-2 my-sm-0">
          프로필 편집
        </button>
      </div>
    </div>
    <hr />
    <div class="row">
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
    </div>
    <div><ModalSMS v-if="this.message !== ''" :Messages="message" /></div>
    <div><ModalImage /></div>
  </div>
</template>

<script>
import { seeProfile } from '@/api/qrprofile';
import ModalSMS from '@/components/common/ModalSMS';
import ModalImage from '@/components/common/ModalProfileImage';

export default {
  components: {
    ModalSMS,
    ModalImage,
  },
  data() {
    return {
      // form values
      username: '',
      password: '',
      phonenumber: '',
      carnumber: '',
      //메시지 전달
      message: '',
      // log
      logMessage: '',
      //
      isLoading: false,
    };
  },
  methods: {
    uplodeImage() {
      this.$bvModal.show('modal-profileimage');
      //document.getElementById('imageUpload').click();
    },
    callUser() {
      alert('전화 걸기');
      document.location.href = `tel:${this.phonenumber}`;
    },
    sendSMS() {
      if (this.isLoading) this.$bvModal.show('modal-sms');
    },
    sendKaKao() {
      alert('개발중~!');
      //document.location.href = `sms:${this.phonenumber}`;
    },
    setMessage(text) {
      if (text != '') this.message = `${text}차량좀 빼주시겠어용~💕`;
      else this.message = '차좀 빼주시겠어용~💕';
    },
  },
  async created() {
    const id = this.$route.params.id;
    const { data } = await seeProfile(id);
    console.log(data, id, data.user.carnumber);
    this.title = data.title;
    this.contents = data.contents;
    if (data.exist) {
      //유저등록된 상태
      this.username = data.user.nickname;
      this.phonenumber = data.user.phonenumber;
      this.setMessage(data.user.carnumber);
      this.$store.commit('setUserInfo', data.user);
      //this.$router.push(`/login`); //${id}
    } else {
      //유저등록안된 상태 => 유저등록화면
      this.$store.commit('setQRurl', id);
      this.$router.push(`/signup`);
    }
    this.isLoading = true;
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
