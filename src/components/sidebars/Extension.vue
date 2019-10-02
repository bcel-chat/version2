<template>
  <div id="extension">
    <div class="container">
      <div class="card-content">
        <template v-for="(item, index) in menuItems">
          <router-link
            :to="!moduleLink && permissionCheck(item) ? item.path : ''"
            class="card-box"
            :key="index"
            role="button"
            @click.native="onChatClick({cnt: permissionCheckOnclick(item), module: item.title})"
          >
            <div class="card-icon-box">
              <i :class="[item.icon]" :style="{color: item.color}"></i>
            </div>
            <div class="card-title-box">
              <div class="title-box">
                <div class="title_">{{ item.title }}</div>
              </div>
            </div>
          </router-link>
          <!-- End card-box -->
        </template>
      </div>
      <!-- End card-content -->
    </div>
    <!-- End container -->
  </div>
</template>

<script>
import randomColor from "randomcolor";
import { mapActions, mapState } from "vuex";
import code from "@/helper/father.js";
export default {
  data() {
    return {
      items: [
        {
          title: "Flexible Interest",
          icon: "fas fa-chart-bar",
          path: "/flexible",
          user: "BCEL0135",
          permission: true,
          color: randomColor({
            luminosity: "dark",
            hue: "random"
          })
        },
        {
          title: "BCEL Products",
          icon: "fas fa-users-cog",
          path: "/",
          user: "",
          permission: true,
          color: randomColor({
            luminosity: "dark",
            hue: "random"
          })
        },
        {
          title: "Your Wallet",
          icon: "fas fa-wallet",
          path: "/",
          user: "",
          permission: true,
          color: randomColor({
            luminosity: "dark",
            hue: "random"
          })
        }
      ],
      userID: null
    };
  },
  beforeMount() {
    this.userID = code.from(localStorage.getItem("miya"));
    this.getMenuItem(code.from(localStorage.getItem("freya")));
  },
  computed: {
    ...mapState("AppData", ["moduleLink"]),
    ...mapState("Menu", ["menuItems"])
  },
  methods: {
    ...mapActions("AppData", ["onChatClick", "setModuleLink"]),
    ...mapActions("Menu", ["getMenuItem"]),
    permissionCheck(item) {
      if (item.permission) {
        if (item.user.toUpperCase() == this.userID.toUpperCase()) {
          return true;
        } else {
          return false;
        }
      } else if (!item.permission) {
        return true;
      } else {
        return false;
      }
    },
    permissionCheckOnclick(item) {
      if (item.permission) {
        if (item.user.toUpperCase() == this.userID.toUpperCase()) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/Extension.scss";
</style>
