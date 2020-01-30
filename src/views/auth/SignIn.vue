<template>
  <div id="signin">
    <div class="_container">
      <div class="log-item">
        <div class="ball-item-box" v-if="!mobileMode">
          <div class="ball-slite sleft">
            <transition-group enter-active-class="animated zoomIn">
              <span class="ball b1" key="1" v-if="startUp"></span>
              <span class="ball b2" key="2" v-if="startUp"></span>
              <span class="ball b3" key="3" v-if="startUp"></span>
              <span class="ball b4" key="4" v-if="startUp"></span>
              <span class="ball b5" key="5" v-if="startUp"></span>
            </transition-group>
          </div>
          <div class="ball-slite sright"></div>
        </div>
        <div
          :class="[
            'log-item-inside',
            mobileMode ? 'log-mobile' : 'log-desktop'
          ]"
        >
          <div class="splite _left" v-if="!mobileMode">
            <transition enter-active-class="animated fadeIn">
              <div class="text-box" v-if="startUp">
                <div class="title">BCEL Chat</div>
                <span class="subtitle">IT Center</span>
              </div>
            </transition>
            <div class="sign-bg-box">
              <img
                src
                alt
                srcset="@/assets/img/signin-bg.jpg"
                class="bg"
                draggable="false"
              />
            </div>
          </div>
          <div class="splite _right">
            <div class="signin-panel">
              <transition
                enter-active-class="animated fadeInDown"
                leave-active-class="animated fadeOutUp"
              >
                <div class="alert-box" v-if="!authStatus || connectClose">
                  <span class="alert">{{
                    connectClose
                      ? `Sign in failed 5 times. Auto reload in ${countdown}`
                      : `Sign In Failed!`
                  }}</span>
                </div>
              </transition>
              <div class="signin-logo-box">
                <transition
                  enter-active-class="animated rotateIn"
                  leave-active-class="animated zoomOutUp"
                >
                  <div class="signin-logo" v-if="startUp">
                    <img src="@/assets/img/logo.png" alt />
                  </div>
                </transition>
              </div>
              <div class="signin-box">
                <transition
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated zoomOutUp"
                >
                  <form
                    class="signin-insider"
                    @submit.prevent="go"
                    v-if="startUp"
                  >
                    <div
                      :class="[
                        'gp-control',
                        $v.authState.user.$error ? 'err' : 'valid'
                      ]"
                    >
                      <div class="input-icon-box">
                        <span class="input-ico">
                          <i class="fas fa-user" for="u568"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="u568"
                        v-model.trim="$v.authState.user.$model"
                      />
                      <label for="u568" :class="floatUser">User</label>
                    </div>
                    <div
                      :class="[
                        'gp-control',
                        $v.authState.password.$error ? 'err' : 'valid'
                      ]"
                    >
                      <div class="input-icon-box">
                        <span class="input-ico">
                          <i class="fas fa-unlock-alt" for="p568"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        id="p568"
                        v-model.trim="$v.authState.password.$model"
                      />
                      <label for="p568" :class="floatPwd">Password</label>
                    </div>
                    <button
                      type="submit"
                      :class="[mobileMode ? 'btn-login' : 'btn-login-desktop']"
                      role="button"
                      v-if="doLog"
                    >
                      SIGN IN
                    </button>
                    <div class="loading-box" v-else>
                      <HollowDotsSpinner
                        :animation-duration="1000"
                        :dot-size="18"
                        :dots-num="3"
                        :color="'#ef3434'"
                      />
                    </div>
                  </form>
                </transition>
              </div>
              <div id="signin-footer">
                <div class="footer-panel">
                  <span class="copyright">Copyright &copy; 2019</span> |
                  <span class="band">BCEL IT CENTER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

import { HollowDotsSpinner } from "epic-spinners";

export default {
  components: {
    HollowDotsSpinner
  },
  data() {
    return {
      doLog: true,
      countdown: 5,
      startUp: false,
      authState: {
        user: "",
        password: ""
      },
      floatUser: "",
      floatPwd: "",
      submitStatus: null
    };
  },
  validations: {
    authState: {
      user: {
        required
      },
      password: {
        required,
        minLength: minLength(4)
      }
    }
  },
  watch: {
    authStatus(val) {
      if (!val) this.doLog = true;
    },
    "authState.user"(val) {
      if (val != "") this.floatUser = "floating-top";
      else this.floatUser = "";
    },
    "authState.password"(val) {
      if (val != "") this.floatPwd = "floating-top";
      else this.floatPwd = "";
    },
    connectClose() {
      this.toReload();
    },
    countdown(val) {
      if (val == 1) clearInterval(this.toReload());
    }
  },
  mounted() {
    if (this.authState.user) this.floatUser = "floating-top";
    else this.floatUser = "";

    if (this.authState.password) this.floatPwd = "floating-top";
    else this.floatPwd = "";

    setTimeout(() => {
      this.startUp = true;
    }, 300);
  },
  computed: {
    ...mapState("Auth", ["authData", "authStatus", "connectClose"]),
    ...mapState("AppData", ["mobileMode"])
  },
  methods: {
    ...mapActions("Auth", ["setAuthData"]),
    toReload() {
      setInterval(() => {
        this.countdown--;
        if (this.countdown == 1) location.reload();
      }, 1000);
    },
    go() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.doLog = false;
        this.setAuthData(this.authState);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/SignIn.scss";
</style>
