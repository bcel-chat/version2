<template>
  <div id="room-header" :class="dropBox ? 'drop-box-in' : 'drop-box-out'">
    <div class="room-header">
      <div class="header-item-first">
        <div :class="['_back', mobileMode ? '_back-enter' : '']">
          <div class="back-box" v-if="mobileMode || roomArrow">
            <div class="arrow-box" role="button" @click="backButton(false)">
              <transition enter-active-class="animated zoomIn">
                <i class="material-icons" v-if="startUp" key="1">arrow_downward</i>
              </transition>
            </div>
          </div>
          <!--end back-box -->
          <div
            class="avatar-box"
            role="button"
            @click="mobileMode ? backButton(false) : showInfo(true)"
          >
            <div class="avatar">
              <img
                v-if="userRoom.picture || participantRoom.img"
                :src="`${picURL}${roomType == 1 ? userRoom.uid : participantRoom.rid }/icon/${roomType == 1 ? userRoom.picture : participantRoom.img}`"
                alt
                class="_avatar"
              />
              <img v-else src="@/assets/img/user.svg" class="_avatar-default" alt />
              <!--end avatar -->
            </div>
          </div>
        </div>
        <!--end avatar-box -->
        <div class="user-box" role="button" @click="showInfo(true)">
          <div
            class="user-name"
            :title="roomType == 1 ? userRoom.displayname : participantRoom.rname"
          >{{ roomType == 1 ? userRoom.displayname : participantRoom.rname }}</div>
          <div class="user-status">
            <span v-if="isTyping">{{isTyping}}</span>
            <span v-else-if="roomType == 2">
              <span
                v-for="(item, index) in participantId"
                :key="index"
              >{{index >= 1 ? ', ' : ''}}{{item.displayname}}</span>
              <span>, you</span>
            </span>
            <span
              v-else
            >{{ isOnline.status == "online" ? isOnline.status : `${checkTime(userRoom.lastseen)}` }}</span>
          </div>
        </div>
        <!-- end user-box -->
      </div>
      <div class="header-item-second">
        <span class="open-drop-box">
          <i class="material-icons" role="button">more_vert</i>
        </span>
      </div>
    </div>
    <!--end room-header -->
    <div class="drop-box">
      <div
        v-if="!roomStatus"
        class="add-box"
        role="button"
        @click="setContact({uid: myID, chatwith: userRoom.uid})"
      >
        <i class="material-icons">add</i>
        <span>Add to contact</span>
      </div>
      <div class="add-box" role="button" @click="showInfo(true)">
        <i class="material-icons">info</i>
        <span>Info</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import code from "@/helper/father";

export default {
  data() {
    return {
      moment: this.$moment,
      startUp: false,
      dropBox: false,
      picURL: process.env.VUE_APP_PICTURE_PROFILE
    };
  },
  mounted() {
    setTimeout(() => {
      this.startUp = true;
    }, 300);
    document.addEventListener("click", e => this.filePanelListen(e));
    window.addEventListener("resize", () => {
      this.dropBox = false;
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", e => this.filePanelListen(e));
    window.removeEventListener("resize", () => {
      this.dropBox = false;
    });
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode", "roomArrow"]),
    ...mapState("Room", [
      "roomStatus",
      "userRoom",
      "participantRoom",
      "isTyping",
      "isOnline"
    ]),
    ...mapState("Group", ["roomID", "participantId"]),
    ...mapGetters("Group", ["_participantId"]),
    ...mapState("Chat", ["roomType"])
  },
  methods: {
    ...mapActions("AppData", ["onChatClick", "showInfo"]),
    ...mapActions("Room", ["setRoomActive"]),
    ...mapActions("Contact", ["setContact"]),
    backButton(val) {
      setTimeout(() => {
        this.$router.push("/");
        this.onChatClick(val);
        this.setRoomActive({
          status: false,
          rid: null
        });
      }, 200);
    },
    filePanelListen(e) {
      var className1 = "drop-box";
      var className2 = "open-drop-box";
      var click1 = this.clickInsideElement(e, className1);
      var click2 = this.clickInsideElement(e, className2);
      if ((!click1 && click2) || (click1 && !click2)) {
        e.preventDefault();
        if (this.dropBox) this.dropBox = false;
        else this.dropBox = true;
      } else {
        var button = e.which || e.button;
        if (button === 1) {
          this.dropBox = false;
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
    checkTime(mydate) {
      const cw = this.moment(mydate).isSame(new Date(), "week");
      let week = "";
      if (cw) week = "dddd";
      else week = "DD/MM/YYYY";

      const d1 = this.moment(mydate).format("YYYY-MM-DD");
      const d2 = this.moment(new Date()).format("YYYY-MM-DD");
      let showText = "";

      if (d1 == d2) showText = "last seen today at";
      else showText = "last seen on";

      return (
        showText +
        " " +
        this.moment(mydate).calendar(null, {
          sameDay: "h:mm a",
          lastDay: "[Yesterday]",
          lastWeek: week,
          sameElse: "DD/MM/YYYY"
        })
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/rooms/RoomHeader.scss";
</style>
