<template>
  <div id="bubble" :class="[checkTime(index, msg.time) != null ? 'new' : '']">
    <div
      :class="['bubble-container', msg.uid == myID ? 'out' : 'in']"
      @mouseover="menu = true"
      @mouseleave="menu = false"
    >
      <div class="menu" v-if="menu">
        <div
          :class="['menu-inside', checkTime(index, msg.time) == null && !senderCheck(index, msg.uid) ? '' : 'option']"
        >
          <i
            class="material-icons"
            role="button"
            @click="setBubblePopup(true), setPopupData(msg)"
          >more_vert</i>
        </div>
      </div>
      <div class="bubble-box-inside">
        <div class="bubble-box">
          <div class="bb-profile-box">
            <div
              v-if="msg.uid != myID && checkTime(index, msg.read) != null || msg.uid != myID && senderCheck(index, msg.uid)"
              class="bb-avatar"
            >
              <div class="bb-avatar-inside">
                <img
                  :src="`${picProfileURL}/${msg.uid}/${msg.picture}`"
                  class="avatar"
                  v-if="msg.picture"
                />
                <img src="@/assets/img/user.svg" class="avatar-default" alt srcset v-else />
              </div>
            </div>
            <div
              v-if="checkTime(index, msg.time) != null || msg.uid != myID && senderCheck(index, msg.uid) || msg.uid == myID && senderCheck(index, msg.uid)"
              :class="['bb-name-time', msg.uid == myID ? 'out' : 'in']"
            >
              <span v-if="msg.uid == myID" :class="['read-msg',msg.read > 0 ? 'read' : 'unread']"></span>
              <span
                class="_time"
              >{{ msg.uid == myID ? '' : `${getFirstname(msg.displayname)},` }} {{moment(msg.time).format('h:mm A')}}</span>
            </div>
          </div>
        </div>
        <div
          :class="['msg-box', checkTime(index, msg.time) == null && !senderCheck(index, msg.uid) ? 'hide' : '', msg.uid == myID ? 'out' : 'in',]"
          @mousedown="func(msg.cid)"
          @mouseup="revert"
        >
          <div class="reply-box">
            <div class="reply-side">
              <div :class="['file', msg.uid == myID ? 'rd-right' : 'rd-left' ]" role="button">
                <div
                  class="picture-box"
                  v-if="validateFile(msg.path)"
                  @click.stop="setImageViewer({show: true, url: `${picMsgURL+msg.rid}/${msg.uid}/${msg.path}`, name: msg.displayname, uid: msg.uid})"
                >
                  <img
                    class="picture"
                    :src="`${picMsgURL+msg.rid}/${msg.uid}/${msg.path}`"
                    alt
                    srcset
                  />
                </div>
                <div class="file-name-box" v-else>
                  <div class="item-name">
                    <span class="file-name" :title="msg.path">{{msg.path}}</span>
                  </div>
                  <div class="icon-box">
                    <span class="ico">
                      <i class="material-icons">insert_drive_file</i>
                    </span>
                    <span class="icon-name">File</span>
                  </div>
                  <div class="download-box" @click="toDownload">
                    <span class="download">{{ download ? 'Completed' : 'Download' }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if=" msg.msg" class="msg-inside">
              <span class="msg">{{ msg.msg }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import code from "@/helper/father.js";
import { mapState, mapActions } from "vuex";
import LongPress from "@/mixins/LongPress.js";
import ds from "@/helper/deepstream";

export default {
  mixins: [LongPress],
  props: ["msg", "index"],
  data() {
    return {
      download: false,
      menu: false,
      moment: this.$moment,
      mentionData: null,
      picProfileURL: process.env.VUE_APP_PICTURE_PROFILE,
      picMsgURL: process.env.VUE_APP_PICTURE_MSG
    };
  },
  beforeMount() {
    this.getMention(this.$props.msg);
    if (this.$props.msg.uid != this.myID) {
      this.setReadMessage({ uid: this.myID, cid: this.$props.msg.cid });
    }
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("Chat", ["message"])
  },
  methods: {
    ...mapActions("AppData", ["setImageViewer"]),
    ...mapActions("Chat", ["setReadMessage", "downloadFile"]),
    ...mapActions("Context", ["setBubblePopup", "setPopupData"]),
    getMention(item) {
      ds.rpc.make(
        "getMention",
        {
          cid: item.cid,
          uid: item.uid,
          rid: item.rid
        },
        (err, data) => {
          if (!err) this.mentionData = data[0];
        }
      );
    },
    checkTime(index, mydate) {
      let i;
      if (index > 0) {
        if (
          this.moment(this.message[index - 1].time).format("h:mm A") ==
          this.moment(this.message[index].time).format("h:mm A")
        ) {
          i = null;
        } else {
          i = mydate;
        }
      } else {
        i = mydate;
      }
      return i;
    },
    senderCheck(index, uid) {
      let i;
      if (index > 0) {
        if (this.message[index - 1].uid == this.message[index].uid) i = false;
        else i = true;
      } else {
        i = uid;
      }

      return i;
    },
    convertBlob(val) {
      fetch("http://localhost/picture/" + val)
        .then(res => res.blob())
        .then(blob => {
          return URL.createObjectURL(blob);
        });
    },
    validateFile(val) {
      let allowedExtension = ["jpeg", "jpg", "png", "gif", "bmp", "ico"];
      let fileExtension = val
        .split(".")
        .pop()
        .toLowerCase();
      let isValidFile = false;

      for (var index in allowedExtension) {
        if (fileExtension === allowedExtension[index]) {
          isValidFile = true;
          break;
        }
      }

      return isValidFile;
    },
    getFirstname(name) {
      return name.split(" ")[0];
    },
    async toDownload() {
      const result = await this.downloadFile({
        uid: this.msg.uid,
        rid: this.msg.rid,
        filename: this.msg.path
      });

      if (result) this.download = result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/rooms/bubbles/bubblePicture.scss";
</style>
