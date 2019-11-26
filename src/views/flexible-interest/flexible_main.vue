<template>
  <div>
    <div class="fi-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import ds from "@/helper/ds.js";
import store from "@/stores/store.js";
export default {
  name: "flexible_main",
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    if (to["name"] == null) {
      if (store.getters["flexible_interest_module/pms"] == "true") {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/leader/approve",
          params: { nextUrl: to.fullPath }
        });
      } else if (store.getters["flexible_interest_module/pms"] == "false") {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else if (store.getters["flexible_interest_module/pms"] == "report") {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/report/pending/all",
          params: { nextUrl: to.fullPath }
        });
      }
    }

    if (to.matched.some(record => record.meta.permissionLeader)) {
      if (
        store.getters["flexible_interest_module/pms"] == "false" &&
        !to.matched.some(record => record.meta.permissionStaff)
      ) {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else if (
        store.getters["flexible_interest_module/pms"] == "report" &&
        !to.matched.some(record => record.meta.permissionReport)
      ) {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/report/pending/all",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.permissionReport)) {
      if (store.getters["flexible_interest_module/pms"] == "false") {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.permissionStaff)) {
      if (
        store.getters["flexible_interest_module/pms"] == "true" &&
        !to.matched.some(record => record.meta.permissionLeader)
      ) {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/leader/approve",
          params: { nextUrl: to.fullPath }
        });
      } else if (store.getters["flexible_interest_module/pms"] == "report") {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
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
    if (to["name"] == null) {
      if (store.getters["flexible_interest_module/pms"] == "true") {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/leader/approve",
          params: { nextUrl: to.fullPath }
        });
      } else if (store.getters["flexible_interest_module/pms"] == "false") {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else if (store.getters["flexible_interest_module/pms"] == "report") {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/report/pending/all",
          params: { nextUrl: to.fullPath }
        });
      }
    }

    if (to.matched.some(record => record.meta.permissionLeader)) {
      if (
        store.getters["flexible_interest_module/pms"] == "false" &&
        !to.matched.some(record => record.meta.permissionStaff)
      ) {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else if (
        store.getters["flexible_interest_module/pms"] == "report" &&
        !to.matched.some(record => record.meta.permissionReport)
      ) {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/report/pending/all",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.permissionReport)) {
      if (store.getters["flexible_interest_module/pms"] == "false") {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/staff/progress/info",
          params: { nextUrl: to.fullPath }
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.permissionStaff)) {
      if (
        store.getters["flexible_interest_module/pms"] == "true" &&
        !to.matched.some(record => record.meta.permissionLeader)
      ) {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
            "/flexible/leader/approve",
          params: { nextUrl: to.fullPath }
        });
      } else if (store.getters["flexible_interest_module/pms"] == "report") {
        next({
          path:
            store.getters["flexible_interest_module/root"] +
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
  mounted() {
    this.$root.$on("resetDefault", () => {
      this.resetDefault();
    });
  },
  methods: {
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
// * {
//   font-family: Phetsarath_OT;
// }
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
