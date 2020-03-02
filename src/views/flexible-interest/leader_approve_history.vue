<template>
  <div class="container-fluid">
    <div class="row" v-if="mobileMode">
      <div class="col-12 col-sm-12 col-md-12">
        <h2 class="text-left">
          <strong class="history">History</strong>
          <br class="fi-br" />
          <span
            class="fi-found-item"
          >( {{customer_requirement_history.length}}/{{totalFound}} ລາຍການ )</span>
        </h2>
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
        <div class="fi-card text-left" :class="'BACKGROUND-CARD-'+history['approveStatus']">
          <div class="fi-card-title">
            <h5>
              <span style="font-size: 16px; margin-right: 5px">ຊື່ລູກຄ້າ:</span>
              <strong>{{history['customerName']}}</strong>
            </h5>
            <span>
              <strong>ຜ່ານ:</strong>
              {{history['userStepper']}}
            </span>
          </div>
          <div class="fi-card-body">
            <div class="fi-box">
              <div class="detail-box">
                <div class="detail-inside">
                  <strong>ຈຳນວນເງິນຝາກ:</strong>
                  <div
                    class="detail-title"
                  >{{(history['currencyCode'] == 'USD')?history['currencyUnit']:''}}{{history['depositAmount'].toLocaleString().replace(/,/g, '.')}}{{(history['currencyCode'] != 'USD')?history['currencyUnit']:''}}</div>
                </div>
                <div class="detail-inside">
                  <strong>ສະກຸນເງິນ:</strong>
                  <div
                    class="detail-title"
                  >{{history['currencyName']}} ({{history['currencyCode']}})</div>
                </div>
                <div class="detail-inside">
                  <strong>ດອກເບ້ຍທີ່ຕ້ອງການ:</strong>
                  <div class="detail-title">
                    {{history['customerInterest']}}%
                    <span
                      style="color: red;"
                      v-if="getExceededOutFlexible(index) "
                    >(ຍືດຫຍຸ່ນເກີນ​​ {{getExceededOutFlexible(index)}}%)</span>
                    <span
                      style="color: #20A816;"
                      v-if="getExceededInFlexible(index)"
                    >(ຍືດຫຍຸ່ນໃນກອບ {{getExceededInFlexible(index)}}%)</span>
                  </div>
                </div>
                <div class="detail-inside">
                  <strong>ໄລຍະຝາກ:</strong>
                  <div class="detail-title">{{history['depositTypeName']}}</div>
                </div>
                <div class="detail-inside">
                  <strong>ອະນຸມັດ:</strong>
                  <div
                    :class="(history['approveStatus'] == 'REJECTED_50')?'REJECTED':history['approveStatus']"
                  >{{(history['approveStatus'] == 'REJECTED_50')?'REJECTED':history['approveStatus']}}</div>
                </div>
                <div class="detail-inside _footer">
                  <span>{{getFormatDate(history['createDate'] + ' ' + history['createTime'])}}</span>
                  <span
                    :class="['fi-' + history['approveStatus']]"
                    @click="getCustomerRequirementDetail(history)"
                    role="button"
                  >ລາຍລະອຽດ</span>
                </div>
              </div>
              <!-- End of detail-box -->
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
        <a
          class="fi-loadmore-link"
          v-else
          href="javascript:event"
          @click="doLoadMoreItem()"
        >Load more&#8228;&#8228;&#8228;</a>
      </div>
    </div>
    <div class="item-container" v-else>
      <h2 class="text-left">
        <strong class="history">History</strong>
        <br class="fi-br" />
        <span
          class="fi-found-item"
        >( {{customer_requirement_history.length}}/{{totalFound}} ລາຍການ )</span>
      </h2>
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
      <div class="content-box">
        <div class="item-header">
          <span class="cus-name">ຊື່ລູກຄ້າ</span>
          <span class="pass">ຜ່ານ</span>
          <span class="amount">ຈຳນວນເງິນຝາກ</span>
          <span class="cur">ສະກຸນເງິນ</span>
          <span class="inter">ດອກເບ້ຍທີ່ຕ້ອງການ</span>
          <span class="dista">ໄລຍະຝາກ</span>
          <span class="appr">ອະນຸມັດ</span>
        </div>
        <template v-for="(history, index) in customer_requirement_history">
          <div
            :class="['item-box', 'BACKGROUND-'+history['approveStatus']]"
            :key="index"
            role="button"
            @click="getCustomerRequirementDetail(history)"
          >
            <div class="cus-name">
              <span>{{history['customerName']}}</span>
            </div>
            <span class="pass">{{history['userStepper']}}</span>
            <span
              class="amount"
            >{{(history['currencyCode'] == 'USD')?history['currencyUnit']:''}}{{history['depositAmount'].toLocaleString().replace(/,/g, '.')}}{{(history['currencyCode'] != 'USD')?history['currencyUnit']:''}}</span>
            <span class="cur">{{history['currencyName']}} ({{history['currencyCode']}})</span>
            <div class="inter">
              {{history['customerInterest']}}%
              <span
                style="color: red;"
                v-if="getExceededOutFlexible(index)"
              >(ຍືດຫຍຸ່ນເກີນ​​ {{getExceededOutFlexible(index)}}%)</span>
              <span
                style="color: #20A816;"
                v-if="getExceededInFlexible(index)"
              >(ຍືດຫຍຸ່ນໃນກອບ {{getExceededInFlexible(index)}}%)</span>
            </div>
            <span class="dista">{{history['depositTypeName']}}</span>
            <div
              :class="['appr',(history['approveStatus'] == 'REJECTED_50')?'REJECTED':history['approveStatus']]"
            >
              <span>{{(history['approveStatus'] == 'REJECTED_50')?'REJECTED':history['approveStatus']}}</span>
              <span>{{getFormatDate(history['createDate'] + ' ' + history['createTime'])}}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="show-more-box" v-if="customer_requirement_history.length < totalFound">
        <span
          class="more"
          role="button"
          @click="showMore"
          v-if="customer_requirement_history.length < totalFound"
        >More</span>
        <span
          class="less"
          role="button"
          @click="getAllApprovedRejectedHistory"
          v-if="customer_requirement_history.length > 20"
        >Less</span>
      </div>
    </div>
  </div>
