<template>
  <div id="cropper">
    <div class="_container">
      <div class="picture-zone">
        <!-- <img :src="img" id="croppr" :class="rotate" ref="croppr" /> -->
        <vue-cropper
          ref="cropper"
          :src="img"
          alt="Source Image"
          :aspect-ratio="1 / 1"
          :initialAspectRatio="1 / 1"
          :auto-crop-area="0.8"
          :guides="true"
          :view-mode="2"
          :background="false"
          :rotatable="true"
          :min-container-width="300"
          :min-container-height="300"
        ></vue-cropper>
      </div>
      <div id="footer">
        <div class="btn-box">
          <span role="button" @click="cancel">Cancel</span>
          <span role="button" title="Rotate 90 degrees" @click="toRotate">
            <i class="material-icons">rotate_90_degrees_ccw</i>
          </span>
          <span role="button" @click="getCrop">Done</span>
        </div>
      </div>
    </div>
    <!-- <img src alt srcset /> -->
    <div class="loading" v-if="load">
      <HalfCircleSpinner :animation-duration="800" :size="100" :color="'#ef3434'" />
      <div class="load-text">Please wait...</div>
    </div>
  </div>
</template>

<script>
import Croppr from "croppr";
import "croppr/dist/croppr.css";
import { mapActions } from "vuex";

import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

import { HalfCircleSpinner } from "epic-spinners";

export default {
  props: ["img", "imgValue", "page", "filename"],
  components: {
    HalfCircleSpinner,
    VueCropper
  },
  data() {
    return {
      load: false,
      picture: null,
      cropper: null,
      pictureCallback: null,
      angle: 0
    };
  },
  mounted() {
    setTimeout(() => {
      this.cropper = new Croppr(this.$refs.croppr, {
        maxSize: [500, 500, "px"],
        minSize: [50, 50, "px"],
        aspectRatio: 1
      });
    }, 150);
  },
  methods: {
    ...mapActions("AppData", ["showCrop"]),
    ...mapActions("Group", [
      "groupPicture",
      "setGroupPicture",
      "setGroupPictureInfo"
    ]),
    ...mapActions("Settings", [
      "setProfilePicture",
      "ProfilePicture",
      "uploadFile"
    ]),
    toRotate() {
      this.angle = (this.angle + 90) % 360;
      this.$refs.cropper.rotate(this.angle);
    },
    getCrop() {
      this.load = true;
      // const y = this.cropper.getValue().y;
      // const x = this.cropper.getValue().x;
      // const width = this.cropper.getValue().width;
      // const height = this.cropper.getValue().height;

      // var input = this.imgValue;

      // if (input.files && input.files[0]) {
      //   var reader = new FileReader();
      //   reader.onload = event => {
      //     var img = new Image();
      //     img.src = event.target.result;
      //     img.onload = () => {
      //       var oc = document.createElement("canvas"),
      //         octx = oc.getContext("2d");
      //       oc.width = img.width;
      //       oc.height = img.height;
      //       octx.drawImage(img, 0, 0);

      //       // var oc = document.createElement("canvas"),
      //       //   octx = oc.getContext("2d");
      //       // oc.width = img.width;
      //       // oc.height = img.height;
      //       // octx.drawImage(img, 0, 0);
      //       // while (oc.width * 0.5 > 500) {
      //       //   oc.width *= 0.5;
      //       //   oc.height *= 0.5;
      //       //   octx.drawImage(oc, 0, 0, oc.width, oc.height);
      //       // }
      //       // oc.width = 500;
      //       // oc.height = (oc.width * img.height) / img.width;

      //       // octx.drawImage(img, 0, 0, oc.width, oc.height);

      //       var imageData = octx.getImageData(x, y, width, height);

      //       var canvas1 = document.createElement("canvas");
      //       canvas1.width = width;
      //       canvas1.height = height;
      //       var ctx1 = canvas1.getContext("2d");
      //       ctx1.rect(0, 0, 100, 100);
      //       ctx1.fillStyle = "white";
      //       ctx1.fill();
      //       ctx1.putImageData(imageData, 0, 0);

      const base64 = this.$refs.cropper.getCroppedCanvas().toDataURL();
      fetch(base64)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], this.filename);
          if (this.page == 1) {
            // for group
            this.setGroupPicture(file);
            this.groupPicture(URL.createObjectURL(blob));
          } else if (this.page == 2) {
            // for person
            this.setProfilePicture(file);
          } else if (this.page == 3) {
            // for group info
            this.setGroupPictureInfo(file);
            this.groupPicture(URL.createObjectURL(blob));
          }
        });
      //     };
      //   };
      //   reader.readAsDataURL(input.files[0]);
      //   // this.showCrop({ show: false, page: 0 });
      // }
      // this.$emit("btnClearDone", null);
    },
    cancel() {
      this.showCrop({ show: false, page: 0 });
      this.$emit("btnClear", null);
    }
  },
  beforeDestroy() {
    this.load = false;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
#cropper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 3;
  background-color: black;
  pointer-events: auto;
}
._container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.picture-zone {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
}

#footer {
  flex: 0 0 5rem;
  .btn-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100;
    height: 100%;
    span {
      color: white;
      font-weight: 700;
      padding: 1rem 2rem;
      &:hover {
        color: $semi-secondary-color;
      }
    }
  }
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
  .load-text {
    margin-top: 2rem;
  }
}
</style>
