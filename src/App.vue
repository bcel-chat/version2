<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MobileDetector from "@/mixins/MobileDetector.js";
export default {
  mixins: [MobileDetector],
  beforeMount() {
    this.deviceCheck(this.detectMobile());
    window.addEventListener("resize", () => {
      this.deviceCheck(this.detectMobile());
    });
  },
  mounted() {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 760) this.roomArrow(true);
      else this.roomArrow(false);
    });
  },
  methods: {
    ...mapActions("AppData", ["deviceCheck", "roomArrow"])
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: FontName;
  src: url("./assets/fonts/NotoSerifLao-Regular.ttf") format("truetype");
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: "FontName", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
}

* {
  box-sizing: border-box;
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none !important;

  &:hover {
    text-decoration: none;
  }
}

[role="button"] {
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

div.products > div > :not(div) {
  display: none;
}
div.products > div {
  font-size: 0px;
}
div.products .form-actions {
  display: none;
}
div.products h1 {
  display: none;
}
div.products button.button.btn.btn-primary {
  display: none;
}
div.products td a {
  display: none;
}
div.products div.product p {
  display: none;
}

@media screen and (min-width: 760px) {
  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(107, 107, 107, 0.3);
  }
}
</style>