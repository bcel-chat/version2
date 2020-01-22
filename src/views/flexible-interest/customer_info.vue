<template>
  <div class="container">
    <div class="fi-content">
      <div class="radio-group-box">
        <div class="fi-group">
          <div class="radio-group">
            <div class="fi-title-box">
              <strong class="fi-title">ປະເພດລູກຄ້າ</strong>
            </div>
            <div class="radio-box">
              <!-- <input type="radio" value="TAI" v-model="customer_info['type']"> ບູກຄົນ -->
              <label class="fi-container">
                <span class="fi-radio-text">ບູກຄົນ</span>
                <input
                  type="radio"
                  name="radio"
                  value="TAI"
                  v-model="customer_info['type']"
                  @change="validateType"
                />
                <span class="fi-checkmark"></span>
              </label>
            </div>
            <div class="radio-box">
              <!-- <input type="radio" value="TCO" v-model="customer_info['type']"> ນິຕິບູກຄົນ -->
              <label class="fi-container">
                <span class="fi-radio-text">ນິຕິບູກຄົນ</span>
                <input
                  type="radio"
                  name="radio"
                  value="TCO"
                  v-model="customer_info['type']"
                  @change="validateType"
                />
                <span class="fi-checkmark"></span>
              </label>
            </div>
            <div class="radio-box">
              <!-- <input type="radio" value="TPO" v-model="customer_info['type']">ອົງກອນລັດ -->
              <label class="fi-container">
                <span class="fi-radio-text">ອົງກອນລັດ</span>
                <input
                  type="radio"
                  name="radio"
                  value="TPO"
                  v-model="customer_info['type']"
                  @change="validateType"
                />
                <span class="fi-checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="err-text" v-if="error_validation['type'].length > 0">
          <span v-for="(error, index) in error_validation['type']" :key="index">*{{error}}</span>
        </div>
      </div>
      <div :class="['input-group-box', error_validation['name'].length > 0 ? 'err-input' : '']">
        <div :class="['fi-ico-box', error_validation['name'].length > 0 ? 'err-ico' : '']">
          <i class="fas fa-user-tie"></i>
        </div>
        <input
          id="fullname"
          type="text"
          class="fi-input"
          v-model="customer_info['name']"
          required
          @change="validateName"
        />
        <label for="fullname" class="control-label">ຊື່ ແລະ ນາມສະກຸນລູກຄ້າ *</label>
      </div>
      <div :class="['input-group-box', error_validation['tel'].length > 0 ? 'err-input' : '']">
        <div :class="['fi-ico-box', error_validation['tel'].length > 0 ? 'err-ico' : '']">
          <i class="fas fa-phone"></i>
        </div>
        <input
          id="tel"
          type="text"
          class="fi-input"
          v-model="customer_info['tel']"
          required
          @change="validateTel"
        />
        <label for="tel" class="control-label">ເບີໂທລະສັບ *</label>
      </div>
      <div
        :class="['input-group-box', error_validation['occupation'].length > 0 ? 'err-input' : '']"
      >
        <div :class="['fi-ico-box', error_validation['occupation'].length > 0 ? 'err-ico' : '']">
          <i class="fas fa-briefcase"></i>
        </div>
        <input
          id="job"
          type="text"
          class="fi-input"
          v-model="customer_info['occupation']"
          required
          @change="validateOccupation"
        />
        <label for="job" class="control-label">ອາຊີບ *</label>
      </div>
      <div>
        <div class="fi-account-group">
          <span data-v-77bdad3c class="account-title-box">
            <strong data-v-77bdad3c class="fi-title">ບັນຊີທະນາຄານ</strong>
          </span>
          <div
            class="fi-account"
            v-for="(account, index) in customer_info['bank_accounts']"
            :key="index"
            :class="getAccountMoreClass(index)"
          >
            <div class="fi-account-title">
              <strong>Account {{index+1}}</strong>
            </div>
            <strong
              class="delIcon"
              v-if="customer_info['bank_accounts'].length > 1"
              @click="deleteAccount(index)"
            >
              <i class="far fa-times-circle"></i>
            </strong>
            <div class="acc-content-box">
              <div class="acc-input-box">
                <input
                  class="fi-account-input"
                  type="text"
                  v-model="account['acc_no']"
                  required
                  @change="validateAccountNo(index)"
                />
                <label class="acc-label">ເລກບັນຊີ</label>
              </div>
              <div class="acc-input-box">
                <input class="fi-account-input" type="text" v-model="account['desc']" required />
                <label class="acc-label">ອະທິບາຍເພີ່ມເຕີມ</label>
              </div>
            </div>
            <div v-if="error_validation['bank_accounts'].length > 0">
              <div class v-if="error_validation['bank_accounts'][index]['acc_no'].length > 0">
                <span
                  class="fi-account-valid"
                  v-for="(error, index) in error_validation['bank_accounts'][index]['acc_no']"
                  :key="index"
                >(* {{error}})</span>
              </div>
            </div>
          </div>
          <div class="fi-add-pannel text-right">
            <span class="fi-add" @click="addAccount()">+</span>
          </div>
        </div>
      </div>
      <div>
        <div class="text-editor">
          <span data-v-77bdad3c class="account-title-box">
            <strong data-v-77bdad3c class="fi-title">ຂໍ້ມູນເພີ່ມຕື່ມ</strong>
          </span>
          <textarea
            id="more_detail"
            placeholder="ຂໍ້ມູນສ່ວນຕົວອື່ນໆ"
            v-model="customer_info['more_info']"
          ></textarea>
        </div>
      </div>
      <div class="text-right">
        <button class="fi-btn-next" type="button" @click="doNext()">ຕໍ່ໄປ</button>
      </div>
    </div>
  </div>
