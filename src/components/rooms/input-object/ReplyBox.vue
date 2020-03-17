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
        <span v-if="replyBoxData.type == 1">{{replyBoxData.msg}}</span>
        <div class="msg-inside-sticker" v-else-if="replyBoxData.type == 5">
          <img
            data-v-5679474e
            :src="`/chat/img/emojis/${replyBoxData.path}`"
            alt
            srcset
            class="img-emoji"
          />
        </div>
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
    background-color: $bubble-reply-inside;
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

      .msg-inside-sticker {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;
        margin: 2px;
        padding: 5px;
        transition: all 0.2s;

        .img-emoji {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
}
</style>