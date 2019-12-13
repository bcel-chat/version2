<template>
  <div class="container-fluid">
    <fi_dialog :config="fi_config" />
    <div v-if="showComment">
      <div class="fi-inverst-edit-background" @click="cancelCommentDialog()"></div>
      <div class="fi-edit-dialog">
        <div class="fi-edit-header">
          <h5>ຄຳຄິດເຫັນ</h5>
        </div>
        <div class="fi-edit-body">
          <textarea required v-model="comment" rows="3"></textarea>
          <span class="REJECTED" v-if="message">{{message}}</span>
        </div>
        <div class="fi-edit-footer">
          <button
            type="button"
            class="fi-btn-edit-cancel"
            @click="cancelCustomerConfirm()"
          >ລູກຄ້າຍົກເລີກ</button>
          <button type="button" class="fi-btn-edit-ok" @click="okCustomerConfirm()">ລູກຄ້າຕົກລົງ</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12">
        <h3 class="text-left">
          <strong class="REJECTED">Rejected</strong>
          <br class="fi-br" />
          <span
            class="fi-found-item"
          >( {{customer_requirement_history.length}}/{{totalFound}} ລາຍການ )</span>
        </h3>
        <label for="fi_search" class="fi-search">
          <input
            id="fi_search"
            class="fi-search-input"
            required
            type="text"
            placeholder="ຄົ້ນຫາ"
            v-model="search_data"
            @change="searchTextChange"
          />
          <button type="button" class="fi-search-button" @click="doSearch()">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </label>
        <hr style="margin-top: 0px;" />
      </div>
      <div class="col-12" v-if="!checkData()">
        <div class="fi-not-found">
          <Strong>ບໍ່ພົບຂໍ້ມູນ</Strong>
        </div>
      </div>
      <div
        class="col-12 col-sm-6 col-md-6 col-lg-4"
        v-for="(history, index) in customer_requirement_history"
        :key="index"
      >
        <div class="fi-card text-left" :class="'BACKGROUND-'+history['approveStatus']">
          <div class="fi-card-title">
            <h4>
              <span style="font-size: 16px;">ຊື່ລູກຄ້າ:</span>
              <strong>{{history['customerName']}}</strong>
            </h4>
            <span>
              <strong>ຜ່ານ:</strong>
              {{history['userStepper']}}
            </span>
            <span class="fi-top-right-action" v-if="(history['approveStatus'] == 'REJECTED_50')">
              <!-- <span title="ຢືນຢັນຄຳຕອບຂອງລູກຄ້າ" class="confirmIcon">
                                <i class="fa fa-check-circle" aria-hidden="true"></i>
              </span>-->
              <span
                title="ຢືນຢັນຄຳຕອບຂອງລູກຄ້າ"
                class="closeIcon"
                v-if="(history['approveStatus'] == 'REJECTED_50')"
                @click="showCommentDialog(history, index)"
              >
                <i class="fa fa-check-circle" aria-hidden="true"></i>
              </span>
            </span>
          </div>
          <div class="fi-card-body">
            <div class="fi-box">
              <table>
                <tbody>
                  <tr>
                    <th>ຈຳນວນເງິນຝາກ:</th>
                    <td>{{(history['currencyCode'] == 'USD')?history['currencyUnit']:''}}{{history['depositAmount'].toLocaleString().replace(/,/g, '.')}}{{(history['currencyCode'] != 'USD')?history['currencyUnit']:''}}</td>
                  </tr>
                  <tr>
                    <th>ສະກຸນເງິນ:</th>
                    <td>{{history['currencyName']}} ({{history['currencyCode']}})</td>
                  </tr>
                  <tr>
                    <th>ດອກເບ້ຍທີ່ຕ້ອງການ:</th>
                    <td>
                      {{history['customerInterest']}}%
                      <span
                        style="color: red;"
                        v-if="getExceededOutFlexible(index) "
                      >(ຍືດຫຍຸ່ນເກີນ​​ {{getExceededOutFlexible(index)}}%)</span>
                      <span
                        style="color: #20A816;"
                        v-if="getExceededInFlexible(index)"
                      >(ຍືດຫຍຸ່ນໃນກອບ {{getExceededInFlexible(index)}}%)</span>
                    </td>
                  </tr>
                  <tr>
                    <th>ໄລຍະຝາກ:</th>
                    <td>{{history['depositTypeName']}}</td>
                  </tr>
                  <tr>
                    <th>ອະນຸມັດ:</th>
                    <td
                      :class="(history['approveStatus'] == 'REJECTED_50')?'REJECTED':history['approveStatus']"
                    >{{(history['approveStatus'] == 'REJECTED_50')?'REJECTED':history['approveStatus']}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="fi-card-footer">
            <div class="row">
              <div class="col-7">
                <!-- <span> ພ/ງ: {{history['createUserName']}}</span>
                <br>-->
                <span>{{getFormatDate(history['createDate'] + ' ' + history['createTime'])}}</span>
              </div>
              <div class="col-5 text-right">
                <button
                  class="fi-btn"
                  type="button"
                  @click="getCustomerRequirementDetail(history)"
                >ລາຍລະອຽດ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 text-center" v-if="totalFound > customer_requirement_history.length">
        <img
          v-if="checkDataLoadMore"
          class="img-loader-out"
          src="@/assets/flexible_interest/images/loader.gif"
          alt="Loader"
        />
        <a class="fi-loadmore-link" v-else href="javascript:event" @click="doLoadMoreItem()">
          <strong>Load more&#8228;&#8228;&#8228;</strong>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
import ds from "@/helper/ds.js";
import address from "@/helper/server_address.js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/flexible_interest/fonts/phetsarath_font.css";
import fi_dialog from "@/components/flexible-interest/fi_dialog.vue";

export default {
  name: "staff_rejected",
  components: {
    fi_dialog
  },
  data() {
    return {
      customer_requirement_history: [],
      totalFound: 0,
      search_data: "",
      checkDataLoadMore: false,
      chosenRejectOKCancelRequirement: {},
      showComment: false,
      comment: "",
      message: "",
      fi_config: {
        show: false,
        title: "Message",
        message: "ເຫດຜົນແມ່ນ...",
        buttons: [
          {
            text: "OK",
            action: () => {
              //console.log('OK');
              this.fi_config["show"] = false;
            }
          }
        ]
      }
    };
  },
  created() {
    this.getAllRejected();
  },
  mounted() {},
  methods: {
    searchTextChange() {
      if (!this.search_data.trim()) {
        this.getAllRejected();
      }
    },
    doLoadMoreItem() {
      this.checkDataLoadMore = true;
      if (this.search_data.trim()) {
        this.getAllRejectedSearchLoadMore();
      } else {
        this.getAllRejectedLoadMore();
      }
    },
    doSearch() {
      if (this.search_data.trim()) {
        this.getAllRejectedSearch();
      }
    },
    cancelCommentDialog() {
      this.chosenRejectOKCancelRequirement = {};
      this.showComment = false;
      this.comment = "";
      this.message = "";
    },
    showCommentDialog(history, index) {
      this.chosenRejectOKCancelRequirement = {
        history: history,
        index: index
      };
      this.showComment = true;
    },
    okCustomerConfirm() {
      if (this.comment.trim()) {
        this.message = "";
        ds.rpc.make(
          "/bcel/chat/api/flexible/interest/customer/requirement/reject50/confirm",
          {
            requirementId: this.chosenRejectOKCancelRequirement["history"][
              "requirementId"
            ],
            comment: this.comment.trim(),
            confirm: true
          },
          (error, result) => {
            this.showComment = false;
            if (result) {
              this.fi_config = {
                show: true,
                title: "Message",
                message: result["message"],
                buttons: [
                  {
                    text: "ຕົກລົງ",
                    action: () => {
                      if (result["success"]) {
                        this.customer_requirement_history.splice(
                          this.chosenRejectOKCancelRequirement["index"],
                          1
                        );
                        this.totalFound = this.totalFound - 1;
                      }
                      this.chosenRejectOKCancelRequirement = {};
                      this.comment = "";
                      this.fi_config["show"] = false;
                    }
                  }
                ]
              };
            } else {
              //console.log(error)
              this.fi_config = {
                show: true,
                title: "Message",
                message: "ເກີດຂໍ້ຜິດພາດໃນຂະນະຢືນຢັນລາຍການ",
                buttons: [
                  {
                    text: "ຕົກລົງ",
                    action: () => {
                      this.fi_config["show"] = false;
                    }
                  }
                ]
              };
            }
          }
        );
      } else {
        this.message = "ຄຳຄິດເຫັນຫ້າມວ່າງ...";
      }
    },
    cancelCustomerConfirm() {
      if (this.comment.trim()) {
        this.message = "";
        ds.rpc.make(
          "/bcel/chat/api/flexible/interest/customer/requirement/reject50/confirm",
          {
            requirementId: this.chosenRejectOKCancelRequirement["history"][
              "requirementId"
            ],
            comment: this.comment.trim(),
            confirm: false
          },
          (error, result) => {
            this.showComment = false;
            if (result) {
              this.fi_config = {
                show: true,
                title: "Message",
                message: result["message"],
                buttons: [
                  {
                    text: "ຕົກລົງ",
                    action: () => {
                      if (result["success"]) {
                        this.customer_requirement_history[
                          this.chosenRejectOKCancelRequirement["index"]
                        ]["approveStatus"] = "REJECTED";
                      }
                      this.chosenRejectOKCancelRequirement = {};
                      this.comment = "";
                      this.fi_config["show"] = false;
                    }
                  }
                ]
              };
            } else {
              //console.log(error)
              this.fi_config = {
                show: true,
                title: "Message",
                message: "ເກີດຂໍ້ຜິດພາດໃນຂະນະຍົກເລີກລາຍການ",
                buttons: [
                  {
                    text: "ຕົກລົງ",
                    action: () => {
                      this.fi_config["show"] = false;
                    }
                  }
                ]
              };
            }
          }
        );
      } else {
        this.message = "ຄຳຄິດເຫັນຫ້າມວ່າງ...";
      }
    },
    getAllRejectedSearch() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/customer/requirement/by/staff/rejected/search",
        {
          staffUser: this.$store.getters["flexible_interest_module/user"],
          searchData: this.search_data.trim()
        },
        (error, result) => {
          if (result) {
            this.customer_requirement_history = result["data"];
            this.totalFound = result["found"];
            //this.customer_requirement_history = result;
            //this.normalInterest = [];
            /*for(var i=0; i<this.customer_requirement_history.length; i++){
                    // ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_requirement_history[i]['currencyCode'], acClass: this.customer_requirement_history[i]['accountClass']}, ( err, res ) => {
                        
                    //     if(error){
                    //             this.normalInterest.push('0');
                    //     } else{
                    //         if(result){
                    //             this.normalInterest.push(res['interest']);
                    //         } else {
                    //             this.normalInterest.push('0');
                    //         }
                    //     }
                    // });
                    axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_requirement_history[i]['accountClass']+'/'+this.customer_requirement_history[i]['currencyCode']+'/'+this.customer_requirement_history[i]['requirementId'])
                    .then((res) => {
                        for(var j=0; j<this.customer_requirement_history.length; j++){
                            if(res['data']['data']['requirementId'] == this.customer_requirement_history[j]['requirementId']){
                                this.customer_requirement_history[j]['normalInterest'] = res['data']['data']['interest'];
                                break;
                            }
                        }
                    })
                    .catch((error) =>  {
                        //this.normalInterest.push('0');
                    })
                }*/
          }
        }
      );
    },
    getAllRejectedSearchLoadMore() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/customer/requirement/by/staff/rejected/search",
        {
          staffUser: this.$store.getters["flexible_interest_module/user"],
          searchData: this.search_data.trim(),
          rowIndex: this.customer_requirement_history.length
        },
        (error, result) => {
          if (result) {
            var data = result["data"];
            for (var i = 0; i < data.length; i++) {
              this.customer_requirement_history.push(data[i]);
            }
            this.checkDataLoadMore = false;
          }
        }
      );
    },
    getAllRejected() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/customer/requirement/by/staff/rejected",
        { staffUser: this.$store.getters["flexible_interest_module/user"] },
        (error, result) => {
          if (result) {
            this.customer_requirement_history = result["data"];
            this.totalFound = result["found"];
            //this.customer_requirement_history = result;
            //this.normalInterest = [];
            /*for(var i=0; i<this.customer_requirement_history.length; i++){
                    // ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_requirement_history[i]['currencyCode'], acClass: this.customer_requirement_history[i]['accountClass']}, ( err, res ) => {
                        
                    //     if(error){
                    //             this.normalInterest.push('0');
                    //     } else{
                    //         if(result){
                    //             this.normalInterest.push(res['interest']);
                    //         } else {
                    //             this.normalInterest.push('0');
                    //         }
                    //     }
                    // });
                    axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_requirement_history[i]['accountClass']+'/'+this.customer_requirement_history[i]['currencyCode']+'/'+this.customer_requirement_history[i]['requirementId'])
                    .then((res) => {
                        for(var j=0; j<this.customer_requirement_history.length; j++){
                            if(res['data']['data']['requirementId'] == this.customer_requirement_history[j]['requirementId']){
                                this.customer_requirement_history[j]['normalInterest'] = res['data']['data']['interest'];
                                break;
                            }
                        }
                    })
                    .catch((error) =>  {
                        //this.normalInterest.push('0');
                    })
                }*/
          }
        }
      );
    },
    getAllRejectedLoadMore() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/customer/requirement/by/staff/rejected",
        {
          staffUser: this.$store.getters["flexible_interest_module/user"],
          rowIndex: this.customer_requirement_history.length
        },
        (error, result) => {
          if (result) {
            var data = result["data"];
            for (var i = 0; i < data.length; i++) {
              this.customer_requirement_history.push(data[i]);
            }
            this.checkDataLoadMore = false;
          }
        }
      );
    },
    getCustomerRequirementDetail(history) {
      this.$store.commit("flexible_interest_module/addRequestApproveDetail", {
        info: history
      });
      this.$router.push({
        path:
          this.$store.getters["flexible_interest_module/root"] +
          "/flexible/customer/requirement/detail/" +
          btoa(history["requirementId"])
      });
    },
    checkData() {
      if (this.customer_requirement_history.length > 0) {
        return true;
      }
      return false;
    },
    getFormatDate(date) {
      var d = new Date(date);
      var day = d.getDate();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      var hour = d.getHours();
      var minute = d.getMinutes();
      var second = d.getSeconds();

      return `${day < 10 ? "0" + day : day}/${
        month < 10 ? "0" + month : month
      }/${year} ${hour < 10 ? "0" + hour : hour}:${
        minute < 10 ? "0" + minute : minute
      }:${second < 10 ? "0" + second : second}`;
    },
    getExceededOutFlexible(i) {
      try {
        var customer_interest = parseFloat(
          this.customer_requirement_history[i]["customerInterest"]
        );
        var normal_interest = parseFloat(
          this.customer_requirement_history[i]["normalInterest"]
        );
        var max_interest =
          normal_interest +
          parseFloat(this.customer_requirement_history[i]["interestFlexible"]);
        if (
          customer_interest > max_interest &&
          normal_interest < max_interest &&
          normal_interest > 0
        ) {
          return (customer_interest - max_interest).toLocaleString();
        } else {
          return 0;
        }
      } catch (e) {
        return 0;
      }
    },
    getExceededInFlexible(i) {
      try {
        var customer_interest = parseFloat(
          this.customer_requirement_history[i]["customerInterest"]
        );
        var normal_interest = parseFloat(
          this.customer_requirement_history[i]["normalInterest"]
        );
        var max_interest =
          normal_interest +
          parseFloat(this.customer_requirement_history[i]["interestFlexible"]);
        if (
          customer_interest <= max_interest &&
          customer_interest > normal_interest &&
          normal_interest < max_interest
        ) {
          return (customer_interest - normal_interest).toLocaleString();
        } else {
          return 0;
        }
      } catch (e) {
        return 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a.fi-loadmore-link {
  font-size: 22px;
}
img.img-loader-out {
  margin-top: 15px;
  width: 30px;
  margin-bottom: 15px;
}
.fi-found-item {
  opacity: 0.6;
  font-size: 14px;
  color: gray;
  padding-top: 0px;
}
.fi-br {
  display: none;
}
.fi-top-right-action {
  position: absolute;
  top: 0px;
  right: 6px;
}
.closeIcon {
  cursor: pointer;
  color: rgb(202, 23, 23);
  margin-left: 3px;
  font-weight: bold;
}
.closeIcon:hover {
  color: rgba(231, 84, 84, 0.938);
}

.confirmIcon {
  cursor: pointer;
  color: white;
  margin-right: 3px;
  font-weight: bold;
}
.confirmIcon:hover {
  color: rgb(231, 231, 231);
}

.fi-inverst-edit-background {
  top: 0px;
  left: 0px;
  z-index: 100;
  position: fixed;
  background: black;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.fi-edit-dialog {
  border-radius: 2px;
  top: 50%;
  margin-top: -100px;
  left: 50%;
  margin-left: -150px;
  position: fixed;
  color: rgb(165, 164, 164);
  z-index: 100;
  background: white; //linear-gradient(to bottom right, rgba(243, 195, 189, 0.918) 10%, rgb(202, 86, 94) 200%);
  border: 1px lightgrey solid;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #c72b2c;
  -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #c72b2c;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #c72b2c;
  padding: 5px;
  width: 300px;
  min-height: 120px;
}
.fi-edit-header,
.fi-edit-body {
  text-align: left;
}
.fi-edit-footer {
  text-align: right;
}
.fi-btn-edit-ok {
  margin-left: 5px;
  background: #20a816;
  color: white;
  border: none;
  border-radius: 3px;
  width: auto;
  font-size: 1rem;
}
.fi-btn-edit-cancel {
  margin-left: 5px;
  background: rgb(250, 127, 123);
  color: white;
  border: none;
  border-radius: 3px;
  width: auto;
  font-size: 1rem;
}
textarea {
  width: 100%;
  padding-left: 1px;
  background: transparent;
  color: rgb(102, 102, 102);
  border: none;
  border-bottom: 1px rgb(250, 151, 144) dotted;
  padding-right: 5px;
  font-size: 14px;
}
textarea:focus {
  outline: none;
}
textarea:focus,
textarea:valid {
  border-bottom: 1px rgb(247, 99, 88) dotted;
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

.PENDING {
  color: #a8890c;
  font-weight: bold;
}
.REJECTED {
  color: #f34e4e;
}
.BACKGROUND-REJECTED {
  background: #f34e4e;
}
.APPROVED {
  color: #20a816;
}
.REJECTED_50 {
  color: rgb(240, 240, 15);
}
.fi-REJECTED_50 {
  color: rgb(204, 204, 4);
}
.BACKGROUND-REJECTED_50 {
  background: rgb(252, 168, 162);
}

.fi-not-found > strong {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  padding: 10px;
  color: #ccc;
  font-size: 25px;
  font-weight: bold;
}
table.table,
table.table > tbody > tr {
  border: 1px black solid;
}
table.table > tbody > tr > th {
  border-top: 1px black solid;
}
table.table > tbody > tr {
  cursor: pointer;
}
table.table > tbody > tr > td {
  padding: 4px;
}
table.table > tbody > tr:hover {
  background: #f15e54;
  color: white;
}
.fi-btn {
  background: white;
  color: #f34e4e;
  border: 1px white solid;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
}
.fi-btn:hover {
  color: #c72b2c;
}
button:focus {
  outline: none;
}

.fi-card {
  border: 0.3px lightgrey solid;
  border-radius: 10px;
  -webkit-box-shadow: -2px 3px 14px -7px rgba(0, 0, 0, 0.52);
  -moz-box-shadow: -2px 3px 14px -7px rgba(0, 0, 0, 0.52);
  box-shadow: -2px 3px 14px -7px rgba(0, 0, 0, 0.52);
  -webkit-transition: box-shadow 0.5s; /* For Safari 3.1 to 6.0 */
  transition: box-shadow 0.5s;
  margin-bottom: 10px;
}
.fi-card:hover {
  -webkit-box-shadow: -2px 3px 20px -7px lightgray;
  -moz-box-shadow: -2px 3px 20px -7px lightgray;
  box-shadow: -2px 3px 20px -7px lightgray;
}
.fi-card-title {
  position: relative;
  padding: 10px 5px 5px 5px;
  color: white;
}
.fi-box {
  -webkit-box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
  -moz-box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
  box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
  padding: 5px 5px 5px 5px;
  color: rgb(92, 91, 91);
  background: white;
}
.fi-card-footer {
  background: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0px 5px 0px 5px;
}

/*Search Input*/
label.fi-search {
  position: absolute;
  top: 5px;
  right: 16px;
}
input.fi-search-input:not([type="file"]) {
  padding-left: 5px;
  background: white;
  color: rgb(66, 64, 64);
  border: none;
  padding-right: 5px;
}
input.fi-search-input:focus,
button.fi-search-button:focus {
  outline: none;
}
button.fi-search-button {
  border: 1px rgb(247, 152, 145) solid;
  background: rgb(247, 152, 145);
  color: white;
}
button.fi-search-button:hover {
  border: 1px rgb(248, 102, 91) solid;
  background: rgb(248, 102, 91);
}
input.fi-search-input:not([type="file"]):invalid {
  border: 1px rgba(197, 196, 196, 0.849) solid;
}
input.fi-search-input:focus,
input:not([type="file"]):valid {
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

@media only screen and (max-width: 500px) {
  h3 {
    font-size: 23px;
  }
  h4 {
    font-size: 20px;
  }
  h2 {
    font-size: 25px;
  }
  input.fi-search-input:not([type="file"]) {
    width: 150px;
    font-size: 14px;
  }
  button.fi-search-button {
    font-size: 14px;
  }
}

@media only screen and (max-width: 400px) {
  .fi-br {
    display: block;
  }
}
</style>