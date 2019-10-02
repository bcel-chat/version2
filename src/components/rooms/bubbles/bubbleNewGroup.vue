<template>
  <div id="bubble-new-group">
    <div class="bubble-container new-group">
      <span class="line">
        <div
          class="new-group-box"
        >{{`${msg.uid == myID ? 'You created this group' : `${msg.displayname} added you to this group`}`}}</div>
      </span>
    </div>
  </div>
</template>

<script>
import code from "@/helper/father";
import { mapState } from "vuex";

export default {
  props: ["msg"],
  computed: {
    ...mapState("Identify", ["myID"]),
    userRoomCheck() {
      if (this.item.uid == this.myID) return "You: ";
      else return `${this.item.sender} `;
    }
  }
};
</script>

<style lang="scss" scoped>
.bubble-container.new-group {
  .line {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    padding: 1rem 0;

    .new-group-box {
      font-size: 0.75rem;
      padding: 0.3rem 0.6rem;
      line-height: 100%;
    }

    .line-inside {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      align-items: stretch;
      height: 1px;
      opacity: 0.4;
      margin: 0 0.3rem;
      background-color: rgb(172, 172, 172);
    }
  }
}
</style>
