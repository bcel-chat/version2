<template>
  <div id="info">
    <div class="header-box">
      <div class="back-button" role="button" @click="showInfo(false)">
        <transition enter-active-class="animated zoomIn">
          <i
            class="material-icons"
            v-if="startUp"
            key="1"
          >{{ mobileMode ? 'arrow_downward' : 'close'}}</i>
        </transition>
      </div>
      <!-- End back-button -->
      <span class="title">{{ roomType == 1 ? 'Contact Info' : 'Group Info'}}</span>
    </div>
    <div class="_container">
      <div class="header">
        <!-- End header-box -->
        <div class="profile-box">
          <div class="picture-box" role="button">
            <img
              v-if="imageValid"
              :src="`${picURL}${roomType == 1 ? userRoom.uid : participantRoom.rid }/${roomType == 1 ? userRoom.picture : participantRoom.img}`"
              alt
              class="picture"
              @error="imgValid"
            />
            <img v-else class="picture_default" src="@/assets/img/user.svg" alt srcset />
          </div>
          <div class="name-title-box">
            <div class="name-space">
              <div
                class="choose-box"
                role="button"
                @mouseover="fileHover = true"
                @mouseleave="fileHover = false"
              >
                <transition-group
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut"
                >
                  <label
                    for="file"
                    v-if="fileHover && imageValid && roomType == 2"
                    class="bl-file"
                    role="button"
                    key="1"
                  >
                    <span class="file-icon-box">
                      <i class="material-icons">photo_camera</i>
                    </span>
                  </label>
                  <label
                    for="file"
                    v-if="fileHover && !imageValid"
                    class="bl-file-valid"
                    role="button"
                    key="2"
                  ></label>
                  <input
                    type="file"
                    name="file"
                    ref="profile"
                    id="file"
                    class="file"
                    key="3"
                    v-if="roomType == 2"
                    @change="openCropSide"
                    accept=".jpeg, .jpg, .png, .gif, .bmp, .ico, .svg"
                  />
                </transition-group>
              </div>
            </div>
            <div class="name-box">
              <div :class="['name', editName ? 'border-top' : '']">
                <div
                  class="_input"
                  ref="inputName"
                  :contenteditable="editName"
                  @keydown="preventA"
                >{{ roomType == 1 ? userRoom.displayname : participantRoom.rname }}</div>
                <transition-group
                  tag="span"
                  enter-active-class="animated zoomIn"
                  leave-active-class="animated zoomOut"
                  class="ico"
                  role="button"
                >
                  <i
                    class="material-icons"
                    v-if="!editName && roomType == 2"
                    @click="toEdit(1)"
                    key="1"
                  >edit</i>
                  <i
                    class="material-icons"
                    v-else-if="editName && roomType == 2"
                    @click="saveName(1)"
                    key="2"
                    style="font-weight: 900"
                  >check</i>
                </transition-group>
              </div>
              <!-- <span class="name">{{ roomType == 1 ? userRoom.displayname : participantRoom.rname }}</span> -->
            </div>
          </div>
        </div>
      </div>
      <!-- End header -->
      <div class="body">
        <div class="desc-box">
          <div class="desc-box-inside">
            <div class="_title">Description</div>
            <div :class="['desc', editDesc ? 'border' : '']">
              <div
                class="_input"
                ref="inputDesc"
                :contenteditable="editDesc"
                @keydown="preventB"
              >{{ roomType == 1 ? userRoom.desc : participantRoom.desc }}</div>
              <transition-group
                tag="span"
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut"
                class="ico"
                role="button"
              >
                <i
                  class="material-icons"
                  v-if="!editDesc && roomType == 2"
                  @click="toEdit(2)"
                  key="1"
                >edit</i>
                <i
                  class="material-icons"
                  v-else-if="editDesc && roomType == 2"
                  @click="saveDesc(2)"
                  key="2"
                  style="font-weight: 900"
                >check</i>
              </transition-group>
            </div>
          </div>
        </div>
        <div class="content-box" v-if="roomType == 2">
          <div class="title-search-box">
            <div class="participant-title">
              <span class="num">{{ participantInfo.length }}</span>
              <span class="p-title">Participants</span>
            </div>
            <div class="search-box" role="button" title="Search participants">
              <Magnify title="Search participants"></Magnify>
            </div>
          </div>
          <div class="add-box" v-if="adminStatus">
            <div
              key="index"
              class="item-inbox"
              ref="itemInbox"
              role="button"
              @click="addParticipant"
            >
              <div class="avatar-inbox-panel">
                <div class="avatar-inbox">
                  <i class="material-icons">person_add</i>
                </div>
              </div>
              <!-- End avatar-inbox-panel -->
              <div class="inbox-detail">
                <div class="name-time-box">
                  <div class="sender-name-box">Add participant</div>
                </div>
              </div>
            </div>
          </div>
          <div class="participant">
            <InfoParticipant></InfoParticipant>
          </div>
          <div class="control-box" role="button" @click="setConfirm(true)">
            <span id="exit">
              <i class="material-icons">exit_to_app</i>
              <span class="exit-text">Exit this group</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <Cropper
        v-if="openCropInfo"
        :img="picture"
        :imgValue="pictureValue"
        :style="styling.all"
        :filename="filename"
        page="3"
        @btnClear="clearFile"
        @btnClearDone="clearDone"
      ></Cropper>
    </transition>
  </div>
