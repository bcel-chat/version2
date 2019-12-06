<template>
  <div id="bubble">
    <div class="bubble-container out">
      <div data-v-f80bd61a class="bubble-box-inside">
        <div data-v-f80bd61a class="bubble-box">
          <div data-v-f80bd61a class="bb-profile-box">
            <!---->
            <div data-v-f80bd61a class="bb-name-time out">
              <span data-v-f80bd61a class="read-msg unread"></span>
              <span data-v-f80bd61a class="_time">{{ moment(new Date()).format('h:mm A') }}</span>
            </div>
          </div>
        </div>
        <div data-v-f80bd61a class="msg-box out">
          <div class="inner">
            <HalfCircleSpinner :animation-duration="800" :size="50" :color="'#ccc'" />
            <span class="up-text">Please wait</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
export default {
  components: {
    HalfCircleSpinner
  },
  data() {
    return {
      moment: this.$moment
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/rooms/bubbles/bubblePicture.scss";

#bubble {
  margin-top: 0.5rem;
}
.out.bubble-container {
  justify-content: flex-end;
  padding-left: 10%;

  @media screen and (min-width: 760px) {
    padding-left: 20%;
  }
}

.bubble-container {
  flex: 0 0 auto;
  display: flex;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
}

.inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 10rem;
  width: 16.2rem;
  border-radius: 0.625rem 0.625rem 0 0.625rem;
  background-color: white;
  box-shadow: 0 0.1rem 0.2rem -0.1rem rgba(0, 0, 0, 0.3);
  .up-text {
    margin-top: 0.5rem;
    color: #808080;
    animation: fade 1s infinite;
  }

  @keyframes fade {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
