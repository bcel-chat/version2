<template>
  <div id="cropper">
    <div class="_container">
      <div class="picture-zone">
        <img :src="img" id="croppr" ref="croppr" />
      </div>
      <div id="footer">
        <div class="btn-box">
          <span role="button" @click="cancel">Cancel</span>
          <span role="button" @click="getCrop">Done</span>
        </div>
      </div>
    </div>
    <img src alt srcset />
  </div>
</template>

<script>
import Croppr from "croppr";
import "croppr/dist/croppr.css";
import { mapActions } from "vuex";
export default {
  props: ["img", "imgValue", "page", "filename"],
  data() {
    return {
      picture: null,
      cropper: null,
      pictureCallback: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.cropper = new Croppr(this.$refs.croppr, {
        maxSize: [500, 500, "px"],
        minSize: [50, 50, "px"],
        aspectRatio: 1
      });
    }, 100);
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
    getCrop() {
      const y = this.cropper.getValue().y;
      const x = this.cropper.getValue().x;
      const width = this.cropper.getValue().width;
      const height = this.cropper.getValue().height;

      var input = this.$props.imgValue;

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = event => {
          var img = new Image();
          img.onload = () => {
            var oc = document.createElement("canvas"),
              octx = oc.getContext("2d");
            oc.width = img.width;
            oc.height = img.height;
            octx.drawImage(img, 0, 0);
            var imageData = octx.getImageData(x, y, width, height);

            var canvas1 = document.createElement("canvas");
            canvas1.width = width;
            canvas1.height = height;
            var ctx1 = canvas1.getContext("2d");
            ctx1.rect(0, 0, 100, 100);
            ctx1.fillStyle = "white";
            ctx1.fill();
            ctx1.putImageData(imageData, 0, 0);

            const base64 = canvas1.toDataURL();
            let bl;
            fetch(base64)
              .then(res => res.blob())
              .then(blob => {
                const file = new File([blob], this.$props.filename);
                if (this.page == 1) {
                  this.setGroupPicture(file);
                  this.groupPicture(URL.createObjectURL(blob));
                } else if (this.page == 2) {
                  this.setProfilePicture(file);
                } else if (this.page == 3) {
                  this.setGroupPictureInfo(file);
                  this.groupPicture(URL.createObjectURL(blob));
                }
              });
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(input.files[0]);
        this.showCrop({ show: false, page: 0 });
      }
      this.$emit("btnClearDone", null);
    },
    cancel() {
      this.showCrop({ show: false, page: 0 });
      this.$emit("btnClear", null);
    }
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
        color: $secondary-color;
      }
    }
  }
}
</style>
