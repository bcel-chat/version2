<template>
  <div id="contact">
    <div class="content-box">
      <transition-group
        :name="contact.length > 0 ? 'flip-list' : ''"
        tag="div"
        :class="['content-group', mobileMode ? 'mobile-enter' : 'desktop-enter']"
      >
        <template v-for="(it, index) in contact">
          <div :key="index" class="item-inbox" ref="itemInbox">
            <div class="avatar-inbox-panel">
              <div class="avatar-inbox">
                <img
                  v-if="it.picture || it.img"
                  :src="`${picURL}${it.rtype == 1 ? it.user_id : it.rid}/${it.rtype == 1 ? it.picture : it.img}`"
                  class="avatar"
                />
                <img v-else src="@/assets/img/user.svg" class="avatar-default" />
              </div>
            </div>
            <!-- End avatar-inbox-panel -->
            <div class="inbox-detail">
              <div class="name-time-box">
                <div class="sender-name-box">{{ it.rtype == 1 ? it.username : it.rname}}</div>
              </div>
              <div class="msg-box" v-if="it.rtype == 1">
                <div class="msg">{{ it.desc }}</div>
              </div>
            </div>
            <!-- inbox-detail -->
            <div class="send-box">
              <div
                class="send"
                role="button"
                @click="sendMsg(it),$event.target.classList.toggle('border')"
              >
                <i class="material-icons ic">check</i>
                Sen
                <span class="sd">d</span>
                <span class="st">t</span>
              </div>
            </div>
          </div>
          <!-- End item-inbox -->
        </template>
      </transition-group>
    </div>
  </div>
</template>2
<script>
import randomColor from "randomcolor";
import { mapActions, mapState, mapGetters } from "vuex";
import code from "@/helper/father";
import ds from "@/helper/deepstream";

export default {
  data() {
    return {
      id: code.from(sessionStorage.getItem("roger")),
      picURL: process.env.VUE_APP_PICTURE_PROFILE,
      colors: randomColor({
        luminosity: "dark",
        hue: "random"
      })
    };
  },
  watch: {
    txtSearch(val) {
      let fn = val.substring(1, 0);
      if (fn == "@")
        this.getContact({
          id: this.myID,
          _page: 2,
          text: val.substring(1, 5),
          fn: "@"
        });
      else
        this.getContact({
          id: this.myID,
          _page: 2,
          text: val,
          fn: ""
        });

      if (!val || val == "@")
        this.getContact({
          id: this.myID,
          _page: 1,
          text: "",
          fn: ""
        });
    }
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode"]),
    ...mapState("Room", ["roomStatus"]),
    ...mapState("Context", ["txtSearch", "contact", "msgBox", "popupData"])
  },
  methods: {
    ...mapActions("AppData", ["onChatClick", "showNewChat"]),
    ...mapActions("Context", ["getContact", "setMsgBox"]),
    ...mapActions("Room", [
      "setRoom",
      "roomCheck",
      "getUserRoom",
      "getParticipantRoom"
    ]),
    ...mapActions("Chat", [
      "getMessage",
      "setMessage",
      "setRoomID",
      "setRoomType",
      "setReplyBoxToggle"
    ]),
    sendMsg(val) {
      this.setReplyBoxToggle({ toggle: false, cid: this.popupData.cid });
      this.setRoomID(val.rid);
      setTimeout(() => {
        this.setMessage({
          msg: this.msgBox,
          type: 3,
          chatwith: val.myid,
          rtype: val.rtype
        });
        ds.event.emit(`room/${val.user_id}`, val.rid);
        ds.event.emit(`chatroom/${val.rid}`, val.rid);
        this.setMsgBox("");
      }, 500);
    },
    getFirstname(name) {
      return name.split(" ")[0];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/context/forwardContact.scss";
.flip-list-move {
  transition: transform 1s;
}
</style>
