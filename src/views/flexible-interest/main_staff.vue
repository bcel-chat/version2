<template>
  <div>
    <ul class="nav nav-tabs mb-2 justify-content-center">
      <li class="nav-item">
        <a
          class="nav-link"
          href="javascript:event"
          :class="tabActive[0]"
          @click="changeActiveStaff(0)"
        >
          <strong class="fi-tab-title">PROGRESS</strong>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link PENDING"
          href="javascript:event"
          :class="tabActive[1]"
          @click="changeActiveStaff(1)"
        >
          <strong class="fi-tab-title">PENDING</strong>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link APPROVED"
          href="javascript:event"
          :class="tabActive[2]"
          @click="changeActiveStaff(2)"
        >
          <strong class="fi-tab-title">APPROVED</strong>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link REJECTED"
          href="javascript:event"
          :class="tabActive[3]"
          @click="changeActiveStaff(3)"
        >
          <strong class="fi-tab-title">REJECTED</strong>
        </a>
      </li>
    </ul>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "main_staff",
  data() {
    return {
      toggle: false,
      tabActive: ["active", "", "", ""]
    };
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
      if (routerName == "request_history_approve") {
        this.tabActive = ["", "", "active", ""];
      } else if (routerName == "request_history_pending") {
        this.tabActive = ["", "active", "", ""];
      } else if (routerName == "request_history_reject") {
        this.tabActive = ["", "", "", "active"];
      } else {
        this.tabActive = ["active", "", "", ""];
      }
    },
    changeActiveStaff(i) {
      this.tabActive[i] = "active";
      for (var j = 0; j < this.tabActive.length; j++) {
        if (j != i) {
          this.tabActive[j] = "";
        }
      }
      //(i == 0) ? this.tabActive[1] = '': this.tabActive[0] = '';
      if (i == 0) {
        if (window.sessionStorage.getItem("actionProgress")) {
          var stepAction = JSON.parse(
            window.sessionStorage.getItem("actionProgress")
          );
          for (var i = 0; i < stepAction.length; i++) {
            if (!stepAction[i]["active-after"]) {
              if (i == 0) {
                this.$router.push({
                  path:
                    this.$store.getters["flexible_interest_module/root"] +
                    "/flexible/staff/progress/info"
                });
              } else if (i == 1) {
                this.$router.push({
                  path:
                    this.$store.getters["flexible_interest_module/root"] +
                    "/flexible/staff/progress/product"
                });
              } else if (i == 2) {
                this.$router.push({
                  path:
                    this.$store.getters["flexible_interest_module/root"] +
                    "/flexible/staff/progress/interest"
                });
              } else if (i == 3) {
                this.$router.push({
                  path:
                    this.$store.getters["flexible_interest_module/root"] +
                    "/flexible/staff/progress/document/attach"
                });
              } else if (i == 4) {
                this.$router.push({
                  path:
                    this.$store.getters["flexible_interest_module/root"] +
                    "/flexible/staff/progress/interest/approve"
                });
              }
              break;
            }
          }
        } else {
          this.$root.$emit("resetDefault");
          this.$router.push({
            path:
              this.$store.getters["flexible_interest_module/root"] +
              "/flexible/staff/progress/info"
          });
        }
      } else if (i == 1) {
        this.$router.push({
          path:
            this.$store.getters["flexible_interest_module/root"] +
            "/flexible/staff/request/history/pending"
        });
      } else if (i == 2) {
        this.$router.push({
          path:
            this.$store.getters["flexible_interest_module/root"] +
            "/flexible/staff/request/history/approved"
        });
      } else if (i == 3) {
        this.$router.push({
          path:
            this.$store.getters["flexible_interest_module/root"] +
            "/flexible/staff/request/history/rejected"
        });
      } else {
        this.$root.$emit("resetDefault");
        this.$router.push({
          path:
            this.$store.getters["flexible_interest_module/root"] +
            "/flexible/staff/progress/info"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// .fi-tab-title{
//     font-family: 'Times New Roman'
// }
.PENDING {
  color: rgb(250, 150, 0);
  font-weight: bold;
}
.REJECTED {
  color: #f34e4e;
}
.APPROVED {
  color: #20a816;
}
.test {
  width: 75%;
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

@media only screen and (max-width: 1100px) {
  .fi-tab-title {
    font-size: 20px;
  }
}
@media only screen and (max-width: 950px) {
  .fi-tab-title {
    font-size: 16px;
  }
}
@media only screen and (max-width: 700px) {
  .fi-tab-title {
    font-size: 14px;
  }
}

@media only screen and (max-width: 550px) {
  .fi-tab-title {
    font-size: 12px;
  }
}

@media only screen and (max-width: 400px) {
  .fi-tab-title {
    font-size: 8.7px;
  }
  div.fi-title {
    font-size: 10px;
  }
}
@media print {
  .hide-on-print-mode {
    display: none;
  }
}
</style>
      