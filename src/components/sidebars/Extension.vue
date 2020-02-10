<template>
  <div id="extension">
    <div class="_container">
      <div class="card-content">
        <template v-for="(item, index) in menuItems">
          <router-link
            :to="item.user ? '/modules' + item.path : ''"
            class="card-box"
            :key="index"
            role="button"
            @click.native="
              onChatClick({
                cnt: permissionCheckOnclick(item),
                module: item.title
              })
            "
          >
            <div class="card-icon-box">
              <i :class="[item.icon]" :style="{ color: item.color }"></i>
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
    <!-- End _container -->
    <transition enter-active-class="animated slideInUp" leave-active-class="animated fadeOut">
      <toast v-if="toastStart" style="animation-duration: .2s">
        <span slot="body">No permission</span>
      </toast>
    </transition>
  </div>
</template>

<script>
import toast from "@/components/sidebars/subcomponents/Toast.vue";
import randomColor from "randomcolor";
import { mapActions, mapState } from "vuex";
import code from "@/helper/father.js";
import { debounce } from "lodash";

import ds from "@/helper/deepstream.js";

export default {
  components: {
    toast
  },
  data() {
    return {
      phone: "",
      toastStart: false,
      showToast: "",
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
  watch: {
    txtSearch(val) {
      if (val)
        this.getMenuItem({
          user: code.from(localStorage.getItem("roger")),
          text: val,
          _page: 2
        });
      else
        this.getMenuItem({
          user: code.from(localStorage.getItem("roger")),
          text: "",
          _page: 1
        });
    }
  },
  beforeMount() {
    this.userID = code.from(localStorage.getItem("miya"));
    this.getMenuItem({
      user: code.from(localStorage.getItem("roger")),
      text: "",
      _page: 1
    });

    this.phone = code.from(localStorage.getItem("phone"));
  },
  mounted() {
    this.showToast = debounce(() => {
      this.toastStart = false;
    }, 3000);
  },
  computed: {
    ...mapState("AppData", ["moduleLink", "txtSearch"]),
    ...mapState("Menu", ["menuItems"])
  },
  methods: {
    ...mapActions("AppData", ["onChatClick", "setModuleLink"]),
    ...mapActions("Menu", ["getMenuItem"]),
    ...mapActions("Context", ["setOtpBox"]),
    permissionCheck(item) {
      if (item.permission == 1 && this.userID != null) {
        if (item.user.toUpperCase() == this.userID.toUpperCase()) {
          return true;
        } else {
          return false;
        }
      } else if (
        (item.permission == 0 && this.userID != null) ||
        this.userID == null
      ) {
        return true;
      } else {
        return false;
      }
    },
    permissionCheckOnclick(item) {
      if (item.user && item.permission == 1) {

        // return true;

        let otp1 = code.from(localStorage.getItem("otpBase"));
        let otp2 = code.from(localStorage.getItem("otp"));

        if (otp1 && otp2) {
          if (otp1 == otp2) return true;
          else {
            this.setOtpBox(true);
            return false;
          }
        } else {
          this.setOtpBox(true);
          return false;
        }
      } else if (item.user && item.permission == 0) {
        return true;
      } else {
        this.toastStart = true;
        this.showToast();
        this.$router.push("/");
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/Extension.scss";
</style>
