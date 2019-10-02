<template>
  <div id="home">
    <div class="home-background">
      <img class="bg" src="@/assets/img/bcel-background.jpg" alt srcset draggable="false" />
    </div>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <context-menu v-if="roomArrow" style="animation-duration: .2s"></context-menu>
      <image-viewer v-if="imageViewer" style="animation-duration: .2s"></image-viewer>
    </transition>
    <transition :name="mobileMode ? '' : 'bounce'">
      <div v-if="startUp" :class="mobileMode ? 'app-wrapper' : 'app-wrapper-desktop'">
        <bubble-popup v-if="bubblePopup" key="1"></bubble-popup>
        <forward-popup v-if="forwartPopup" key="2"></forward-popup>
        <confirm-popup v-if="confirm" key="3"></confirm-popup>
        <div :class="['app-inside', info ? 'three' : 'two', chatClick ? 'chat-room' : '']">
          <div class="app-drawer">
            <div :class="['part', mobileMode ? 'app-sidebar' : 'border app-sidebar-desktop']">
              <span class="panel">
                <transition-group
                  tag="div"
                  class="sidebar"
                  enter-active-class="animated slideInLeft"
                  leave-active-class="animated slideOutLeft"
                >
                  <Settings v-if="sidebar" key="1" :style="styling"></Settings>
                  <NewChat v-else-if="newChat" key="2" :style="styling"></NewChat>
                  <AddParticipant v-else-if="addParticipant" key="3" :style="styling"></AddParticipant>
                  <GroupSubject v-if="GroupSubject" key="4" :style="styling"></GroupSubject>
                </transition-group>
              </span>
            </div>
            <!-- End app-sidebar -->
            <div :class="['part', mobileMode ? 'app-content' : 'app-content-desktop']">
              <span class="panel">
                <FilePanel v-if="filePanel" :style="styling"></FilePanel>
              </span>
            </div>
            <div :class="['part', mobileMode ? 'app-info' : 'app-info-desktop']">
              <transition
                enter-active-class="animated slideInRight"
                leave-active-class="animated slideOutRight"
              >
                <div class="info" v-if="info" key="1" :style="styling">
                  <span class="panel">
                    <Info></Info>
                  </span>
                </div>
              </transition>
              <transition
                enter-active-class="animated slideInUp"
                leave-active-class="animated slideOutDown"
              >
                <div class="info" v-if="addParticipantPanel" key="1" :style="styling">
                  <span class="panel">
                    <AddParticipantPanel></AddParticipantPanel>
                  </span>
                </div>
              </transition>
            </div>
            <!-- End app-info -->
          </div>
          <!-- End app-drawer -->
          <div :class="['part', !mobileMode ? 'border app-sidebar-desktop' : 'app-sidebar']">
            <SideIndex @itemClicked="onItemClicked"></SideIndex>
          </div>
          <transition-group
            tag="div"
            enter-active-class="animated slideInUp"
            leave-active-class="animated slideOutDown"
            :class="['part', mobileMode ? 'app-content' : 'app-content-desktop']"
          >
            <Welcome v-if="!chatClick && !mobileMode" key="1" style="animation-duration: 0s"></Welcome>
            <RoomIndex
              v-else-if="chatClick && !moduleLink"
              key="2"
              style="animation-duration: 0.1s"
            ></RoomIndex>

            <!-- <RoomMain v-else-if="chatClick" key="2" style="animation-duration: 0.1s"></RoomMain> -->
            <div
              id="module-box"
              v-else-if="chatClick && moduleLink"
              key="3"
              style="animation-duration: 0.1s"
            >
              <div class="header">
                <div class="header-box">
                  <div
                    class="back-button"
                    role="button"
                    @click="onChatClick({cnt: false, module: ''})"
                    v-if="mobileMode"
                  >
                    <transition enter-active-class="animated zoomIn">
                      <i class="material-icons" v-if="startUp" key="1">arrow_downward</i>
                    </transition>
                  </div>
                  <!-- End back-button -->
                  <span class="title">{{ moduleLink }}</span>
                </div>
                <!-- End header-box -->
              </div>
              <div class="modules">
                <router-view />
              </div>
            </div>
            <drop-box key="4" v-if="dropBox" style="animation-duration: 0s"></drop-box>
          </transition-group>
          <!-- <div :class="['part', mobileMode ? 'app-content' : 'app-content-desktop']">
          <RoomIndex></RoomIndex>
          </div>-->
        </div>
        <!-- End app-inside -->
      </div>
      <!-- End app-wrapper -->
    </transition>
  </div>
