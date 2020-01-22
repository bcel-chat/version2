<template>
  <div class="container">
    <div class="_content">
      <div class="control-panel">
        <div class="input-box pd-right">
          <div
            :class="['text-editor', error_validation['staff_note'].length > 0 ? 'err-input' : '']"
          >
            <span class="account-title-box">
              <strong
                :class="[error_validation['staff_note'].length > 0 ? 'err-fi-title' : '']"
              >ຄຳຄິດຄຳເຫັນຂອງພະນັກງານ</strong>
            </span>
            <textarea
              id="more_detail"
              placeholder="ປະກອບຄຳຄິດຄຳເຫັນ"
              v-model="customer_info['staff_note']"
              @change="validateStaffNote"
            ></textarea>
          </div>
        </div>
        <div class="input-box pd-left">
          <div class="text-editor">
            <span class="account-title-box">
              <strong class="fi-title">ເອກະສານປະກອບຂອງລູກຄ້າ</strong>
            </span>
            <textarea
              id="more_detail"
              placeholder="ເອກະສານຕິດຄັດຕ່າງໆ"
              v-model="customer_info['documents']"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="button-box">
        <div class>
          <button class="fi-btn-next" type="button" @click="backwardProgress()">&#8592;</button>
        </div>
        <div class>
          <button class="fi-btn-next" type="button" @click="doNext()">ຕໍ່ໄປ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/flexible_interest/fonts/phetsarath_font.css";
export default {
  name: "document_attach",
  data() {
    return {
      customer_info: this.$store.getters[
        "flexible_interest_module/requirement"
      ],
      error_validation: {
        staff_note: [],
        documents: []
      }
    };
  },
  created() {
    if (window.sessionStorage.getItem("actionProgress")) {
      var stepAction = JSON.parse(
        window.sessionStorage.getItem("actionProgress")
      );
      if (!stepAction[3]["active"]) {
        for (var i = 0; i < stepAction.length; i++) {
          if (!stepAction[i]["active-after"]) {
            if (i == 0) {
              this.$router.push({
                path:
                  sessionStorage.getItem("flexible_root_router") +
                  "/flexible/staff/progress/info"
              });
            } else if (i == 1) {
              this.$router.push({
                path:
                  sessionStorage.getItem("flexible_root_router") +
                  "/flexible/staff/progress/product"
              });
            } else if (i == 2) {
              this.$router.push({
                path:
                  sessionStorage.getItem("flexible_root_router") +
                  "/flexible/staff/progress/interest"
              });
            } else if (i == 3) {
              this.$router.push({
                path:
                  sessionStorage.getItem("flexible_root_router") +
                  "/flexible/staff/progress/document/attach"
              });
            } else if (i == 4) {
              this.$router.push({
                path:
                  sessionStorage.getItem("flexible_root_router") +
                  "/flexible/staff/progress/interest/approve"
              });
            }
            break;
          }
        }
      }
    } else {
      this.$root.$emit("resetDefault");
      this.$router.push({
        path:
          sessionStorage.getItem("flexible_root_router") +
          "/flexible/staff/progress/info"
      });
    }
  },
  mounted() {
    //console.log(this.customer_info)
  },
  methods: {
    validateStaffNote() {
      if (!this.customer_info["staff_note"].trim()) {
        if (this.error_validation["staff_note"].length == 0) {
          this.error_validation["staff_note"].push(
            "ຄຳຄິດເຫັນຂອງພະນັກງານຫ້າມວ່າງ"
          );
        }
        return false;
      } else if (this.error_validation["staff_note"].length > 0) {
        this.error_validation["staff_note"].pop();
      }
      return true;
    },
    validateDocuments() {
      if (!this.customer_info["documents"].trim()) {
        // if(this.error_validation['documents'].indexOf('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ') >= 0) {
        //     this.error_validation['documents'].splice(this.error_validation['document_files'].indexOf('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ'));
        // }
        if (
          this.error_validation["documents"].indexOf(
            "ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ"
          ) < 0
        ) {
          this.error_validation["documents"].push(
            "ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ"
          );
        }
        return false;
      } else if (
        this.error_validation["documents"].indexOf(
          "ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ"
        ) >= 0
      ) {
        this.error_validation["documents"].splice(
          this.error_validation["documents"].indexOf(
            "ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ"
          )
        );
      }
      //   if(this.customer_info['document_files'].length <= 0){
      //         if(this.error_validation['documents'].indexOf('ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ') >= 0) {
      //             this.error_validation['documents'].splice(this.error_validation['documents'].indexOf('ຂໍ້ມູນເອກະສານປະກອບຂອງລູກຄ້າຫ້າມວ່າງ'));
      //         }
      //         if(this.error_validation['documents'].indexOf('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ') < 0){
      //             this.error_validation['documents'].push('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ');
      //         }
      //       return false;
      //   }  else if(this.error_validation['documents'].indexOf('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ') >= 0) {
      //       this.error_validation['documents'].splice(this.error_validation['documents'].indexOf('ຄວນມີຟາຍລ໌ເອກະສານປະກອບທີ່ກ່ຽວຂ້ອງ'));
      //   }
      return true;
    },
    getDocumentFiles($event) {
      this.customer_info["document_files"] = $event["target"]["files"];
      this.validateDocuments();
    },
    doNext() {
      if (this.validateStaffNote()) {
        this.$store.commit("flexible_interest_module/addCustomerRequirement", {
          info: this.customer_info
        });
        window.sessionStorage.setItem(
          "requirement",
          JSON.stringify(this.customer_info)
        );
        this.$store.commit("flexible_interest_module/addProgressActionActive", {
          index: 3,
          key: "active-after",
          val: "stepper-active-after"
        });
        this.$store.commit("flexible_interest_module/addProgressActionActive", {
          index: 4,
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
            "/flexible/staff/progress/interest/approve"
        });
      } else {
        this.validateStaffNote();
        this.validateDocuments();
      }
    },
    backwardProgress() {
      this.$router.push({
        path:
          this.$store.getters["flexible_interest_module/root"] +
          "/flexible/staff/progress/interest"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

._content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.control-panel {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.danger {
  font-size: 12px;
  color: red;
}
.danger:before {
  content: "- ";
}
.account-title-box {
  position: absolute;
  color: $secondary-color;
  padding: 0 0.5rem;
  font-size: 20px;
  background-color: white;
  transform: translate(1.5rem, -1rem);
}

.err-fi-title {
  color: $primary-color;
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
.fi-text {
  color: white;
}
.text-editor {
  margin-top: 5px;
  border-radius: 30px 0px 0px 0px;
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
    background: $fi-hover;
  }
}

.interest-title {
  font-size: 3rem;
}
.pd-left {
  padding-left: 0;
  @media screen and (min-width: 760px) {
    padding-left: 1rem;
  }
}
.pd-right {
  padding-right: 0;
  @media screen and (min-width: 760px) {
    padding-right: 1rem;
  }
}
.input-box {
  position: relative;
  flex: 1 1 auto;
}
.text-editor {
  position: relative;
  margin: 1rem 0 0.5rem 0;
  background: white;
  border-radius: 0.5rem;
  border: solid 1px rgba(197, 208, 216, 0.808);
  color: $secondary-color;
  &:focus-within {
    border: solid 1px $fi-primary;
  }
}
.err-input {
  border: solid 1px $primary-color;
}
textarea {
  color: #000000;
  width: 100%;
  height: 250px;
  padding: 1.5rem 1rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  outline: none;
}

.button-box {
  position: relative;
  display: flex;
  justify-content: space-between;
}
</style>
