<template>
  <div id="bubble-popup">
    <div class="content" @click="setBubblePopup(false)">
      <transition name="bounce">
        <div class="item-box" v-if="startUp">
          <div class="item" role="button" @click="replyMessage(),setToEdit(false)">Quote</div>
          <div class="line" v-if="popupData.uid != myID"></div>
          <div class="item" role="button" @click="setForwardPopup(true)">Forward</div>
          <div class="line" v-if="popupData.uid == myID && popupData.type != 4"></div>
          <div
            class="item edit"
            role="button"
            @click="replyMessage(), setToEdit(true)"
            v-if="popupData.uid == myID && popupData.type != 4 && popupData.type != 5"
          >Edit message</div>
          <div
            class="line"
            v-if="popupData.uid == myID && popupData.type != 4 && popupData.type != 5"
          ></div>
          <div
            class="item delete"
            role="button"
            @click="deleteMessage"
            v-if="popupData.uid == myID"
          >Delete message</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      startUp: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.startUp = true;
    }, 100);
  },
  beforeDestroy() {
    this.startUp = false;
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("Context", ["popupData"])
  },
  methods: {
    ...mapActions("Context", [
      "setBubblePopup",
      "deleteMessage",
      "setForwardPopup",
      "setToEdit"
    ]),
    ...mapActions("Chat", ["getReplyBoxData", "setReplyBoxToggle"]),
    replyMessage() {
      this.getReplyBoxData({
        cid: this.popupData.cid
      });
      this.setReplyBoxToggle({
        toggle: true,
        cid: this.popupData.cid
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
#bubble-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 120;
}

.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.item-box {
  position: relative;
  background-color: white;
  border-radius: 1rem;
  padding: 0.6rem 0;
  width: 16rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  .line {
    margin: 0.2rem 0;
    height: 0.07rem;
    width: 80%;
    background-color: #dfdfdf;
  }
  .item {
    color: #424141;
    padding: 0.6rem 0;
    font-weight: 400;
    width: 100%;
    text-align: center;
    &.delete {
      color: red;
    }

    &.edit {
      color: blue;
    }

    &:hover {
      background-color: $info-color;
    }
    &:active {
      background-color: #f1f1f1;
    }
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(3);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>