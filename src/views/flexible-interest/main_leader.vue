<template>
  <div class="fi-main-leader">
    <a href="javascript:event" class="fi-switch-on-off">
      <label class="fi-switch">
        <input type="checkbox" v-model="on_off" value="true" @change="changeOnOffLeader" />
        <span class="fi-slider fi-round"></span>
      </label>
      <span class="fi-toggle-status">{{on_off[0]?'ຮັບອະນຸມັດ':'ບໍ່ຮັບອະນຸມັດ'}}</span>
    </a>
    <router-link to="/modules/flexible/report/pending/all" class="fi-link-report">
      <i class="fas fa-chart-line"></i>
    </router-link>
    <ul class="nav nav-tabs mb-3 justify-content-center hide-on-print-mode">
      <li class="nav-item">
        <a
          class="nav-link PENDING"
          href="javascript:event"
          :class="tabActive[0]"
          @click="changeActiveLeader(0)"
        >
          <strong class="fi-tab-title">PENDING</strong>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="javascript:event"
          :class="tabActive[1]"
          @click="changeActiveLeader(1)"
        >
          <strong class="fi-tab-title">HISTORY</strong>
        </a>
      </li>
    </ul>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import ds from "@/helper/ds.js";
export default {
  name: "main_leader",
  data() {
    return {
      on_off: [],
      tabActive: ["active", ""]
    };
  },
  created() {
    ds.rpc.make(
      "/bcel/api/flexible/interest/get/user/on/off",
      { userId: this.$store.getters["flexible_interest_module/user"] },
      (error, result1) => {
        if (result1) {
          this.on_off = result1 ? ["true"] : [];
        }
      }
    );
  },
  beforeRouteUpdate(to, from, next) {
    this.activeTab(to["name"]);
    next();
  },
  mounted() {
    this.activeTab(this.$router["history"]["current"]["name"]);
  },
  methods: {
    activeTab(routerName) {
      if (routerName == "leader_approve_history") {
        this.tabActive = ["", "active"];
      } else {
        this.tabActive = ["active", ""];
      }
    },
    changeOnOffLeader() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/update/user/on/off",
        {
          userId: this.$store.getters["flexible_interest_module/user"],
          on_off: this.on_off[0] ? "ON" : "OFF"
        },
        (error, result1) => {
          if (result1) {
            //console.log(result1);
          }
        }
      );
    },
    changeActiveLeader(i) {
      this.tabActive[i] = "active";
      i == 0 ? (this.tabActive[1] = "") : (this.tabActive[0] = "");
      i == 0
        ? this.$router.push({
            path:
              this.$store.getters["flexible_interest_module/root"] +
              "/flexible/leader/approve"
          })
        : this.$router.push({
            path:
              this.$store.getters["flexible_interest_module/root"] +
              "/flexible/leader/approve/history"
          });
    }
  }
};
</script>


<style lang="scss" scoped>
.fi-main-leader {
  position: relative;
}
.fi-link-report {
  position: absolute;
  top: 20px;
  right: 10px;
  padding-right: 1rem;
  font-size: 1.2rem;
  background: white;
  border: none;
}
.fi-link-report:hover {
  color: #ee3024;
}
.PENDING {
  color: rgb(250, 150, 0);
  font-weight: bold;
  font-family: Helvetica;
}
div.max-flex {
  position: absolute;
  right: 0px;
  text-align: right;
}
div.max-flex > button {
  background: white;
  border: 0px white solid;
  color: #ee3024;
  font-size: 16px;
}
div.max-flex > button:hover {
  color: #a42c35;
}
div.max-flex > button:focus {
  outline: none;
}
.fi-percent {
  font-size: 20px;
}
.fi-tab-title {
  font-size: 25px;
}
.content {
  margin-top: 30px;
}

span.fi-toggle-status {
  margin-left: 5px;
  display: inline;
}

/*switcher*/
.fi-switch-on-off {
  position: absolute;
  top: 20px;
  left: 10px;
}
.fi-switch {
  position: relative;
  display: inline-block;
  width: 45.5px;
  height: 20px;
}

.fi-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.fi-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.fi-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 0px;
  bottom: 0px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .fi-slider {
  background-color: #ee3024;
}

input:focus + input:checked + .fi-slider {
  box-shadow: 0 0 1px #ee3024;
}

input:checked + .fi-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.fi-slider.fi-round {
  border-radius: 34px;
}

.fi-slider.fi-round:before {
  border-radius: 50%;
}
/*switcher*/

@media only screen and (max-width: 992px) {
  .fi-tab-title {
    font-size: 22px;
  }
}
@media only screen and (max-width: 767px) {
  .fi-tab-title {
    font-size: 20px;
  }
  .fi-link-report {
    top: 14px;
  }
}
@media only screen and (max-width: 620px) {
  .fi-tab-title {
    font-size: 18px;
  }
  div.fi-title {
    font-size: 12px;
  }
  .fi-percent {
    font-size: 16px;
  }
  .fi-link-report {
    top: 12px;
  }
}

@media only screen and (max-width: 500px) {
  .fi-tab-title {
    font-size: 16px;
  }
  .fi-link-report {
    top: 10px;
  }

  span.fi-toggle-status {
    display: none;
  }
}

@media only screen and (max-width: 400px) {
  .fi-tab-title {
    font-size: 11px;
  }
  div.fi-title {
    font-size: 10px;
  }
  .fi-switch {
    width: 26px;
    height: 12px;
  }
  .fi-slider:before {
    height: 12px;
    width: 12px;
  }
  input:checked + .fi-slider:before {
    -webkit-transform: translateX(14px);
    -ms-transform: translateX(14px);
    transform: translateX(14px);
  }
}
@media print {
  .hide-on-print-mode {
    display: none;
  }
}
</style>
      