<template>
  <div id="bubble">
    <div class="_container">
      <div class="reply-box">
        <div class="reply-side">
          <div class="inside">
            <div class="title-name">
              <span>{{ msg.uid == myID ? 'You' : msg.displayname}}</span>
            </div>
            <div class="title-msg">
              <span v-if="msg.type == 1">{{msg.msg}}</span>
              <div class="msg-inside-sticker" v-else-if="msg.type == 5">
                <img
                  data-v-5679474e
                  :src="`/chat/img/emojis/${msg.path}`"
                  alt
                  srcset
                  class="img-emoji"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="msg-inside">
          <div
            class="msg"
            ref="msg"
            @input="setMsg"
            contenteditable="true"
            placeholder="Type a message"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["msg"],
  computed: {
    ...mapState("Identify", ["myID"])
  },
  methods: {
    ...mapActions("Context", ["setMsgBox"]),
    setMsg(e) {
      this.setMsgBox(e.target.innerText);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/context/forwardMessageBox.scss";
</style>
