<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12">
        <h2 class="text-left">
          <strong class="PENDING">Pending</strong>
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
        <div :class="['fi-card text-left',  history.express ? 'express' : '']">
          <div class="fi-card-title">
            <h5>
              <span style="font-size: 16px; margin-right: 5px">ຊື່ລູກຄ້າ:</span>
              <strong>{{history['customerName']}}</strong>
            </h5>
            <span>
              <span>ຜ່ານ:</span>
              {{history['userStepper']}}
            </span>
            <span
              class="editIcon"
              v-if="getShowEdit(history['editCount'])"
              @click="openEditDetail(history)"
            >
              <i class="fa fa-pencil-square" aria-hidden="true"></i>
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
                    :class="history['express'] ? 'pedding-express': history['approveStatus']"
                  >{{history['approveStatus']}} {{history['express'] ? '(ດ່ວນ)' : ''}}</div>
                </div>
                <div class="detail-inside _footer">
                  <span>{{getFormatDate(history['createDate'] + ' ' + history['createTime'])}}</span>
                  <span
                    :class="[history['express']?'fi-btn-express':'fi-btn']"
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
  </div>
</template>


<script>
import ds from "@/helper/deepstream.js";
// import address from "@/helper/server_address.js";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/flexible_interest/fonts/phetsarath_font.css";

export default {
  name: "staff_pending",
  data() {
    return {
      customer_requirement_history: [],
      totalFound: 0,
      search_data: "",
      checkDataLoadMore: false
    };
  },
  created() {
    this.getAllPending();
  },
  mounted() {},
  methods: {
    searchTextChange() {
      if (!this.search_data.trim()) {
        this.getAllPending();
      }
    },
    doLoadMoreItem() {
      this.checkDataLoadMore = true;
      if (this.search_data.trim()) {
        this.getAllPendingSearchLoadMore();
      } else {
        this.getAllPendingLoadMore();
      }
    },
    doSearch() {
      if (this.search_data.trim()) {
        this.getAllPendingSearch();
      }
    },
    getAllPendingSearch() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/customer/requirement/by/staff/pending/search",
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
            // console.log(address['serverIp'] )
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
    getAllPendingSearchLoadMore() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/customer/requirement/by/staff/pending/search",
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
    getAllPending() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/customer/requirement/by/staff/pending",
        { staffUser: this.$store.getters["flexible_interest_module/user"] },
        (error, result) => {
          if (result) {
            this.customer_requirement_history = result["data"];
            this.totalFound = result["found"];
            //this.customer_requirement_history = result;
            //this.normalInterest = [];
            // console.log(address['serverIp'] )
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
    getAllPendingLoadMore() {
      ds.rpc.make(
        "/bcel/api/flexible/interest/customer/requirement/by/staff/pending",
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
    getShowEdit(editCount) {
      if (editCount > 0) {
        return true;
      } else {
        return false;
      }
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
    openEditDetail(history) {
      //customer/requirement/edit/
      //console.log(history);
      this.$store.commit("flexible_interest_module/addRequestApproveDetail", {
        info: history
      });
      this.$router.push({
        path:
          this.$store.getters["flexible_interest_module/root"] +
          "/flexible/customer/requirement/edit/" +
          btoa(history["requirementId"])
      });
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
.fi-found-item {
  opacity: 0.6;
  font-size: 14px;
  color: gray;
  padding-top: 0px;
}
.fi-br {
  display: none;
}
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

.pedding-express {
  color: $fi-express;
  font-weight: bold;
}

.editIcon {
  position: absolute;
  cursor: pointer;
  top: 3px;
  right: 6px;
  color: #007bff;
  font-weight: bold;
}
.editIcon:hover {
  color: rgb(5, 5, 206);
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
table {
  padding: 0;
  margin: 0;
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

.fi-btn {
  background: white;
  color: rgb(250, 150, 0);
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

.fi-btn-express {
  background: white;
  color: $fi-express;
  border: 1px white solid;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  &:hover {
    color: #8890d6;
  }
}

.fi-card {
  position: relative;
  border: 0.3px lightgrey solid;
  border-radius: 10px;
  -webkit-box-shadow: -2px 3px 14px -7px rgba(0, 0, 0, 0.52);
  -moz-box-shadow: -2px 3px 14px -7px rgba(0, 0, 0, 0.52);
  box-shadow: -2px 3px 14px -7px rgba(0, 0, 0, 0.52);
  -webkit-transition: box-shadow 0.5s; /* For Safari 3.1 to 6.0 */
  transition: box-shadow 0.5s;
  margin-bottom: 10px;
  background: rgb(250, 150, 0);
}
.express {
  background-color: $fi-express;
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