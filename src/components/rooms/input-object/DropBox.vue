<template>
  <div id="drop" ref="drop">
    <div
      class="drop-zone"
      @dragover.prevent="drag(1)"
      @dragleave.prevent="drag(2)"
      @drop.prevent="drop($event)"
    >
      <div class="drop-box">
        <i class="material-icons">cloud_download</i>
        <span>Drop your file here</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("Context", ["setDropBox"]),
    ...mapActions("Chat", ["setFileBoxToggle", "getFileDropBox"]),
    drag(val) {
      if (val == 1) this.setDropBox(true);
      else this.setDropBox(false);
    },
    drop(ev) {
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        if (ev.dataTransfer.files[i].type)
          this.getFileDropBox(ev.dataTransfer.files[i]);
      }

      setTimeout(() => {
        this.setDropBox(false);
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
#drop {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}
.drop-zone {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.drop-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 95%;
  font-size: 2.5rem;
  color: rgb(255, 255, 255);
  border: dashed 0.15rem black;
  border-radius: 1rem;
  pointer-events: none;
  i {
    margin-bottom: 2rem;
    font-size: 8rem;
  }
}
</style>