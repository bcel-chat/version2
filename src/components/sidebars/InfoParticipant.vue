<template>
  <div id="contact">
    <transition-group
      :name="contact.length > 0 ? 'flip-list' : ''"
      tag="div"
      :class="['content-group', mobileMode ? 'mobile-enter' : 'desktop-enter']"
    >
      <template v-for="(it, index) in participantInfo">
        <div :key="index" class="item-inbox" ref="itemInbox" role="button">
          <div class="avatar-inbox-panel">
            <div class="avatar-inbox">
              <img v-if="it.picture" :src="`${picURL}/${it.uid}/${it.picture}`" class="avatar" />
              <img v-else src="@/assets/img/user.svg" class="avatar-default" />
            </div>
          </div>
          <!-- End avatar-inbox-panel -->
          <div class="inbox-detail">
            <div class="name-time-box">
              <div class="sender-name-box">{{ it.uid == myID ? 'You' : it.displayname}}</div>
            </div>
            <div class="msg-box">
              <div class="msg">{{ it.desc }}</div>
            </div>
          </div>
          <!-- inbox-detail -->
          <div class="send-box" v-if="admin(it)">
            <div class="send">
              <span>Admin</span>
            </div>
          </div>
        </div>
        <!-- End item-inbox -->
      </template>
    </transition-group>
  </div>
</template>
<script>
import randomColor from "randomcolor";
import { mapActions, mapState, mapGetters } from "vuex";
import code from "@/helper/father";
import ds from "@/helper/deepstream";

export default {
  data() {
    return {
      picURL: process.env.VUE_APP_PICTURE_PROFILE,
      colors: randomColor({
        luminosity: "dark",
        hue: "random"
      })
    };
  },
  mounted() {
    this.getContact({
      id: this.myID,
      _page: 1,
      text: "",
      fn: ""
    });
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode"]),
    ...mapState("Room", ["roomStatus", "participantInfo"]),
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
    ...mapActions("Group", ["getAdminStatus"]),
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
    admin(item) {
      if (item.admin == 1) {
        if (item.uid == this.myID) this.getAdminStatus(true);

        return true;
      } else return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/InfoParticipant.scss";
.flip-list-move {
  transition: transform 1s;
}
</style>