</template>

<script>
import ImageViewer from "@/components/rooms/ImageViewer.vue";
import SideIndex from "@/components/sidebars/SideIndex.vue";
import RoomIndex from "@/components/rooms/RoomIndex.vue";
import Info from "@/components/sidebars/Info.vue";
import AddParticipantPanel from "@/components/sidebars/AddParticipantPanel.vue";
import Settings from "@/components/sidebars/Settings.vue";
import NewChat from "@/components/sidebars/NewChat.vue";
import AddParticipant from "@/components/sidebars/AddParticipant.vue";
import GroupSubject from "@/components/sidebars/GroupSubject.vue";
import FilePanel from "@/components/rooms/FilePanel.vue";
import Welcome from "@/views/Welcome.vue";
import ConfirmPopup from "@/components/context/ConfirmPopup.vue";

import BubblePopup from "@/components/context/bubblePopup.vue";
import ForwardPopup from "@/components/context/forwardPopup.vue";
import ContextMenu from "@/components/context/Context.vue";

import DropBox from "@/components/rooms/input-object/DropBox.vue";

import { mapState, mapActions } from "vuex";
import MobileDetector from "@/mixins/MobileDetector.js";
import ds from "@/helper/deepstream";
import code from "@/helper/father";

export default {
  mixins: [MobileDetector],
  components: {
    ImageViewer,
    Welcome,
    SideIndex,
    RoomIndex,
    Settings,
    AddParticipant,
    GroupSubject,
    Info,
    AddParticipantPanel,
    NewChat,
    FilePanel,
    BubblePopup,
    ForwardPopup,
    ConfirmPopup,
    ContextMenu,
    DropBox
  },
  data() {
    return {
      startUp: false,
      styling: {
        animationDuration: ".2s"
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.startUp = true;
    });

    window.addEventListener("dragover", e => {
      e.preventDefault();
    });

    window.addEventListener("drop", e => {
      e.preventDefault();
      setTimeout(() => {
        this.setDropBox(false);
      }, 200);
    });

    this.setMyID(code.from(localStorage.getItem("roger")));
    setTimeout(() => {
      ds.record.getRecord(`chat`).set(`online/${this.myID}`, {
        status: "online",
        user: this.myID
      });
    }, 500);

    window.onbeforeunload = () => {
      if (this.addParticipant || this.GroupSubject) {
        this.deleteGroup();
      }

      ds.rpc.make("setLastseen", { uid: this.myID }, (err, data) => {});
      ds.record.getRecord(`chat`).set(`online/${this.myID}`, {
        status: "offline",
        user: this.myID
      });
    };
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("Context", [
      "bubblePopup",
      "forwartPopup",
      "confirm",
      "roomArrow",
      "dropBox"
    ]),
    ...mapState("AppData", [
      "imageViewer",
      "chatClick",
      "mobileMode",
      "sidebar",
      "addParticipant",
      "GroupSubject",
      "info",
      "addParticipantPanel",
      "newChat",
      "filePanel",
      "moduleLink"
    ]),
    ...mapState("Group", ["roomID"])
  },
  methods: {
    ...mapActions("Identify", ["setMyID"]),
    ...mapActions("Context", ["setBubblePopup", "setDropBox"]),
    ...mapActions("AppData", ["onChatClick", "setModuleLink"]),
    ...mapActions("Group", ["deleteGroup"]),
    onItemClicked(e) {
      console.log(e);
    },
    sideChange(e) {
      this.sidebar = e;
    },
    infoChange(e) {
      this.info = e;
    },
    clearLink() {
      this.$router.replace("/chat");
      this.setModuleLink("");
    }
  },
  beforeDestroy() {
    this.onChatClick("");
    this.setModuleLink("");
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/Home.scss";
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
