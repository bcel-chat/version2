<template>
  <div id="contact">
    <div class="header-box">
      <div class="back-button" role="button" @click="showAddParticipantPanel(false)">
        <transition enter-active-class="animated zoomIn">
          <i class="material-icons">{{ mobileMode ? 'arrow_downward' : 'close'}}</i>
        </transition>
      </div>
      <!-- End back-button -->
      <span class="title">Add participant</span>
    </div>
    <transition-group
      :name="contact.length > 0 ? 'flip-list' : ''"
      tag="div"
      :class="['content-group', mobileMode ? 'mobile-enter' : 'desktop-enter']"
    >
      <template v-for="(it, index) in participant">
        <div :key="index" class="item-inbox" ref="itemInbox">
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
          <div class="send-box">
            <div class="checkbox">
              <input :id="`chk-${index}`" type="checkbox" @change="addCheck(it.uid,$event)" />
              <label :for="`chk-${index}`" class="chk-label"></label>
            </div>
          </div>
        </div>
        <!-- End item-inbox -->
      </template>
    </transition-group>
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="done-box" v-if="checked.length > 0">
        <div class="done" role="button" @click="save">
          <i class="material-icons">check</i>
        </div>
      </div>
    </transition>
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
      }),
      checked: []
    };
  },
  beforeMount() {
    this.getParticipant({
      rid: this.participantInfo[0].rid,
      uid: this.myID,
      text: "",
      _page: 1,
      fn: ""
    });
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
    ...mapState("Context", ["txtSearch", "contact", "msgBox", "popupData"]),
    ...mapState("Group", ["participant"])
  },
  methods: {
    ...mapActions("AppData", [
      "onChatClick",
      "showNewChat",
      "showAddParticipantPanel"
    ]),
    ...mapActions("Context", ["getContact", "setMsgBox"]),
    ...mapActions("Room", [
      "setRoom",
      "roomCheck",
      "getUserRoom",
      "getParticipantRoom",
      "addParticipant",
      "getParticipantInfo"
    ]),
    ...mapActions("Chat", [
      "getMessage",
      "setMessage",
      "setRoomID",
      "setRoomType",
      "setReplyBoxToggle"
    ]),
    ...mapActions("Group", ["getParticipant"]),
    addCheck(id, $event) {
      if ($event.target.checked) {
        this.checked.push({
          uid: id
        });
      } else {
        for (let i = 0; i < this.checked.length; i++) {
          if (this.checked[i].uid == id) {
            this.checked.splice(i, 1);
          }
        }
      }
    },
    save() {
      this.addParticipant(this.checked);
      this.showAddParticipantPanel(false);
      this.getContact({
        id: this.myID,
        _page: 1,
        text: "",
        fn: ""
      });
      this.getParticipantInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/AddParticipantPanel.scss";

.flip-list-move {
  transition: transform 1s;
}
</style>
