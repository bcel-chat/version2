<template>
  <div id="create-group">
    <div class="_container">
      <div class="header">
        <div class="header-box">
          <div class="back-button" role="button" @click="showGroupSubject(false)">
            <transition enter-active-class="animated zoomIn">
              <i class="material-icons" v-if="startUp" key="1">arrow_downward</i>
            </transition>
          </div>
          <!-- End back-button -->
          <span class="title">
            <span class="main">New group</span>
            <span class="sub">Add subject</span>
          </span>
        </div>
        <!-- End header-box -->
      </div>
      <!-- End header -->
      <div class="content">
        <transition-group tag="div" enter-active-class="animated fadeIn" class="group-profile-box">
          <div class="desc-box" key="1" :style="styling.all" v-if="startUp">
            <div class="avatar-inbox-panel">
              <div class="avatar-inbox">
                <img v-if="groupPictures" :src="groupPictures" class="avatar" alt />
                <img v-else src="@/assets/img/camera.svg" class="avatar-defualt" alt srcset />
                <label for="profileSubject" class="brows-box" role="button"></label>
                <input
                  type="file"
                  id="profileSubject"
                  ref="profile"
                  @change="openCropSideSubject"
                  accept=".jpeg, .jpg, .png, .gif, .bmp, .ico, .svg"
                />
              </div>
            </div>
            <div class="_control _edit-able">
              <div :class="['input-box', focused ? 'input-border' : '']">
                <input
                  type="text"
                  v-model="desc"
                  maxlength="25"
                  class="input"
                  ref="desc"
                  autofocus
                  @focus="_focus"
                  @blur="focused = false"
                  placeholder="Enter subject here..."
                />
                <!-- End input -->
                <transition-group
                  tag="span"
                  class="icbox"
                  name="bounce-edit"
                  enter-active-class="animated zoomIn"
                  leave-active-class="animated zoomOut"
                >
                  <div class="ico-box" :style="styling.all" key="1" v-if="desc">{{counter}}</div>
                  <!-- End ico-box -->
                </transition-group>
              </div>
              <!-- input-box -->
            </div>
            <!-- _control _edit-able -->
          </div>
          <div class="desc-button-box" :key="2" :style="styling.all" v-if="startUp">
            <span class="_title">Provide a group subject and optional group icon</span>
            <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
              <span
                class="btn-done"
                role="button"
                v-if="desc && participantAdded.length > 0"
                :style="styling.all"
                @click="createGroup(false)"
              >
                <i class="material-icons" key="1">done</i>
              </span>
            </transition>
          </div>
        </transition-group>
        <!-- End group-profile-box -->
        <transition-group tag="div" enter-active-class="animated fadeInUp" class="participant-box">
          <div class="participant-title" :key="1" :style="styling.all" v-if="startUp">
            <span>Participants: {{participantAdded.length}}</span>
          </div>
          <!-- End participant-title -->
          <div class="members-section" key="2" :style="styling.all" v-if="startUp">
            <transition-group
              tag="div"
              leave-active-class="animated zoomOut"
              class="members-box"
              :style="participantAdded.length > 0 ? styling.pad : ''"
            >
              <template v-for="item in participantAdded">
                <Chip :values="item" :key="item.uid" style="animation-duration: .4s"></Chip>
              </template>
            </transition-group>
          </div>
          <!-- End members-section -->
        </transition-group>
        <!-- End participant-box -->
      </div>
      <!-- End content -->
    </div>
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <Cropper
        v-if="openCrop"
        :img="picture"
        :imgValue="pictureValue"
        :style="styling.all"
        :filename="filename"
        page="1"
        @btnClear="clearFile"
        @btnClearDone="clearDone"
      ></Cropper>
    </transition>
    <!-- End _container -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Chip from "@/components/sidebars/subcomponents/Chip.vue";
import Cropper from "@/components/sidebars/subcomponents/Cropper.vue";
import code from "@/helper/father";
import ds from "@/helper/deepstream";

export default {
  components: {
    Chip,
    Cropper
  },
  data() {
    return {
      btnDone: false,
      textMax: 25,
      counter: 0,
      showIco: false,
      startUp: false,
      focused: false,
      styling: {
        all: {
          animationDuration: ".2s"
        },
        input: {
          animationDuration: ".8s"
        },
        pad: {
          padding: "1rem .8rem"
        }
      },
      desc: "",
      floatDesc: "",
      picture: "",
      pictureValue: null,
      base64: null,
      filename: ""
    };
  },
  watch: {
    desc() {
      if (this.desc) this.btnDone = true;
      this.counter = this.textMax - this.desc.length;
    }
  },
  mounted() {
    this.counter = this.textMax - this.desc.length;
    setTimeout(() => {
      this.startUp = true;
    }, 300);
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode", "openCrop"]),
    ...mapState("Group", ["participantAdded", "groupPictures", "roomID"])
  },
  methods: {
    ...mapActions("AppData", [
      "showNewChat",
      "groupCreated",
      "showCrop",
      "showGroupSubject"
    ]),
    ...mapActions("Group", ["setGroup", "groupPicture"]),
    ...mapActions("Chat", ["setMessageCreateGroup"]),
    createGroup() {
      this.setGroup({
        rid: this.roomID,
        uid: this.myID,
        name: this.desc,
        img: "",
        active: 1,
        _page: 2
      });
      this.setMessageCreateGroup({
        type: 1,
        uid: this.myID,
        rid: this.roomID,
        type: 2
      });
      const list = ds.record.getList(`participant${this.myID}`);

      let i = 0;
      let entry = list.getEntries();
      entry.forEach(e => {
        i++;
        ds.event.emit(`room/${e}`, "");
        if ((i = entry.length)) list.removeEntry();
      });
      this.groupCreated(false);
    },
    counterText(e) {
      if (e.target.innerText) this.btnDone = true;
      else this.btnDone = false;

      this.counter = this.textMax - e.target.innerText.length;
    },
    prevent(event) {
      let value = this.$refs.inputDesc.innerText;
      if (value.length > this.textMax - 1 && event.keyCode != 8)
        event.preventDefault();
    },
    floatControl() {
      const txt = this.$refs.inputDesc.innerText;
      if (txt != "") {
        this.floatDesc = "floating-top";
        this.showIco = true;
      } else {
        this.floatDesc = "";
        this.showIco = false;
      }
    },
    floating(e) {
      if (this.mobileMode) {
        this.editPanel = e;
        if (e) this._focus();
      } else {
        return;
      }
    },
    _focus() {
      setTimeout(() => {
        this.focused = true;
        this.$refs.desc.focus();
      }, 100);
    },
    openCropSideSubject(input) {
      console.log("input subject", input.target.files[0]);

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
      this.groupPicture(e);
    },
    clearDone(e) {
      this.$refs.profile.value = e;
    }
  },
  beforeDestroy() {
    this.groupPicture(null);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/GroupSubject.scss";
</style>