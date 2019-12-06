<template>
  <div id="settings">
    <div class="setting-container" @scroll="Scrolling" ref="scl">
      <div class="header-box-fixed">
        <div class="back-button" role="button" @click="showSideBar(false)">
          <transition enter-active-class="animated zoomIn">
            <i class="material-icons" v-if="startUp" key="1">arrow_downward</i>
          </transition>
        </div>
        <span class="title">Settings</span>
      </div>
      <!-- End header-box-fixed -->
      <div class="header">
        <div class="header-cover">
          <img
            class="cover"
            :src="picURL + profile.picture"
            alt
            draggable="false"
          />
          <span class="behigh"></span>
        </div>
        <!-- End header-cover -->
        <div class="header-box"></div>
        <div class="profile-content">
          <transition
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut"
          >
            <div
              class="profile-box"
              v-if="startUp"
              style="animation-duration: .2s"
            >
              <!-- <img class="profile" :src="profilePicture" alt  /> -->
              <img
                v-if="profile.picture"
                :src="picURL + profile.picture"
                class="avatar"
                alt
                draggable="false"
              />
              <img
                v-else
                src="@/assets/img/user.svg"
                class="avatar-defualt"
                alt
                srcset
              />
              <span class="behigh"></span>
              <label
                for="profile"
                class="brows-icon-box-desktop"
                role="button"
              ></label>
              <label for="profile" class="brows-icon-box" role="button">
                <i class="fas fa-camera"></i>
              </label>
              <input
                type="file"
                id="profile"
                ref="profile"
                @change="openCropSide"
                accept=".jpeg, .jpg, .png, .gif, .bmp, .ico, .svg"
              />
            </div>
          </transition>
          <!-- End profile-box -->
        </div>
        <!-- End profile-content -->
      </div>
      <!-- End header -->
      <div class="content">
        <div class="panel">
          <transition enter-active-class="animated zoomIn">
            <div class="username-box" v-if="startUp" :style="styling.all">
              <div class="username">
                <div class="name">{{ profile.name }}</div>
              </div>
              <div class="about">{{ profile.about }}</div>
            </div>
            <!-- End "username-box -->
          </transition>
          <div class="control-content">
            <transition-group
              tag="div"
              class="control-inside"
              enter-active-class="animated slideInDown"
            >
              <div
                class="control-box"
                :style="styling.control1"
                @click="floating(true, 1)"
                v-if="startUp"
                key="1"
              >
                <div class="_title-box">
                  <span>Name</span>
                </div>
                <div
                  :class="[
                    '_control _edit-able',
                    inputName ? 'input-border' : ''
                  ]"
                >
                  <div :class="['input-box']">
                    <div
                      class="input"
                      id="input-name"
                      v-text="profile.name"
                      ref="inputName"
                      :contenteditable="inputName"
                      @input="setNameText"
                      @keydown="preventA"
                    ></div>
                    <transition-group
                      tag="span"
                      class="icbox"
                      name="bounce-edit"
                      enter-active-class="animated zoomIn"
                      leave-active-class="animated zoomOut"
                    >
                      <div
                        class="ico-box"
                        :style="styling.all"
                        v-if="inputName"
                        :key="1"
                      >
                        <i
                          class="material-icons chk"
                          role="button"
                          @click="editText(1)"
                          title="Save name"
                          >check</i
                        >
                      </div>
                      <div class="ico-box" :style="styling.all" v-else :key="2">
                        <i
                          class="material-icons"
                          role="button"
                          @click="editText(1)"
                          title="Edit name"
                          >edit</i
                        >
                      </div>
                    </transition-group>
                  </div>
                </div>
              </div>
              <!-- End control-box -->
              <div
                class="control-box"
                :style="styling.control2"
                @click="floating(true, 2)"
                key="2"
                v-if="startUp"
              >
                <div class="_title-box">
                  <span>About</span>
                </div>
                <div
                  :class="[
                    '_control _edit-able',
                    inputAbout ? 'input-border' : ''
                  ]"
                >
                  <div class="input-box">
                    <div
                      class="input"
                      id="input-about"
                      v-text="profile.about"
                      ref="inputAbout"
                      :contenteditable="inputAbout"
                      @input="setAboutText"
                      @keydown="preventB"
                    ></div>
                    <!-- End input -->
                    <transition-group
                      tag="span"
                      class="icbox"
                      name="bounce-edit"
                      enter-active-class="animated zoomIn"
                      leave-active-class="animated zoomOut"
                    >
                      <div
                        class="ico-box"
                        :style="styling.all"
                        v-if="inputAbout"
                        :key="1"
                      >
                        <i
                          class="material-icons chk"
                          role="button"
                          @click="editText(2)"
                          title="Save about"
                          >check</i
                        >
                      </div>
                      <!-- End ico-box -->
                      <div class="ico-box" :style="styling.all" v-else :key="2">
                        <i
                          class="material-icons"
                          role="button"
                          @click="editText(2)"
                          title="Edit about"
                          >edit</i
                        >
                      </div>

                      <!-- End ico-box -->
                    </transition-group>
                  </div>
                  <!-- input-box -->
                </div>
                <!-- _control _edit-able -->
              </div>
              <!-- End control-box -->
              <div
                class="menu-config"
                v-if="startUp && userRole == 'admin'"
                key="3"
                role="button"
                @click="setMenuPermission(true)"
              >
                Menu Permission
              </div>
            </transition-group>
            <!-- End control-inside -->
          </div>
          <!-- End control-content -->
          <div class="signout-box">
            <transition enter-active-class="animated zoomIn">
              <button
                :class="[mobileMode ? 'btn-signout' : 'btn-signout-desktop']"
                role="button"
                v-if="startUp"
                :style="styling.all"
                @click="signout"
              >
                Sign out
              </button>
            </transition>
          </div>
          <!-- End signout-box -->
        </div>
        <!-- End panel -->
      </div>
      <!-- End header -->
    </div>
    <!-- End setting-container -->
    <EditPanel
      v-if="editPanel && mobileMode"
      @save="saveTextFloatin"
      @floating="floatingClose"
      :title="title"
      :text="text"
      :page="page"
    ></EditPanel>
    <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <Cropper
        v-if="openCrop"
        :img="picture"
        :imgValue="pictureValue"
        :style="styling.all"
        :filename="filename"
        page="2"
        @btnClear="clearFile"
        @btnClearDone="clearDone"
        @imageCroped="getImage"
      ></Cropper>
    </transition>
    <transition-group
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <MenuPermission
        v-if="menuPermission"
        key="1"
        style="animation-duration: .2s; animation-delay: .2s;"
      ></MenuPermission>
    </transition-group>
  </div>
