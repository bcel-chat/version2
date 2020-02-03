<template>
  <div id="contact">
    <transition-group
      name="flip-list"
      tag="div"
      :class="['content-group', mobileMode ? 'mobile-enter' : 'desktop-enter']"
    >
      <template v-for="(it, index) in participantInfo">
        <div
          :key="index"
          class="item-inbox"
          ref="itemInbox"
          role="button"
          @mouseover="refID = it.uid"
          @mouseleave="roomArrow ? refID = it.uid : refID = ''"
          @touchstart="openContext(it, $event, 1)"
          @touchend="openContext(it, $event, 0)"
          @touchmove="openContext(it, $event, 0)"
          @click="mobileMode ? openContextClick(it, $event) : ''"
        >
          <div class="avatar-inbox-panel">
            <div class="avatar-inbox">
              <img v-if="it.picture" :src="`${picURL}/${it.uid}/icon/${it.picture}`" class="avatar" />
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
          <div class="send-box">
            <div class="send" v-if="admin(it)">
              <span>Admin</span>
            </div>
            <transition
              enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOutRight"
            >
              <div
                class="arrow-box"
                v-if="adminStatus && refID == it.uid && !mobileMode && it.uid != myID"
                @click.stop="openContextClick(it, $event)"
                ref="arrow"
                style="animation-duration: .2s"
              >
                <i class="material-icons">keyboard_arrow_down</i>
              </div>
            </transition>
          </div>
        </div>
        <!-- End item-inbox -->
      </template>
    </transition-group>
    <ContextMobile
      v-if="showContext && uid != myID && adminStatus"
      @dismiss="closeContext"
      :roomArrow="contextData"
    ></ContextMobile>
  </div>
</template>
<script>
import randomColor from "randomcolor";
import { mapActions, mapState } from "vuex";
// import code from "@/helper/father";
import ds from "@/helper/deepstream";

import ContextMobile from "@/components/context/ContextMobile.vue";

export default {
  components: {
    ContextMobile
  },
  data() {
    return {
      adminStatus: false,
      uid: "",
      showContext: false,
      contextData: "",
      time: "",
      refID: "",
      picURL: process.env.VUE_APP_PICTURE_PROFILE,
      colors: randomColor({
        luminosity: "dark",
        hue: "random"
      })
    };
  },
  match: {
    roomArrow(val) {
      if (!val) this.refID = "";
    }
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
    ...mapState("Context", ["roomArrow"]),
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
    ...mapActions("Context", ["setRoomArrow", "setAdminData"]),
    openContextClick(val, $event) {
      this.uid = val.uid;
      this.contextData = { event: $event, val: val };
      this.showContext = true;
    },
    openContext(val, $event, num) {
      if (num == 1) this.contextTimeout({ event: $event, val: val });
      else if (this.time) clearTimeout(this.time);
    },
    closeContext() {
      this.showContext = false;
      this.uid = "";
    },
    contextTimeout(val) {
      this.time = setTimeout(() => {
        this.uid = val.val.uid;
        this.contextData = val;
        this.showContext = true;
      }, 250);
    },
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
      if (item.admin == 1 && item.uid == this.myID) {
        this.getAdminStatus(true);
        return true;
      } else if (item.admin == 1) {
        this.adminStatus = true;
        return true;
      } else return false;
    },
    arrowData(val, $event) {
      // this.setAdminData()
      this.setRoomArrow({ event: $event, val: val });
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
