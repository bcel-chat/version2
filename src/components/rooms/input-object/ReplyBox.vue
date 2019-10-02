<template>
  <div class="reply-box" v-if="replyBoxData">
    <div class="reply-box-inside">
      <span class="close-box">
        <span role="button" @click="setReplyBoxToggle(false)">
          <i class="material-icons">close</i>
        </span>
      </span>
      <div class="title-name">
        <span>{{ replyBoxData.uid == myID ? 'You' : replyBoxData.displayname}}</span>
      </div>
      <div class="title-msg">
        <span>{{replyBoxData.msg}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("Chat", ["replyBoxData"]),
    ...mapState("Identify", ["myID"])
  },
  methods: {
    ...mapActions("Chat", ["setReplyBoxToggle"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.reply-box {
  position: relative;
  overflow: hidden;
  transition: all 0.5s;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

  &::before {
    position: absolute;
    content: "";
    width: 0.3rem;
    height: 100%;
    background-color: $primary-color;
    border-radius: 0.3rem 0 0 0.3rem;
  }

  .reply-box-inside {
    background-color: #f8f8f8;
    border-radius: 0.3rem;
    padding: 0.2rem 1rem;

    .close-box {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.1rem;

      i {
        font-size: 1rem;
        color: $secondary-color;
      }
    }

    .title-name {
      color: $primary-color;
      font-weight: 600;
    }

    .title-msg {
      color: $semi-secondary-color;
    }
  }
}
</style>