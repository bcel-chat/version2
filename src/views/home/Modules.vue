<template>
  <div id="modules">
    <!-- <RoomMain v-else-if="chatClick" key="2" style="animation-duration: 0.1s"></RoomMain> -->
    <div id="module-box" v-if="chatClick && moduleLink" key="3" style="animation-duration: 0.1s">
      <div class="header">
        <div class="header-box">
          <div class="back-button" role="button" @click="back()" v-if="mobileMode">
            <transition enter-active-class="animated zoomIn">
              <i class="material-icons" v-if="startUp" key="1">arrow_downward</i>
            </transition>
          </div>
          <div class="burger" role="button" @click="setMainside" v-else>
            <i class="material-icons" v-if="mainside">menu_open</i>
            <i class="material-icons" v-else>menu</i>
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
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      sideMenu: true,
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
      "moduleLink",
      "mainside"
    ]),
    ...mapState("Group", ["roomID"]),
    ...mapState("flexible_interest_module", ["root_router", "permission"]),
    ...mapGetters("flexible_interest_module", ["user", "root"])
  },
  methods: {
    ...mapActions("Identify", ["setMyID"]),
    ...mapActions("Context", ["setBubblePopup", "setDropBox"]),
    ...mapActions("AppData", ["onChatClick", "setModuleLink", "setMainside"]),
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
    },
    showMenu() {
      if (this.sideMenu) this.sideMenu = false;
      else this.sideMenu = true;
    },
    back() {
      this.$router.push("/").catch(err => {});
      this.onChatClick({ cnt: false, module: "" });
    }
  },
  beforeDestroy() {
    this.back();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
#module-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: white;

  // ===================== Header =======================

  .header {
    position: relative;
    flex: 0 0 3.6rem;
    background-color: $info-color;
    border-bottom: solid 0.063rem rgba(136, 152, 170, 0.12);
  }

  .header-box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 0 1rem;
  }

  .back-button {
    color: $primary-color;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    width: 22px;

    i {
      animation-duration: 0.3s;
      transform: rotate(90deg);
    }
  }

  .burger {
    color: $primary-color;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    width: 22px;
  }

  .title {
    margin-left: 1rem;
    color: $secondary-color;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .control-box {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
    height: 100%;
  }

  .button-box {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    margin-left: 0.2rem;
  }

  .ico-box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0.4rem;
    border-radius: 50%;
    transition: all 0.2s;
  }

  .ico-box > .material-icons {
    color: $primary-color;
  }

  .mobile
    > .header
    > .header-box
    > .control-box
    > .button-box
    > .ico-box:active {
    background-color: rgba(239, 83, 83, 0.3);
  }

  .desktop
    > .header
    > .header-box
    > .control-box
    > .button-box
    > .ico-box:hover
    > .material-icons {
    color: $primary-color;
  }

  .desktop
    > .header
    > .header-box
    > .control-box
    > .button-box
    > .ico-box:active {
    background-color: rgba(239, 83, 83, 0.3);
  }

  .material-icons {
    color: $secondary-color;
    line-height: 100%;
    font-size: 1.4rem !important;
  }

  .modules {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>