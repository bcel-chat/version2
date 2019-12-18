<template>
  <div id="context" @click="$emit('dismiss')">
    <div class="context-menu" :style="menuPosition" ref="menu">
      <div class="_containe">
        <div class="items">
          <div
            class="item"
            role="button"
            v-if="roomArrow.val.admin == 0"
            @click="setAdmin({uid: roomArrow.val.uid, rid: roomArrow.val.rid, assign: myID, _page: 1})"
          >Make group admin</div>
          <div
            class="item"
            role="button"
            v-else-if="roomArrow.val.admin == 1 && roomArrow.val.uid != myID"
            @click="setAdmin({uid: roomArrow.val.uid, rid: roomArrow.val.rid, assign: myID, _page: 2})"
          >Dismiss as admin</div>
          <div
            class="item"
            role="button"
            @click="setAdmin({uid: roomArrow.val.uid, rid: roomArrow.val.rid, assign: myID, _page: 3})"
          >Remove</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["roomArrow"],
  data() {
    return {
      menuPosition: ""
    };
  },
  mounted() {
    this.showContext();
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode"])
  },
  methods: {
    ...mapActions("Context", ["setRoomArrow", "setAdmin"]),
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
    getPositionMobile(e) {
      var posx = 0,
        posy = 0;
      if (!e) var e = window.event;
      if (e.touches[0].pageX || e.touches[0].pageY) {
        posx = e.touches[0].pageX;
        posy = e.touches[0].pageY;
      } else if (e.touches[0].pageX || e.touches[0].pageY) {
        posx =
          e.touches[0].pageX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        posy =
          e.touches[0].pageY +
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

      if (this.roomArrow.event.type == "touchstart")
        clickCoords = this.getPositionMobile(this.roomArrow.event);
      else if (this.roomArrow.event.type == "click")
        clickCoords = this.getPosition(this.roomArrow.event);

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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#context {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
}

.context-menu {
  position: absolute;
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