</template>

<script>
import MenuPermission from "@/components/sidebars/settings/MenuPermission.vue";

import Cropper from "@/components/sidebars/subcomponents/Cropper.vue";
import EditPanel from "@/components/sidebars/subcomponents/EditPanel.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    MenuPermission,
    Cropper,
    EditPanel
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
      startUp: false,
      editPanel: false,
      title: "",
      text: "",
      page: 0,
      focused: false,
      inputName: false,
      inputAbout: false,
      nav: false,
      name: "",
      about: "",
      picture: null,
      pictureValue: null,
      base64: null,
      filename: ""
    };
  },
  beforeMount() {
    this.getProfile(this.myID);
  },
  mounted() {
    setTimeout(() => {
      this.startUp = true;
    }, 300);
    this.name = this.profile.name;
    this.about = this.profile.about;
  },
  computed: {
    ...mapState("Auth", ["userRole"]),
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode", "openCrop", "menuPermission"]),
    ...mapState("Settings", ["profile"]),
    picURL() {
      return process.env.VUE_APP_PICTURE_PROFILE + this.myID + "/";
    }
  },
  methods: {
    ...mapActions("AppData", [
      "showSideBar",
      "showCrop",
      "showInfo",
      "tabActive",
      "setMenuPermission"
    ]),
    ...mapActions("Settings", [
      "setProfilePicture",
      "setName",
      "setAbout",
      "getProfile"
    ]),
    ...mapActions("Auth", ["signout"]),
    preventA() {
      let value = this.$refs.inputName.innerText;
      if (value.length > 25 && event.keyCode != 8) event.preventDefault();
      if (event.keyCode == 13) {
        this.editText(1);
        event.preventDefault();
      }
    },
    preventB() {
      let value = this.$refs.inputAbout.innerText;
      if (value.length > 25 && event.keyCode != 8) event.preventDefault();
      if (event.keyCode == 13) {
        this.editText(2);
        event.preventDefault();
      }
    },
    floating(e, num) {
      if (this.mobileMode) {
        if (num == 1) {
          this.title = "Enter name";
          this.text = this.$refs.inputName.innerText;
          this.page = 1;
        } else {
          this.title = "Enter about";
          this.text = this.$refs.inputAbout.innerText;
          this.page = 2;
        }
        this.editPanel = e;
      } else {
        return;
      }
    },
    setNameText(e) {
      this.name = e.target.innerText;
    },
    setAboutText(e) {
      this.about = e.target.innerText;
    },
    editText(e) {
      if (this.mobileMode) {
        this.inputName = false;
        this.inputAbout = false;
      } else {
        if (e == 1) {
          if (this.inputName) {
            this.inputName = false;
            this.saveTextFloatin({
              data: this.name,
              page: 1
            });
          } else this.inputName = true;

          this.$nextTick(() => {
            this.$refs.inputName.focus();
          });
        } else {
          if (this.inputAbout) {
            this.inputAbout = false;
            this.saveTextFloatin({
              data: this.about,
              page: 2
            });
          } else this.inputAbout = true;
          this.$nextTick(() => {
            this.$refs.inputAbout.focus();
          });
        }
      }
    },
    saveTextFloatin(val) {
      if (val.page == 1) this.setName(val.data);
      else this.setAbout(val.data);
    },
    Scrolling() {
      if (this.$refs.scl.scrollTop >= 58) this.nav = true;
      else this.nav = false;
    },
    openCropSide(input) {
      // let blob_ = new Blob([input.target.files[0]], { type: "image/png" });
      // this.picture = URL.createObjectURL(blob_);
      // this.pictureValue = input.target;
      // this.filename = input.target.files[0].name;
      // this.showCrop({ show: true, page: 1 });

      // return;
      const width = 300;
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
                this.showCrop({ show: true, page: 1 });
              });
          } else {
            fetch(img.src)
              .then(res => res.blob())
              .then(blob => {
                this.picture = URL.createObjectURL(blob);
                this.pictureValue = input.target;
                this.filename = input.target.files[0].name;
                this.showCrop({ show: true, page: 1 });
              });
          }
        };
      };
      reader.readAsDataURL(input.target.files[0]);
    },
    clearFile(e) {
      this.$refs.profile.value = e;
      this.setProfilePicture(e);
    },
    clearDone(e) {
      this.$refs.profile.value = e;
    },
    getImage(e) {
      console.log(e);
    },
    floatingClose(e) {
      this.editPanel = e;
    }
  },
  beforeDestroy() {
    this.showSideBar(false);
    this.showInfo(false);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/settings/Settings.scss";
</style>
