<template>
  <div id="room-footer">
    <div class="sticker-box" v-if="stickerBox.status">
      <div class="st-close" @click="setStickerBox({status: false,src: ''})">
        <CloseIcon class="close-icon"></CloseIcon>
      </div>
      <img :src="stickerBox.src" alt srcset class="img-emoji" />
    </div>
    <div class="footer-box">
      <div
        :class="[
          'input-box',
          replyBoxToggle || fileBoxToggle ? 'reply' : '',
          emoji && !mobileMode ? 'reply' : ''
        ]"
      >
        <div class="reply">
          <reply-box v-if="replyBoxToggle"></reply-box>
          <file-box v-if="fileBoxToggle"></file-box>
          <div class="emoji-desktop" v-if="emoji && !mobileMode">
            <EmojiDesktop></EmojiDesktop>
          </div>
        </div>
        <div class="input-box-inside">
          <span class="emo-icon left" role="button" @click="emojiPanel">
            <i class="material-icons" v-if="!emoji">sentiment_satisfied_alt</i>
            <i class="material-icons" v-else>close</i>
          </span>

          <div class="input-inside">
            <div class="hint" :style="{ visibility: visibility }">Type a message</div>
            <div
              class="input"
              contenteditable="true"
              data-tab="1"
              spellcheck="true"
              ref="input"
              @input="inputUpdate"
              @keydown="inputHandler"
              @keyup.enter="send"
              @focus="inputFocus"
            ></div>
          </div>
          <span
            class="emo-icon right open-file-panel"
            role="button"
            id="att"
            v-if="!fileBoxToggle"
            @click="emoji = false"
          >
            <i class="material-icons att">attach_file</i>
          </span>
        </div>
      </div>
      <div class="emo-box">
        <div class="emo-ico circle" title="Send" role="button" @click="btnSend">
          <i class="material-icons">send</i>
        </div>
      </div>
    </div>
    <div class="emoji-mobile" v-if="emoji && mobileMode">
      <EmojiMobile></EmojiMobile>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import code from "@/helper/father";
import ds from "@/helper/deepstream";
import { debounce } from "lodash";

const ReplyBox = () => import("@/components/rooms/input-object/ReplyBox.vue");
const FileBox = () => import("@/components/rooms/input-object/FileBox.vue");
import EmojiMobile from "@/components/rooms/input-object/EmojiMobileBox.vue";
import EmojiDesktop from "@/components/rooms/input-object/EmojiDesktopBox.vue";

