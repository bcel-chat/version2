<template>
  <div>
    <div>
      <ul class="nav nav-tabs justify-content-end">
        <li class="nav-item nav-item-custom-style">
          <a class="nav-link" @click="downloadToExcel()">
            <i class="fas fa-file-excel"></i>
            <small>xls</small>
          </a>
        </li>
        <li class="nav-item nav-item-custom-style">
          <a class="nav-link" @click="doPrintPDF()">
            <i class="fas fa-file-pdf"></i>
            <small>pdf</small>
          </a>
        </li>
        <li class="nav-item nav-item-custom-style">
          <a class="nav-link">
            <strong class="fi-tab-title">
              <select required v-model="limit" @change="getData()">
                <option value="50">50 ແຖວ</option>
                <option value="100">100 ແຖວ</option>
                <option value="250">250 ແຖວ</option>
                <option value="500">500 ແຖວ</option>
                <option value="1000">1000 ແຖວ</option>
                <option value="all">ທັງໝົດ</option>
              </select>
            </strong>
          </a>
        </li>
        <li class="nav-item nav-item-custom-style">
          <a class="nav-link">
            <strong class="fi-tab-title">
              ປີ
              <label for class="fi-date-label">
                <datepicker
                  input-class="fi-input-date"
                  @changedYear="yearValueChange"
                  @changedMonth="monthValueChange"
                  v-model="choose_year"
                  format="yyyy"
                ></datepicker>
              </label>
            </strong>
          </a>
        </li>
        <li class="nav-item nav-item-custom-style">
          <a class="nav-link">
            <strong class="fi-tab-title">
              <input type="text" required v-model="search_data" @change="changeValue" />
              <button type="button" class="fi-search-button" @click="doSearch()">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </strong>
          </a>
        </li>
      </ul>
    </div>
    <div class="container-fluid" id="fi_print">
      <div class="row">
        <div class="col-12 show-on-print-mode">
          <img
            class="img-header"
            src="@/assets/flexible_interest/images/bcel_header.png"
            alt="header"
          />
        </div>
        <div class="col-12 col-sm-12 col-md-12">
          <h3 class="fi-title text-center">
            <strong>ລາຍການທີ່ຖືກປະຕິເສດປະຈຳປີ</strong>
          </h3>
        </div>
        <div class="col-12 col-sm-12 col-md-12">
          <div class="table-responsive">
            <table class="table text-left">
              <thead>
                <tr>
                  <th>ລະຫັດ</th>
                  <th>ຊື່ລູກຄ້າ</th>
                  <th>ປະເພດ</th>
                  <th>ເບີໂທ</th>
                  <th>ຈຳນວນເງິນຝາກ</th>
                  <th>ສະກຸນເງິນ</th>
                  <th>ດ/ບ ທີ່ຕ້ອງການ</th>
                  <th>ໄລຍະຝາກ</th>
                  <th>ດ/ບ ປົກກະຕິ</th>
                  <th>ດ/ບ ຍືດຫຍຸ່ນ</th>
                  <th>ໄລຍະຮັບດອກເບ້ຍ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(requirement, index) in customer_requirments" :key="index">
                  <td>{{requirement['requirementId']}}</td>
                  <td>{{requirement['customerName']}}</td>
                  <td>{{requirement['customerTypeDesc']}}</td>
                  <td>{{requirement['customerTel']}}</td>
                  <td>{{(requirement['currencyCode'] == 'USD')?requirement['currencyUnit']:''}}{{requirement['depositAmount'].toLocaleString().replace(/,/g, '.')}}{{(requirement['currencyCode'] != 'USD')?requirement['currencyUnit']:''}}</td>
                  <td>{{requirement['currencyName']}}({{requirement['currencyCode']}})</td>
                  <td
                    :class="getExceededInFlexible(requirement['customerInterest'], requirement['normalInterest'], requirement['interestFlexible'])?'in-scope':getExceededOutFlexible(requirement['customerInterest'], requirement['normalInterest'], requirement['interestFlexible'])?'out-scope':''"
                  >{{requirement['customerInterest']}}%</td>
                  <td>{{requirement['depositTypeName']}}</td>
                  <td>{{requirement['normalInterest']}}%</td>
                  <td>{{requirement['interestFlexible']}}%</td>
                  <td>{{requirement['interestChosen']}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Datepicker from "vuejs-datepicker";

import ds from "@/helper/deepstream.js";

export default {
  name: "flexible_main",
  components: {
    Datepicker
  },
  data() {
    return {
      choose_year: new Date(),
      limit: 50,
      search_data: "",
      customer_requirments: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    changeValue() {
      if (!this.search_data.trim()) {
        this.getData();
      }
    },
    doSearch() {
      if (this.search_data.trim()) {
        this.getData();
      }
    },
    monthValueChange(month) {
      if (month["timestamp"]) {
        var date = new Date();
        if (date.getFullYear() != this.choose_year.getFullYear()) {
          this.choose_year = month["timestamp"];
          this.getData();
        }
      } else {
        if (month.getFullYear() != this.choose_year.getFullYear()) {
          this.choose_year = month;
          this.getData();
        }
      }
    },
    yearValueChange(year) {
      if (year["timestamp"]) {
        this.choose_year = new Date(year["timestamp"]);
        this.getData();
      }
    },
    getData() {
      ds.rpc.make(
        "/bcel/chat/api/flexible/interest/report/customer/requirement/rejected/yearly",
        {
          limited: this.limit,
          _year: this.choose_year ? this.getYear(this.choose_year) : "",
          searchData: this.search_data,
          userid: this.$store.getters["flexible_interest_module/user"]
        },
        (error, result) => {
          if (result) {
            this.customer_requirments = result;
          } else {
            this.customer_requirments = [];
          }
        }
      );
    },
    downloadToExcel() {
      if (this.customer_requirments.length > 0) {
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = [
            "ລະຫັດ",
            "ຊື່ລູກຄ້າ",
            "ອາຊີບ",
            "ປະເພດ",
            "ເບີໂທ",
            "ຂໍ້ມູນອື່ນໆ",
            "ຈຳນວນເງິນຝາກ",
            "ສະກຸນເງິນ",
            "ລະຫັດສະກຸນເງິນ",
            "ດອກເບ້ຍທີ່ຕ້ອງການ",
            "ໄລຍະຝາກ",
            "ດອກເບ້ຍປົກກະຕິ",
            "ດອກເບ້ຍຍຶດຍຸ່ນສູງສຸດ",
            "ໄລຍະຮັບດອກເບ້ຍ",
            "ຜູ້ຂໍອະນຸມັດ",
            "ຂະແໜງ",
            "ພະແນກ",
            "ສາຂາ",
            "ຄຳຄິດເຫັນຂອງພະນັກງານ",
            "ວັນທີ່",
            "ເວລາ",
            "ຜູ້ອະນຸມັດ",
            "ວັນທີ່",
            "ເວລາ",
            "ສະຖານະ",
            "ໝາຍເຫດ"
          ];
          const filterVal = [
            "requirementId",
            "customerName",
            "customerOccupation",
            "customerTypeDesc",
            "customerTel",
            "customerDetail",
            "depositAmount",
            "currencyName",
            "currencyCode",
            "customerInterest",
            "depositTypeName",
            "normalInterest",
            "interestFlexible",
            "interestChosen",
            "createUserName",
            "createUserDivision",
            "createUserDepartment",
            "createUserBranch",
            "staffNote",
            "createDate",
            "createTime",
            "approveUserName",
            "approveDate",
            "approveTime",
            "approveStatus",
            "cancleComment"
          ];
          const list = this.customer_requirments;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename:
              "report-interest-flexible-rejected-yearly-" +
              this.getYear(this.choose_year) +
              "-limit-" +
              this.limit,
            autoWidth: true,
            bookType: "xlsx"
          });
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    doPrintPDF() {
      if (this.customer_requirments.length > 0) {
        $.print("#fi_print");
      }
    },
    getYear(date) {
      return date.getFullYear();
    },
    getExceededOutFlexible(customerInterest, normalInterest, interestFlexible) {
      try {
        var customer_interest = parseFloat(customerInterest);
        var max_interest =
          parseFloat(normalInterest) + parseFloat(interestFlexible.toString());
        if (
          customer_interest > max_interest &&
          normalInterest > 0 &&
          interestFlexible > 0
        ) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    },
    getExceededInFlexible(customerInterest, normalInterest, interestFlexible) {
      try {
        var customer_interest = parseFloat(customerInterest);
        var normal_interest = parseFloat(normalInterest);
        var max_interest = normal_interest + parseFloat(interestFlexible);
        if (
          customer_interest <= max_interest &&
          customer_interest > normal_interest &&
          normalInterest > 0 &&
          interestFlexible > 0
        ) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fi-title {
  padding-top: 15px;
}

li.nav-item-custom-style > a {
  color: rgb(50, 135, 196);
  cursor: pointer;
}

.out-scope {
  color: #f34e4e;
}
.in-scope {
  color: #20a816;
}

.fi-date-label {
  //border: 1px rgba(248, 204, 201, 0.849) solid;
}
.fi-input-date {
  border: 1px rgba(248, 204, 201, 0.849) solid;
  width: 100px;
}
input:not([type="file"]),
select {
  padding-left: 5px;
  background: white;
  color: rgb(66, 64, 64);
  border: none;
  padding-right: 5px;
}
input:focus,
button:focus,
select:focus {
  outline: none;
}
button.fi-search-button {
  padding-left: 5px;
  padding-right: 5px;
  border: 1px rgb(247, 152, 145) solid;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background: rgb(247, 152, 145);
  color: white;
}
button.fi-search-button:hover {
  border: 1px rgb(248, 102, 91) solid;
  background: rgb(248, 102, 91);
}
input:not([type="file"]):invalid,
select:invalid {
  border: 1px rgba(197, 196, 196, 0.849) solid;
}
input:focus,
input:not([type="file"]):valid,
select:focus,
select:valid {
  border: 1px rgba(248, 204, 201, 0.849) solid;
}
::placeholder {
  color: #d3d3d3;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #d3d3d3;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #d3d3d3;
}
img.img-header {
  width: 100%;
}
.show-on-print-mode {
  display: none;
}
@media print {
  .show-on-print-mode {
    display: block;
  }
  .hide-on-print-mode {
    display: none;
  }

  #fi_print {
    overflow: hidden !important;
  }
  #fi_print table tr td {
    font-size: 12px;
  }
}
</style>