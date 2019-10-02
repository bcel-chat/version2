<template>
  <div id="bubble">
    <div class="container">
      <div class="reply-box">
        <div class="reply-side">
          <div class="inside">
            <div class="title-name">
              <span>{{ msg.uid == myID ? 'Yoy' : msg.displayname}}</span>
            </div>
            <div class="title-msg">
              <span>{{msg.msg}}</span>
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
