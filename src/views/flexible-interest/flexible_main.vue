<template>
  <!-- <div class="test"> -->
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="fi-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import code from "@/helper/father.js";
import ds from "@/helper/ds.js";
export default {
  name: "flexible_main",
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    sessionStorage.setItem("flexible_root_router", "");
    if (to["name"] == null) {
      if (window.sessionStorage.getItem("permission") == "true") {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/leader/approve",
          params: { nextUrl: to.fullPath }
        });
      } else if (window.sessionStorage.getItem("permission") == "false") {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else if (window.sessionStorage.getItem("permission") == "report") {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/report/pending/all",
          params: { nextUrl: to.fullPath }
        });
      }
    }

    if (to.matched.some(record => record.meta.permissionLeader)) {
      if (
        window.sessionStorage.getItem("permission") == "false" &&
        !to.matched.some(record => record.meta.permissionStaff)
      ) {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else if (
        window.sessionStorage.getItem("permission") == "report" &&
        !to.matched.some(record => record.meta.permissionReport)
      ) {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/report/pending/all",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.permissionReport)) {
      if (window.sessionStorage.getItem("permission") == "false") {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.permissionStaff)) {
      if (
        window.sessionStorage.getItem("permission") == "true" &&
        !to.matched.some(record => record.meta.permissionLeader)
      ) {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/leader/approve",
          params: { nextUrl: to.fullPath }
        });
      } else if (window.sessionStorage.getItem("permission") == "report") {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/report/pending/all",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  },
  beforeRouteUpdate(to, from, next) {
    sessionStorage.setItem("flexible_root_router", "");
    if (to["name"] == null) {
      if (window.sessionStorage.getItem("permission") == "true") {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/leader/approve",
          params: { nextUrl: to.fullPath }
        });
      } else if (window.sessionStorage.getItem("permission") == "false") {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else if (window.sessionStorage.getItem("permission") == "report") {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/report/pending/all",
          params: { nextUrl: to.fullPath }
        });
      }
    }

    if (to.matched.some(record => record.meta.permissionLeader)) {
      if (
        window.sessionStorage.getItem("permission") == "false" &&
        !to.matched.some(record => record.meta.permissionStaff)
      ) {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else if (
        window.sessionStorage.getItem("permission") == "report" &&
        !to.matched.some(record => record.meta.permissionReport)
      ) {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/report/pending/all",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.permissionReport)) {
      if (window.sessionStorage.getItem("permission") == "false") {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.permissionStaff)) {
      if (
        window.sessionStorage.getItem("permission") == "true" &&
        !to.matched.some(record => record.meta.permissionLeader)
      ) {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/leader/approve",
          params: { nextUrl: to.fullPath }
        });
      } else if (window.sessionStorage.getItem("permission") == "report") {
        next({
          path:
            sessionStorage.getItem("flexible_root_router") +
            "/flexible/report/pending/all",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  },
  created() {
    //console.log(this.$router)
  },
  mounted() {
    const userID = code.from(localStorage.getItem("miya"));
    this.$root.$on("resetDefault", () => {
      this.resetDefault();
    });
    ds.rpc.make(
      "/bcel/api/flexible/interest/current/user",
      { userId: userID },
      (error, result) => {
        //console.log(error, result);
        if (result) {
          if (result["userId"]) {
            this.$store.commit("flexible_interest_module/addLoginUser", {
              user: result["userId"]
            });
            window.sessionStorage.setItem("user", result["userId"]);
            if (result["permission"] == 1 || result["permission"] == 2) {
              window.sessionStorage.setItem("permission", "true");
              this.$router.push({
                path:
                  sessionStorage.getItem("flexible_root_router") +
                  "/flexible/leader/approve"
              });
            } else if (result["permission"] == 3) {
              window.sessionStorage.setItem("permission", "report");
              this.$router.push({
                path:
                  sessionStorage.getItem("flexible_root_router") +
                  "/flexible/report/pending/all"
              });
            } else if (result["permission"] == 0) {
              window.sessionStorage.setItem("permission", "false");
              this.$router.push({
                path:
                  sessionStorage.getItem("flexible_root_router") +
                  "/flexible/staff/progress/info"
              });
            } else {
              this.$root.$emit("resetDefault");
              this.$router.back();
            }
          } else {
            this.$root.$emit("resetDefault");
            this.$router.back();
          }
        } else if (error) {
          this.$root.$emit("resetDefault");
          this.$router.back();
        } else {
          this.$root.$emit("resetDefault");
          this.$router.back();
        }
      }
    );
  },
  methods: {
    getPermission() {
      return window.sessionStorage.getItem("permission") == "true";
    },
    resetDefault() {
      window.sessionStorage.removeItem("actionProgress");
      window.sessionStorage.removeItem("requirement");
      var newInfo = {
        bank_accounts: [{ acc_no: "", desc: "" }],
        currency: {
          currencyId: ""
        },
        customer_interest: 0,
        deposit_amount: "",
        documents: "",
        document_files: [],
        aclass: { descriptionLao: "" },
        more_info: "",
        name: "",
        earning_general_interest: 0,
        earning_customer_interest: 0,
        max_flexible: 0,
        occupation: "",
        staff_note: "",
        deposit_age: {
          typeId: ""
        },
        products: [],
        normal_interest: 0.0
      };
      this.$store.commit("flexible_interest_module/addCustomerRequirement", {
        info: newInfo
      });
      this.$store.commit("flexible_interest_module/clearProgressActionActive", {
        val: [{}, {}, {}, {}, {}]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  font-family: Phetsarath_OT;
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
.test {
  width: 75%;
}
.fi-content {
  margin-top: 10px;
  background: white;
}
@media only screen and (max-width: 992px) {
  .test {
    width: 100%;
  }
  div.products div.product {
    padding-top: 100px;
    padding-left: 10px;
  }
  div.products div.product table {
    font-size: 14px;
  }
  div.products div.product.visa {
  }
}
</style>
