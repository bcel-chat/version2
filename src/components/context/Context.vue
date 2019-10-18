<template>
  <div id="context-menu" :style="menuPosition" ref="menu">
    <div class="_containe">
      <div class="items">
        <div class="item" role="button" @click="demo">Delete chat</div>
        <div class="item" role="button">Exit this group</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      menuPosition: ""
    };
  },
  mounted() {
    this.showContext();
    window.addEventListener("resize", () => {
      this.setRoomArrow("");
    });
    document.addEventListener("mousedown", this.checkOnClick);
  },
  computed: {
    ...mapState("Context", ["roomArrow"])
  },
  methods: {
    ...mapActions("Context", ["setRoomArrow"]),
    checkOnClick(e) {
      if (e.target.className == "item")
        setTimeout(() => {
          this.setRoomArrow("");
        }, 200);
      else this.setRoomArrow("");
    },
    getPosition(e) {
      var posx = 0,
        posy = 0;
      if (!e) var e = window.event;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      return {
        x: posx,
        y: posy
      };
    },
    showContext() {
      let clickCoords, clickCoordsX, clickCoordsY, menuWidth, menuHeight;

      let windowWidth, windowHeight, top, left;

      clickCoords = this.getPosition(this.roomArrow);
      clickCoordsX = clickCoords.x;
      clickCoordsY = clickCoords.y;
      menuWidth = this.$refs.menu.offsetWidth + 4;
      menuHeight = this.$refs.menu.offsetHeight + 4;

      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;

      if (windowWidth - clickCoordsX < menuWidth) {
        left = windowWidth - menuWidth - 0;
      } else {
        left = clickCoordsX - 0;
      }

      if (Math.abs(windowHeight - clickCoordsY) < menuHeight) {
        top = windowHeight - menuHeight - 0;
      } else {
        top = clickCoordsY - 0;
      }

      this.menuPosition = {
        top: `${top}px`,
        left: `${left}px`
      };
    },
    demo(e) {
      console.log(5555);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.setRoomArrow("");
    });
    document.removeEventListener("mousedown", this.checkOnClick);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#context-menu {
  position: absolute;
  z-index: 200;
}

._containe {
  position: relative;
  background-color: $info-color;
  border-radius: 0.1rem;
  border: solid 0.05rem $border-color;
  box-shadow: 0 0.1rem 0.2rem -0.05rem rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.items {
  position: relative;
  display: flex;
  padding: 1rem 0;
  width: 10rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .item {
    position: relative;
    width: 100%;
    padding: 0.2rem 0.5rem;
    &:hover {
      background-color: rgba(239, 83, 83, 0.2);
    }
  }
}
</style>