</template>

<script>
// import Context from "@/components/context/Context.vue";
import InfoParticipant from "@/components/sidebars/InfoParticipant.vue";
import Cropper from "@/components/sidebars/subcomponents/Cropper.vue";
import { mapState, mapActions } from "vuex";

import Magnify from "vue-material-design-icons/Magnify.vue";

export default {
  components: {
    Magnify,
    Cropper,
    InfoParticipant
  },
  data() {
    return {
      styling: {
        all: {
          animationDuration: ".2s"
        },
        control1: {
          animationDuration: ".5s"
        },
        control2: {
          animationDuration: ".3s"
        }
      },
      imageValid: true,
      fileHover: false,
      startUp: true,
      editName: false,
      editDesc: false,
      picURL: process.env.VUE_APP_PICTURE_PROFILE,
      picture: null,
      pictureValue: null,
      filename: ""
    };
  },
  beforeMount() {
    this.getParticipantInfo();
  },
  mounted() {
    this.getRoomID(this.participantRoom.rid);
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode", "openCropInfo"]),
    ...mapState("Chat", ["message", "roomType"]),
    ...mapState("Room", [
      "roomStatus",
      "userRoom",
      "participantRoom",
      "participantInfo"
    ]),
    ...mapState("Group", ["adminStatus"]),
    ...mapState("Context", ["roomArrow"])
  },
  methods: {
    ...mapActions("AppData", [
      "showInfo",
      "showCrop",
      "showAddParticipantPanel"
    ]),
    ...mapActions("Group", ["groupPicture", "getRoomID"]),
    ...mapActions("Context", ["setConfirm"]),
    ...mapActions("Room", ["updateGroupName", "getParticipantInfo"]),
    openCropSide(input) {
      // let blob = new Blob([e.target.files[0]], { type: "image/png" });
      // this.picture = URL.createObjectURL(blob);
      // this.pictureValue = e.target;
      // this.filename = e.target.files[0].name;
      // this.showCrop({ show: true, page: 2 });
      const width = 500;
      var reader = new FileReader();
      reader.onload = event => {
        var img = new Image();
        var filePath = input.target.value;
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.ico|\.svg)$/i;
        if (!allowedExtensions.exec(filePath)) {
          return;
        }
        img.src = event.target.result;
        img.onload = () => {
          if (img.width > width) {
            var oc = document.createElement("canvas"),
              octx = oc.getContext("2d");
            oc.width = img.width;
            oc.height = img.height;
            octx.drawImage(img, 0, 0);
            while (oc.width * 0.5 > width) {
              oc.width *= 0.5;
              oc.height *= 0.5;
              octx.drawImage(oc, 0, 0, oc.width, oc.height);
            }
            oc.width = width;
            oc.height = (oc.width * img.height) / img.width;
            octx.drawImage(img, 0, 0, oc.width, oc.height);
            fetch(oc.toDataURL())
              .then(res => res.blob())
              .then(blob => {
                this.picture = URL.createObjectURL(blob);
                this.pictureValue = input.target;
                this.filename = input.target.files[0].name;
                this.showCrop({ show: true, page: 2 });
              });
          } else {
            fetch(img.src)
              .then(res => res.blob())
              .then(blob => {
                this.picture = URL.createObjectURL(blob);
                this.pictureValue = input.target;
                this.filename = input.target.files[0].name;
                this.showCrop({ show: true, page: 2 });
              });
          }
        };
      };
      reader.readAsDataURL(input.target.files[0]);
    },
    clearFile(e) {
      this.$refs.profile.value = e;
      this.groupPicture(e);
    },
    clearDone(e) {
      this.$refs.profile.value = e;
    },
    addParticipant() {
      this.showAddParticipantPanel(true);
    },
    toEdit(page) {
      if (page == 1) {
        this.editName = true;
        this.$nextTick(() => {
          this.$refs.inputName.focus();
        });
      } else {
        this.editDesc = true;
        this.$nextTick(() => {
          this.$refs.inputDesc.focus();
        });
      }
    },
    saveName(page) {
      this.updateGroupName({
        rid: this.participantRoom.rid,
        text: this.$refs.inputName.innerText,
        _page: page
      });
      this.editName = false;
    },
    saveDesc(page) {
      this.updateGroupName({
        rid: this.participantRoom.rid,
        text: this.$refs.inputDesc.innerText,
        _page: page
      });
      this.editDesc = false;
    },
    imgValid() {
      this.imageValid = false;
    },
    preventA() {
      let value = this.$refs.inputName.innerText;
      if (value.length > 25 && event.keyCode != 8) event.preventDefault();
      if (event.keyCode == 13) {
        this.saveName(1);
        event.preventDefault();
      }
    },
    preventB() {
      let value = this.$refs.inputDesc.innerText;
      if (value.length > 25 && event.keyCode != 8) event.preventDefault();
      if (event.keyCode == 13) {
        this.saveDesc(2);
        event.preventDefault();
      }
    }
  },
  destroyed() {
    this.showAddParticipantPanel(false);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/Info.scss";
</style>