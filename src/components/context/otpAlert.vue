<template>
  <div id="otp">
    <div class="container">
      <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div class="item-box" v-if="display">
          <div class="title">Please enter the One-Time Password</div>
          <form class="control-box" @submit.prevent="verify">
            <input type="text" class="input" v-model="input" maxlength="4" />
            <button class="submit" type="submit" ref="submit" disabled>Verify</button>
          </form>
          <a role="button" @click="sentotp">Resent OTP code</a>
          <a role="button" @click="cancel" style="color: #db4646">Cancel</a>
        </div>
      </transition>
      <transition
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutUp"
      >
        <div class="alert-box" v-if="fail">
          <div class="alert">{{ message }}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import code from "@/helper/father.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      time: false,
      message: "",
      display: false,
      fail: false,
      input: "",
      otp: ""
    };
  },
  watch: {
    input(val) {
      if (val.length == 4) this.$refs.submit.disabled = false;
      else this.$refs.submit.disabled = true;
    }
  },
  mounted() {
    setTimeout(() => {
      this.display = true;
    }, 200);
    this.sentotp();
  },
  methods: {
    ...mapActions("AppData", ["onChatClickUpdate"]),
    ...mapActions("Context", ["setOtpBox"]),
    verify() {
      this.setTime();
      if (this.input)
        if (this.input == this.otp) {
          this.onChatClickUpdate({
            cnt: true
          });
          this.setOtpBox(false);
        } else {
          if (this.time) this.message = "The One-Time Password is incorrect!";
          else this.message = "The One-Time Password is time out";

          this.fail = true;
          setTimeout(() => {
            this.fail = false;
            this.message = "";
          }, 5000);
          this.onChatClickUpdate({
            cnt: false
          });
        }
    },
    sentotp() {
      this.setTime();
      axios
        .get(`${process.env.VUE_APP_ACCESS_API}/sendsms`, {
          params: {
            phone: code.from(localStorage.getItem("phone"))
          }
        })
        .then(res => {
          this.otp = res.data;
          this.time = true;
          localStorage.setItem("otpBase", code.to(JSON.stringify(res.data)));
          localStorage.setItem("otp", code.to(JSON.stringify(res.data)));
          var now = new Date().getTime();
          localStorage.setItem("timer", now);
        });
    },
    setTime() {
      var minutes = 3;
      var now = new Date().getTime();
      var timer = localStorage.getItem("timer");
      if (timer == null) {
        localStorage.setItem("timer", now);
      } else {
        console.log(now - timer, minutes * 0 * 1000);

        if (now - timer > minutes * 0 * 1000) {
          localStorage.removeItem("timer");
          this.otp = "";
          this.time = false;
          localStorage.setItem("otpBase", "");
          localStorage.setItem("otp", "");
          localStorage.setItem("timer", now);
        }
      }
    },
    cancel() {
      this.setOtpBox(false);
      localStorage.removeItem("timer");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#otp {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(226, 226, 226, 0.7);
  z-index: 1000;
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.item-box {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: auto;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 3px 5px 1px rgba(160, 151, 151, 0.2);
  background-color: white;
  animation-duration: 0.2s;
  @media screen and (min-width: 760px) {
    width: 350px;
    height: auto;
  }
}

.title {
  color: $secondary-color;
}

.control-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .input {
    margin: 0.3rem;
    font-size: 18px;
    text-align: center;
    outline: none;
    // border-radius: 1rem;
    border: solid 1px $semi-secondary-color;
    &:focus {
      border: solid 1px $primary-color;
    }
  }
  .submit {
    margin: 0.3rem;
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    font-size: 16px;
    outline: none;
    border: solid 1px #cccccc;
    &:active {
      background-color: $info-color;
    }
  }
}

.alert-box {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  @media screen and (min-width: 760px) {
    top: 5rem;
  }
}

.alert {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0px 3px 5px 1px rgba(160, 151, 151, 0.2);
  @media screen and (min-width: 760px) {
    width: auto;
  }
  &:before {
    position: absolute;
    content: "";
    left: 0;
    width: 0.3rem;
    height: 100%;
    background-color: $primary-color;
  }
}
</style>