</template>


<script>
import ds from "@/helper/deepstream.js";
// import address from "@/helper/server_address.js";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/flexible_interest/fonts/phetsarath_font.css";
import { mapState } from "vuex";

export default {
  name: "leader_approve_history",
  data() {
    return {
      ssize: true,
      customer_requirement_history: [],
      totalFound: 0,
      search_data: "",
      checkDataLoadMore: false
    };
  },
  created() {
    this.getAllApprovedRejectedHistory();
  },
  computed: {
    ...mapState("AppData", ["mobileMode"])
  },
  methods: {
    searchTextChange() {
      if (!this.search_data.trim()) {
        this.getAllApprovedRejectedHistory();
      }
    },
    doLoadMoreItem() {
      this.checkDataLoadMore = true;
      if (this.search_data.trim()) {
        this.getAllApprovedRejectedHistorySearchLoadMore();
      } else {
        this.getAllApprovedRejectedHistoryLoadMore();
      }
    },
    doSearch() {
      if (this.search_data.trim()) {
        this.getAllApprovedRejectedHistorySearch();
      }
    },
    getAllApprovedRejectedHistorySearch() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/leader/request/approve/history/search",
        {
          user: this.$store.getters["flexible_interest_module/user"],
          searchData: this.search_data.trim()
        },
        (error, result) => {
          if (error) {
            this.aclasses = [];
          } else {
            this.customer_requirement_history = result["data"];
            this.totalFound = result["found"];
            //this.customer_requirement_history = result;
            //console.log(result)
            //this.normalInterest = [];
            /*for(var i=0; i<this.customer_requirement_history.length; i++){
                    ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_requirement_history[i]['currencyCode'], acClass: this.customer_requirement_history[i]['accountClass']}, ( err, res ) => {
                        
                        if(err){
                                this.normalInterest.push('0');
                        } else{
                            if(res){
                                this.normalInterest.push(res['interest']);
                            } else {
                                this.normalInterest.push('0');
                            }
                        }
                    });
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
    getAllApprovedRejectedHistorySearchLoadMore() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/leader/request/approve/history/search",
        {
          user: this.$store.getters["flexible_interest_module/user"],
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
    getAllApprovedRejectedHistory() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/leader/request/approve/history",
        {
          user: this.$store.getters["flexible_interest_module/user"],
          display: 20
        },
        (error, result) => {
          if (error) {
            this.aclasses = [];
          } else {
            this.customer_requirement_history = result["data"];
            this.totalFound = result["found"];
            //this.customer_requirement_history = result;
            //console.log(result)
            //this.normalInterest = [];
            /*for(var i=0; i<this.customer_requirement_history.length; i++){
                    ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_requirement_history[i]['currencyCode'], acClass: this.customer_requirement_history[i]['accountClass']}, ( err, res ) => {
                        
                        if(err){
                                this.normalInterest.push('0');
                        } else{
                            if(res){
                                this.normalInterest.push(res['interest']);
                            } else {
                                this.normalInterest.push('0');
                            }
                        }
                    });
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
    showMore() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/leader/request/approve/history",
        {
          user: this.$store.getters["flexible_interest_module/user"],
          display: this.customer_requirement_history.length + 20
        },
        (error, result) => {
          if (error) {
            this.aclasses = [];
          } else {
            this.customer_requirement_history = result["data"];
          }
        }
      );
    },
    getAllApprovedRejectedHistoryLoadMore() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/leader/request/approve/history",
        {
          user: this.$store.getters["flexible_interest_module/user"],
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
@import "@/assets/scss/variables.scss";

a.fi-loadmore-link {
  font-size: 22px;
}
img.img-loader-out {
  margin-top: 15px;
  width: 30px;
  margin-bottom: 15px;
}
.PENDING {
  color: #a8890c;
  font-weight: bold;
}
.history {
  color: #e4ca81;
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
.fi-btn {
  background: white;
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
.CANCEL {
  color: #c72b2c;
}
.fi-CANCEL {
  color: rgb(147, 209, 143);
}
.REJECTED,
.fi-REJECTED {
  color: #f34e4e;
}
.APPROVED,
.fi-APPROVED {
  color: #20a816;
}
.SUCCESS,
.fi-SUCCESS {
  color: rgb(33, 145, 33);
}
.REJECTED_50 {
  color: rgb(240, 240, 15);
}
.fi-REJECTED_50 {
  color: rgb(252, 168, 162);
}
.BACKGROUND-REJECTED_50 {
  background: rgb(252, 168, 162);
  color: gray;
}
.BACKGROUND-CANCEL {
  background: rgb(147, 209, 143);
}
.BACKGROUND-APPROVED {
  background-color: #fafafa;
  &:hover {
    background-color: #dcffdc;
  }
}
.BACKGROUND-CARD-APPROVED {
  background-color: #1db925;
}
.BACKGROUND-SUCCESS {
  background: rgb(33, 145, 39);
}
.BACKGROUND-REJECTED {
  background-color: #fafafa;
  &:hover {
    background-color: #ffe0dc;
  }
}
.BACKGROUND-CARD-REJECTED {
  background-color: #f34545;
}
.BACKGROUND-PENDING {
  background: rgb(255, 255, 255);
}

.fi-not-found > span {
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

.detail-box {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;
  .detail-inside {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  ._footer {
    position: relative;
    margin-top: 0.5rem;
  }
}

.fi-card {
  border: 1px lightgrey solid;
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
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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

.item-container {
  position: relative;
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 0.3rem;
  box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  overflow-x: auto;
}

.content-box {
  position: relative;
  width: 100%;
  min-width: 900px;
}

.item-header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-weight: 600;
  width: 100%;
}

.item-box {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #fcfcfc;
  border-top: solid 1px rgb(223, 223, 223);
  &:nth-of-type(2) {
    border-top: none;
  }
}

.cus-name {
  width: 15%;
}
.pass {
  width: 20%;
}
.amount {
  width: 12%;
}
.cur {
  width: 10%;
}
.inter {
  width: 23%;
}
.dista {
  width: 8%;
}

.appr {
  display: flex;
  flex-direction: column;
  width: 15%;
}

.show-more-box {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;
  span {
    margin-left: 10px;
    &.more {
      color: $fi-primary;
      &:hover {
        text-decoration: underline;
      }
    }
    &.less {
      color: $secondary-color;
      &:hover {
        text-decoration: underline;
      }
    }
  }
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