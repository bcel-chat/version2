<template>
  <div id="image-viewer">
    <div class="_container">
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div
          class="top-bar"
          v-if="mobileMode || hover && !mobileMode"
          style="animation-duration: .5s"
        >
          <i
            class="material-icons"
            title="Close"
            role="button"
            @click.stop="setImageViewer('')"
          >close</i>
          <span class="name">{{ imageViewer.uid == myID ? 'You' : imageViewer.name }}</span>
          <i class="material-icons" title="Menu" role="button">more_vert</i>
        </div>
      </transition>
      <div class="viewer" @mousemove="hoverImg" @click="setImageViewer('')">
        <img :src="imageViewer.url" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
import { mapActions, mapState } from "vuex";
export default {
  props: ["imageUrl"],
  data() {
    return {
      hover: false,
      delay: ""
    };
  },
  beforeMount() {
    this.delay = debounce(this.delayDisplay, 2000);
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["imageViewer", "mobileMode"])
  },
  methods: {
    ...mapActions("AppData", ["setImageViewer"]),
    hoverImg() {
      this.hover = true;
      this.delay();
    },
    delayDisplay() {
      this.hover = false;
    }
  }
};
</script>


<style lang="scss" scoped>
#image-viewer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
}

._container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: black;
}

.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  flex: 0 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  box-shadow: 0 0.3rem 0.3rem -0.1rem rgba(0, 0, 0, 0.3);
  color: white;
  z-index: 1;
  i {
    flex: 0 0 1rem;
    &:hover {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .name {
    flex: 1 1 auto;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 1rem;
  }
}

.viewer {
  flex: 1 1 auto;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>