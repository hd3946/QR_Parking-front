<template>
  <div>
    <div>
      <b-modal ref="my-modal" id="modal-sms" hide-footer title="Send Message">
        <div class="d-block text-center">
          <h3>Hello!</h3>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea
              class="form-control"
              id="message-text"
              v-model="Message"
              placeholder="보낼 메시지를 입력해보세요~!"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <b-button
            class="btn"
            variant="outline-primary"
            data-bs-target="#exampleModalToggle2"
            data-bs-toggle="modal"
            block
            @click="sendSMS"
          >
            Send
          </b-button>
          <b-button
            class="btn"
            variant="outline-danger"
            data-bs-target="#exampleModalToggle2"
            data-bs-toggle="modal"
            block
            @click="hideModal"
          >
            Close
          </b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Messages: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      Message: [],
    };
  },
  async created() {
    console.log('하위 생성', this.Messages);
    this.Message = this.Messages;
  },
  methods: {
    sendSMS() {
      this.$refs['my-modal'].hide();
      //this.$store.commit('setSMS', this.Messages);
      document.location.href = `sms:${this.$store.state.userinfo.phonenumber}&body=${this.Message}`;
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn');
    },
  },
};
</script>

<style lang="scss" scoped></style>
