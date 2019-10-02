<template>
  <div id="confirm">
    <div class="container">
      <transition name="bounce">
        <div class="item-box" v-if="startUp">
          <div class="item-box-inside">
            <div class="title">Confirm!</div>
            <div class="sub-title">Do you want to exit this group?</div>
            <div class="action-box" role="button">
              <span class="control no" @click="setConfirm(false)">No</span>
              <span class="control yes" @click="exit()">Yes</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      startUp: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.startUp = true;
    }, 300);
  },
  methods: {
    ...mapActions("Context", ["setConfirm"]),
    ...mapActions("Room", ["deleteParticipant"]),
    exit() {
      this.deleteParticipant();
      this.setConfirm(false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
#confirm {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 120;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-box {
  position: relative;
  width: 16rem;
  height: 10rem;
  border-radius: 1rem;
  border: solid 0.08rem #e9e9e9;
  background-color: white;
  box-shadow: 0 0.2rem 0.5rem -0.15rem rgba(0, 0, 0, 0.3);
  overflow: hidden;
  color: $secondary-color;
}

.item-box-inside {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  .title {
    margin-top: 0.5rem;
    font-size: 1.5rem;
  }
  .sub-title {
    flex: 0 0 auto;
    text-align: center;
    font-size: 1rem;
    width: 100%;
    margin-top: 0.8rem;
    margin-bottom: 1rem;
  }
  .action-box {
    flex: 1 1 auto;
    width: 100%;
    border-top: solid 0.1rem #e9e9e9;
    display: flex;
    justify-content: center;
    align-items: center;
    .control {
      position: relative;
      height: 100%;
      flex: 1 1 auto;
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .yes {
      border-left: solid 0.1rem #e9e9e9;
      font-weight: 600;
      color: $primary-color;
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