</template>

<script>
// import "bootstrap/dist/css/bootstrap.css";
// import "@/assets/flexible_interest/fonts/phetsarath_font.css";

export default {
  name: "customer_info",
  data() {
    return {
      customer_info: this.$store.getters[
        "flexible_interest_module/requirement"
      ],
      error_validation: {
        type: [],
        name: [],
        tel: [],
        occupation: [],
        bank_accounts: [],
        more_info: []
      }
    };
  },
  created() {},
  mounted() {
    if (this.customer_info["bank_accounts"].length <= 0) {
      this.addAccount();
    } else {
      for (var i = 0; i < this.customer_info["bank_accounts"].length; i++) {
        this.error_validation["bank_accounts"].push({
          acc_no: [],
          desc: []
        });
      }
    }
  },
  methods: {
    validateType() {
      if (!this.customer_info["type"].trim()) {
        if (this.error_validation["type"].length == 0) {
          this.error_validation["type"].push("ເລືອກປະເພດລູກຄ້າ");
        }
        return false;
      } else if (this.error_validation["type"].length > 0) {
        this.error_validation["type"].pop();
      }
      return true;
    },
    validateName() {
      if (!this.customer_info["name"].trim()) {
        if (this.error_validation["name"].length == 0) {
          this.error_validation["name"].push("ຊື່ລູກຄ້າຫ້າມວ່າງ");
        }
        return false;
      } else if (this.error_validation["name"].length > 0) {
        this.error_validation["name"].pop();
      }
      return true;
    },
    validateOccupation() {
      if (!this.customer_info["occupation"].trim()) {
        if (this.error_validation["occupation"].length == 0) {
          this.error_validation["occupation"].push("ອາຊີບລູກຄ້າຫ້າມວ່າງ");
        }
        return false;
      } else if (this.error_validation["occupation"].length > 0) {
        this.error_validation["occupation"].pop();
      }
      return true;
    },
    getAccountMoreClass(index) {
      return index == 0
        ? this.customer_info["bank_accounts"].length == 1
          ? "fi-account" + (index + 1) + " fi-account-last"
          : "fi-account" + (index + 1)
        : index == this.customer_info["bank_accounts"].length - 1
        ? "fi-account-last"
        : "";
    },
    deleteAccount(i) {
      this.customer_info["bank_accounts"].splice(i, 1);
      this.error_validation["bank_accounts"].splice(i, 1);
    },
    addAccount() {
      this.customer_info["bank_accounts"].push({ acc_no: "", desc: "" });
      this.error_validation["bank_accounts"].push({
        acc_no: [],
        desc: []
      });
    },
    validateTel() {
      if (!this.customer_info["tel"].trim()) {
        if (this.error_validation["tel"].length == 0) {
          this.error_validation["tel"].push("ເບີໂທລະສັບຫ້າມວ່າງ");
        }
        return false;
      } else if (this.error_validation["tel"].length > 0) {
        this.error_validation["tel"].pop();
      }
      if (isNaN(this.customer_info["tel"].trim())) {
        if (this.error_validation["tel"].indexOf("ເບີໂທລະສັບຫ້າມວ່າງ") >= 0) {
          this.error_validation["tel"].splice(
            this.error_validation["tel"].indexOf("ເບີໂທລະສັບຫ້າມວ່າງ")
          );
        }
        if (
          this.error_validation["tel"].indexOf("ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກ") < 0
        ) {
          this.error_validation["tel"].push("ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກ");
        }
        return false;
      } else if (
        this.error_validation["tel"].indexOf("ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກ") >= 0
      ) {
        this.error_validation["tel"].splice(
          this.error_validation["tel"].indexOf("ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກ")
        );
      }
      return true;
    },
    validateAccountNo(i) {
      if (!this.customer_info["bank_accounts"][i]["acc_no"].trim()) {
        if (
          this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
            "ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ"
          ) >= 0
        ) {
          this.error_validation["bank_accounts"][i]["acc_no"].splice(
            this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
              "ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ"
            )
          );
        }
        if (
          this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
            "ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ"
          ) >= 0
        ) {
          this.error_validation["bank_accounts"][i]["acc_no"].splice(
            this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
              "ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ"
            )
          );
        }
        return true;
      }

      if (isNaN(this.customer_info["bank_accounts"][i]["acc_no"].trim())) {
        if (
          this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
            "ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ"
          ) >= 0
        ) {
          this.error_validation["bank_accounts"][i]["acc_no"].splice(
            this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
              "ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ"
            )
          );
        }
        if (
          this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
            "ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ"
          ) < 0
        ) {
          this.error_validation["bank_accounts"][i]["acc_no"].push(
            "ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ"
          );
        }
        return false;
      } else if (
        this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
          "ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ"
        ) >= 0
      ) {
        this.error_validation["bank_accounts"][i]["acc_no"].splice(
          this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
            "ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ"
          )
        );
      }

      if (
        this.customer_info["bank_accounts"][i]["acc_no"].trim().length != 18
      ) {
        if (
          this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
            "ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ"
          ) >= 0
        ) {
          this.error_validation["bank_accounts"][i]["acc_no"].splice(
            this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
              "ເລກບັນຊີທະນາຄານຕ້ອງເປັນຕົວເລກ"
            )
          );
        }
        if (
          this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
            "ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ"
          ) < 0
        ) {
          this.error_validation["bank_accounts"][i]["acc_no"].push(
            "ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ"
          );
        }
        return false;
      } else if (
        this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
          "ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ"
        ) >= 0
      ) {
        this.error_validation["bank_accounts"][i]["acc_no"].splice(
          this.error_validation["bank_accounts"][i]["acc_no"].indexOf(
            "ເລກບັນຊີທະນາຄານຕ້ອງມີ 18 ຕົວ"
          )
        );
      }

      return true;
    },
    validateAccounts() {
      var compare = true;
      for (var i = 0; i < this.customer_info["bank_accounts"].length; i++) {
        var result = this.validateAccountNo(i);
        compare = compare && result;
      }
      return compare;
    },
    doNext() {
      //&& this.validateOccupation()
      if (
        this.validateType() &&
        this.validateName() &&
        this.validateAccounts() &&
        this.validateTel() &&
        this.validateOccupation()
      ) {
        for (var i = 0; i < this.customer_info["bank_accounts"].length; i++) {
          if (!this.customer_info["bank_accounts"][i]["acc_no"]) {
            this.customer_info["bank_accounts"].splice(i, 1);
          }
        }
        this.$store.commit("flexible_interest_module/addCustomerRequirement", {
          info: this.customer_info
        });
        window.sessionStorage.setItem(
          "requirement",
          JSON.stringify(this.customer_info)
        );
        this.$store.commit("flexible_interest_module/addProgressActionActive", {
          index: 0,
          key: "active-after",
          val: "stepper-active-after"
        });
        this.$store.commit("flexible_interest_module/addProgressActionActive", {
          index: 1,
          key: "active",
          val: "stepper-active"
        });
        window.sessionStorage.setItem(
          "actionProgress",
          JSON.stringify(
            this.$store.getters["flexible_interest_module/action_active"]
          )
        );
        this.$router.push({
          path:
            this.$store.getters["flexible_interest_module/root"] +
            "/flexible/staff/progress/product"
        });
      } else {
        this.validateType();
        this.validateName();
        // this.validateOccupation();
        this.validateAccounts();
        this.validateTel();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

img {
  width: 100%;
  margin-top: 5px;
}
.container {
  margin-top: 3rem;
}

.fi-content {
  position: relative;
  width: 100%;
}

.danger {
  font-size: 12px;
  color: red;
}
.danger:before {
  content: "* ";
}

.text-editor {
  position: relative;
  margin: 2rem 0;
  background: white;
  border-radius: 0.5rem;
  border: solid 1px rgba(197, 208, 216, 0.808);
  color: $secondary-color;
  &:focus-within {
    border: solid 1px $fi-primary;
  }
}
.fi-account-group {
  position: relative;
  border-radius: 0.5rem;
  border: solid 1px rgba(197, 208, 216, 0.808);
  color: $secondary-color;
  &:focus-within {
    border: solid 1px $fi-primary;
  }
}
.fi-account1 {
  //   margin-top: -25px;
}
.fi-account {
  position: relative;
  color: $secondary-color;
  padding: 10px;
  margin-bottom: 15px;
  animation-duration: 0.5s;
}
.fi-account-last {
  margin-bottom: 0px;
}
.fi-account-title {
  font-size: 20px;
  margin: 1rem 0;
  padding: 0 0.5rem;
  color: $secondary-color;
}

.acc-content-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  .acc-input-box {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    margin: 0.3rem 0.5rem;

    .fi-account-input {
      position: relative;
      width: 100%;
      margin: 0.5rem 0;
      background: transparent;
      border: none;
      color: #000000;
      padding-right: 5px;
      border-bottom: 1px rgba(117, 117, 117, 0.849) dotted;
      &:focus {
        border-bottom: 1px $fi-primary dotted;
      }
    }
    .acc-label {
      position: absolute;
      margin: 0;
      transform: translate(0, 0);
      pointer-events: none;
      transition: 0.2s;
    }

    .fi-account-input:valid + .acc-label {
      position: absolute;
      margin: 0;
      transform: translate(0, -1.5rem);
    }
  }
}

.fi-account-valid {
  color: orange;
  font-size: 12px;
}
.fi-add {
  cursor: pointer;
  color: #3287c4;
  font-size: 25px;
  font-weight: bold;
  margin-right: 1rem;
  margin-top: 1rem;
  &:hover {
    color: #51a6e2;
  }
}

.delIcon {
  cursor: pointer;
  position: absolute;
  color: orange;
  right: 10px;
  top: 10px;
  font-size: 1.3rem;
}
.delIcon:hover {
  color: rgb(255, 115, 0);
}

.radio-group-box {
  position: relative;
  flex: 1 1 auto;
}

.fi-group {
  border-radius: 0.5rem;
  border: solid 1px rgba(197, 208, 216, 0.808);
  padding: 1.3rem;
  &:focus-within {
    border: solid 1px $fi-primary;
  }
}

.radio-group {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.fi-container {
  display: inline;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.fi-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.fi-checkmark {
  position: absolute;
  top: 4px;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: $secondary-color;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.fi-container:hover input ~ .fi-checkmark {
  background-color: $semi-secondary-color;
}

/* When the radio button is checked, add a blue background */
.fi-container input:checked ~ .fi-checkmark {
  background-color: #3287c4;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.fi-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.fi-container input:checked ~ .fi-checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.fi-container .fi-checkmark:after {
  top: 4px;
  left: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: white;
}

.fi-btn-next {
  margin-top: 5px;
  margin-bottom: 10px;
  background: $fi-primary;
  color: white;
  border: 1px $fi-primary solid;
  border-radius: 3px;
  width: 8rem;
  font-size: 1.2rem;
  &:hover {
    background: #51a6e2;
  }
}
.fi-card {
  border: 1px lightgrey solid;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #c72b2c;
  -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #c72b2c;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #c72b2c;
  padding: 1rem;
  -webkit-transition: box-shadow 0.5s; /* For Safari 3.1 to 6.0 */
  transition: box-shadow 0.5s;
}
.fi-card:hover {
  border: 1px lightgrey solid;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 2px #c72b2c;
  -moz-box-shadow: 0.5px 0.5px 0.5px 2px #c72b2c;
  box-shadow: 0.5px 0.5px 0.5px 2px #c72b2c;
  padding: 1rem;
}
.interest-title {
  font-size: 3rem;
}
div.error-message {
  position: absolute;
  left: 12%;
  top: 80px;
}
.fi-padding-left {
  padding-left: 11%;
}
.account-title-box {
  position: absolute;
  color: $secondary-color;
  padding: 0 0.5rem;
  font-size: 20px;
  background-color: white;
  transform: translate(1.5rem, -1rem);
}

.fi-title-box {
  position: absolute;
  padding: 0 0.5rem;
  background-color: white;
  transform: translate(0rem, -2.2rem);
}

.fi-title {
  position: relative;
  color: $secondary-color;
  font-size: 1.3rem;
}
.fi-radio-text {
  font-size: 16px;
  color: #000000;
}

.err-text {
  font-size: 1rem;
  color: $primary-color;
}

.input-group-box {
  position: relative;
  display: flex;
  align-items: center;
  margin: 1.8rem 0;
  flex: 1 1 auto;
  border-radius: 0.5rem;
  border: solid 1px rgba(197, 208, 216, 0.808);
  color: $secondary-color;

  &:focus-within {
    border: solid 1px $fi-primary;
  }

  &.err-input {
    border: solid 1px $primary-color;
  }
  .fi-ico-box {
    position: relative;
    flex: 0 0 3rem;
    text-align: center;
    font-size: 1.2rem;
    padding: 0.3rem 0;
    color: $secondary-color;
    &.err-ico {
      color: $primary-color;
    }
  }

  .fi-input {
    flex: 1 1 auto;
    color: #000000;
    border: none;
    outline: none;
  }

  .fi-input + .control-label {
    position: absolute;
    transform: translate(3.1rem, 0);
    pointer-events: none;
    transition: 0.2s;
  }

  .fi-input:valid + .control-label {
    position: absolute;
    transform: translate(0.2rem, -2.1rem);
  }
}

textarea {
  color: #000000;
  width: 100%;
  height: 250px;
  padding: 1.5rem 1rem;
  background: transparent;
  border: none;
  font-size: 1rem;
}
// input.fi-input,
// select,
// span.show {
//   position: absolute;
//   color: white;
//   right: 18px;
//   top: 18px;
//   width: 54%;
//   background: transparent;
//   border: none;
//   font-size: 35px;
//   padding-right: 5px;
// }
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
select#currency option {
  margin: 40px;
  background: #a73334;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
select#deposit option {
  margin: 40px;
  background: #c1262e;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
select#interest option {
  margin: 40px;
  background: #c72b2c;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}

select:invalid {
  color: #d3d3d3;
}
</style>
