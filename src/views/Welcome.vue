<template>
  <div id="welcome">
    <div class="welcome-container">
      <div class="banner-logo">
        <transition enter-active-class="animated tada">
          <img v-if="display" src="@/assets/img/logo.png" alt srcset style="animation-duration: 2s" />
        </transition>
      </div>
      <div class="banner-text">
        <transition enter-active-class="animated bounce">
          <div class="welcome" v-if="display" style="animation-duration: 2s">
            Welcome to
            <span>BCEL</span> Chat
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.display = true;
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
#welcome {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
}

.welcome-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.banner-logo {
  width: 20rem;
  height: 20rem;
}

.banner-logo > img {
  width: 100%;
  height: 100%;
}

.banner-text {
  padding: 1rem;
  font-weight: 700;
  font-size: 2.5rem;
}

.banner-text > .welcome span {
  color: rgb(190, 13, 13);
}
</style>
