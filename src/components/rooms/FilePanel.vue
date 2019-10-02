<template>
  <div id="file-panel">
    <div class="container">
      <div class="head-space"></div>
      <div :class="['panel', active]">
        <div class="panel-card">
          <div class="panel-control" id="panel-control" ref="filePanel">
            <template v-for="(item, index) in items">
              <label :for="item.def" class="control-box" role="button" :key="index">
                <div class="icon-box">
                  <span class="circle" :style="{backgroundColor: item.color}">
                    <i class="material-icons">{{ item.icon }}</i>
                  </span>
                </div>
                <div class="title-box">
                  <span>{{ item.title }}</span>
                </div>
              </label>
            </template>
            <input
              type="file"
              name="picture"
              multiple
              id="picture"
              accept=".jpeg, .jpg, .png, .gif, .bmp, .ico"
              @change="picture"
            />
            <input type="file" name="file" multiple id="file" @change="file" />
          </div>
        </div>
      </div>
      <div class="foot-space"></div>
    </div>
  </div>
</template>

<script>
import randomColor from "randomcolor";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      active: "",
      items: [
        {
          def: "picture",
          icon: "insert_photo",
          title: "Photos",
          color: randomColor({
            luminosity: "dark",
            hue: "random"
          })
        },
        {
          def: "file",
          icon: "insert_drive_file",
          title: "Files",
          color: randomColor({
            luminosity: "dark",
            hue: "random"
          })
        }
      ]
    };
  },
  mounted() {
    this.active = "clip";
  },
  methods: {
    ...mapActions("AppData", ["showFilePanel"]),
    ...mapActions("Chat", ["getFile"]),
    picture(e) {
      this.getFile({ file: e.target.files, page: 1 });
      this.showFilePanel(false);
    },
    file(e) {
      this.getFile({ file: e.target.files, page: 2 });
      this.showFilePanel(false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
#file-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
  pointer-events: auto;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.head-space {
  flex: 1 1 auto;
  order: 1;
}
.panel {
  flex: 0 0 auto;
  order: 2;
  padding: 0 0.625rem;
  @media screen and (min-width: 760px) {
    display: flex;
    justify-content: flex-end;
    padding: 0 10%;
  }
}
.clip {
  .panel-card {
    clip-path: circle(100%);
  }
}
.panel-card {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 0.3rem;
  background-color: white;
  clip-path: circle(0% at 78% 100%);
  transition: clip-path 0.4s ease-in-out;
  box-shadow: 0rem 0.113rem 0.425rem -0.225rem rgba(136, 152, 170, 0.8);
  @media screen and (min-width: 760px) {
    width: 15rem;
    margin-right: 3.65rem;
    clip-path: circle(0% at 90% 100%);
  }
}
.panel-control {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  padding: 1.4rem 3rem;
  grid-template-columns: auto auto;
}
.control-box {
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon-box {
    flex: 0 0 70%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
    .circle {
      height: 3rem;
      width: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      line-height: 100%;
      padding: 0.5rem;
      i {
        font-size: 1.4rem;
        color: $info-color;
      }
    }
  }
  .title-box {
    flex: 0 0 30%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: $secondary-color;
  }
}

.foot-space {
  flex: 0 0 3.875rem;
  order: 3;
}

#file {
  display: none;
}
#picture {
  display: none;
}
</style>