import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  components: {
    ReplyBox,
    FileBox,
    EmojiMobile,
    EmojiDesktop,
    CloseIcon
  },
  data() {
    return {
      emoji: false,
      message: "",
      visibility: "visible",
      reply: false,
      record: null,
      recordMsg: null,
      clearType: ""
    };
  },
  watch: {
    $route() {
      this.emoji = false;
    }
  },
  mounted() {
    this.record = ds.record.getRecord(`chat`);
    this.clearType = debounce(this.clearTyping, 500);
    document.addEventListener("click", e => this.filePanelListen(e));
    window.addEventListener("resize", () => {
      this.showFilePanel(false);
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", e => this.filePanelListen(e));
    window.removeEventListener("resize", () => {
      this.showFilePanel(false);
    });
  },
  computed: {
    ...mapState("AppData", ["mobileMode"]),
    ...mapState("Chat", [
      "roomID",
      "roomType",
      "replyBoxToggle",
      "replyID",
      "replyBoxData",
      "fileBoxToggle",
      "fileBoxData"
    ]),
    ...mapState("Room", ["userRoom", "roomStatus", "participantRoom"]),
    ...mapState("Group", ["participantId"]),
    ...mapState("Context", ["toEdit", "stickerBox"]),
    ...mapState("Identify", ["myID"]),
    ...mapState("Settings", ["profile"])
  },
  methods: {
    ...mapActions("AppData", [
      "showFilePanel",
      "setSearchToggle",
      "setTabActive",
      "showNewChat"
    ]),
    ...mapActions("Chat", [
      "sendMessage",
      "setMessage",
      "uploadFile",
      "setReplyBoxToggle",
      "setFileBoxToggle",
      "setPictureStatus"
    ]),
    ...mapActions("Room", ["setRoom", "setRoomActive"]),
    ...mapActions("Context", ["setToEdit", "editMessage", "setStickerBox"]),
    inputHandler(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
      }
    },
    filePanelListen(e) {
      var className1 = "panel-control";
      var className2 = "open-file-panel";
      var click1 = this.clickInsideElement(e, className1);
      var click2 = this.clickInsideElement(e, className2);
      if ((!click1 && click2) || (click1 && !click2)) {
        this.showFilePanel(true);
      } else {
        var button = e.which || e.button;
        if (button === 1) {
          this.showFilePanel(false);
        }
      }
    },
    clickInsideElement(e, className) {
      var el = e.srcElement || e.target;

      if (el.classList.contains(className)) {
        return el;
      } else {
        while ((el = el.parentNode)) {
          if (el.classList && el.classList.contains(className)) {
            return el;
          }
        }
      }

      return false;
    },
    inputUpdate(e) {
      this.message = e.target.innerText;
      if (e.target.innerText) this.visibility = "hidden";
      else this.visibility = "visible";
      this.sendTyping();
    },
    sendTyping() {
      this.record.set(`typing/${this.roomID}`, {
        receive: this.userRoom.uid,
        sender: this.myID,
        roomID: this.roomID,
        type: `typing...`
      });
      this.clearType();
    },
    clearTyping() {
      this.record.set(`typing/${this.roomID}`, {
        receive: this.userRoom.uid,
        sender: this.myID,
        roomID: this.roomID,
        type: ``
      });
    },
    replyClose() {},
    send(e) {
      if (e.keyCode === 13 && e.shiftKey) {
        e.preventDefault();
        return;
      }
      let type = 1;
      if (this.replyBoxToggle && !this.toEdit) type = 3;
      else if (this.fileBoxToggle) type = 4;
      else type = 1;

      if (this.replyBoxToggle) {
        if (!this.toEdit) this.sendConfirm(type);
        else if (this.toEdit && this.message.trim() != "")
          this.sendConfirm(type);
      } else if (this.fileBoxToggle) this.sendFile(type);
      else if (this.message.trim() != "") this.sendConfirm(type);
    },
    btnSend() {
      let type = 1;
      if (this.replyBoxToggle && !this.toEdit) type = 3;
      else if (this.fileBoxToggle) type = 4;
      else type = 1;

      if (this.replyBoxToggle) {
        if (!this.toEdit) this.sendConfirm(type);
        else if (this.toEdit && this.message.trim() != "")
          this.sendConfirm(type);
      } else if (this.message.trim() != "") this.sendConfirm(type);
      else if (this.fileBoxToggle) this.sendFile(type);
    },
    sendConfirm(type) {
      if (this.toEdit)
        this.editMessage({
          cid: this.replyBoxData.cid,
          msg: this.message,
          uid: this.myID
        });
      else
        this.setMessage({
          msg: this.message,
          type: type,
          chatwith: this.userRoom.uid,
          rtype: this.roomType
        });
      // this.sendMessage({
      //   msg: this.message,
      //   type: type,
      //   chatwith: this.userRoom.uid,
      //   rtype: this.roomType
      // });
      this.reloadData();
      this.setReplyBoxToggle({ toggle: false, cid: 0 });
    },
    sendFile(type) {
      this.setPictureStatus({
        display: true,
        success: this.roomID
      });
      this.uploadFile({
        msg: this.message,
        type: type,
        chatwith: this.userRoom.uid,
        rtype: this.roomType
      });
      setTimeout(() => {
        this.reloadData();
      }, 1000);
      this.setFileBoxToggle(false);
    },
    reloadData() {
      let id = Math.random()
        .toString(6)
        .substr(2, 4);

      ds.event.emit(`room/${this.userRoom.uid}`, this.roomID);
      ds.event.emit(`chatroom/${this.roomID}`, this.roomID);

      ds.record
        .getRecord(`message`)
        .set(`chatroom/${this.roomID}`, { rid: this.roomID, mid: id });

      this.setTabActive(0);
      this.notify();
      this.clear();

      if (this.roomType == 2)
        this.participantId.forEach(e => {
          ds.event.emit(`room/${e.uid}`, this.roomID);
        });
    },
    clear() {
      setTimeout(() => {
        ds.event.emit(`scroller/${this.roomID}`, {
          rid: this.roomID,
          uid: this.myID,
          page: 2
        });
      }, 500);
      this.message = "";
      this.$refs.input.innerText = null;
      this.visibility = "visible";
      this.setSearchToggle(false);
      this.showNewChat(false);
      this.setRoomActive({
        status: true,
        rid: this.roomID
      });
    },
    inputFocus() {
      this.emoji = false;
      this.setStickerBox({ status: false, src: "" });
    },
    notify() {
      let name;
      let icon;
      let type = 1;
      if (this.replyBoxToggle && !this.toEdit) type = 3;
      else if (this.fileBoxToggle) type = 4;
      else type = 1;

      if (this.roomType == 1) {
        name = this.profile.name;
        icon = `${process.env.VUE_APP_PICTURE_PROFILE}/${this.myID}/icon/${this.profile.picture}`;
      } else {
        name = this.participantRoom.rname;
        icon = `${process.env.VUE_APP_PICTURE_PROFILE}/${this.roomID}/icon/${this.participantRoom.img}`;
      }

      ds.event.emit("notification", {
        rid: this.roomID,
        uid: this.myID,
        sender: name,
        msg: this.message,
        icon: icon,
        type: type
      });
    },
    emojiPanel() {
      if (this.emoji) this.emoji = false;
      else {
        this.emoji = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/rooms/RoomFooter.scss";
</style>
