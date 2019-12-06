<template>
    <div class="container">
        <div v-if="showChooseUser">
            <div class="fi-inverst-edit-background"></div>
            <div class="fi-edit-dialog">
                <div class="fi-edit-header">
                    <h5>ເລືອກຄະນະອະນຸມັດ</h5>
                    <div class="fi-check-all">
                      <label class="fi-checkbox-container" title="ເລືອກທັງໝົດ">
                        <input type="checkbox" v-model="chooseAll" @change="changeCheckAll">
                        <span class="fi-checkbox-mark fi-hover"></span>
                      </label>
                    </div>
                </div>
                <div class="fi-edit-body">
                  <div class="fi-dropdown-panel">
                    <ul id="interest" class="text-left fi-dropdown">
                        <li v-for="(user, index) in recieveUserList" :key="index">
                          <label class="fi-checkbox-container">
                              <span>{{user['fullName']}} <small v-if="user['positionLevel'] == 1"> ({{user['positionId']}})</small></span>
                              <label class="fi-on-off" :class="user['enable']"></label>
                            <input type="checkbox" v-model="selectedUser" :disabled="user['enable'] != 'ON'" :value="user['userId']" @change="addOrRemoveUser">
                            <span class="fi-checkbox-mark" :class="(user['enable'] == 'ON')?'fi-hover':'fi-hover-disable'"></span>
                          </label>
                        </li>
                    </ul>
                  </div>
                  <small class="danger" v-if="errorMessage">* {{errorMessage}}</small>
                </div>
                <div class="fi-edit-footer">
                    <button type="button" class="fi-btn-edit-cancel" @click="cancelSendApproveRequest()">ຍົກເລີກ</button>
                    <button type="button" class="fi-btn-edit-ok" @click="sendApproveRequest()">ຕົກລົງ</button>
                </div>
            </div>
        </div>
        <div class="fi-add-user-content" v-if="checkSaveLoading">
            <div class="fi-inverse-background"></div>
            <div class="fi-processing-container text-center">
                <SpinnerLoader :color="'#3287c4'" />
                <span style="color: #3287c4; margin-top: 1.5rem;">Please wait...</span>
            </div>
        </div>
        <fi_dialog :config="fi_config"/>
        <fi_report_approve_dialog :config="config"/>
        <div class="row hide-on-print-mode">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <!-- <h2 class="text-center " :class="'BACKGROUND-'+customer_info['approveStatus']">ລາຍລະອຽດ</!-->
                 <div class="text-left fi-status">
                        <h3><strong>ສະຖານະອະນຸມັດ: </strong> <strong :class="(customer_info['approveStatus'] == 'REJECTED_50')?'REJECTED':customer_info['approveStatus']">{{(customer_info['approveStatus'] == 'REJECTED_50')?'REJECTED':customer_info['approveStatus']}}</strong></h3>
                        <small v-if="(customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS') || (customer_info['approveStatus'] == 'REJECTED') || (customer_info['approveStatus'] == 'REJECTED_50')" :class="(customer_info['approveStatus'] == 'REJECTED_50')?'REJECTED':customer_info['approveStatus']">ໂດຍ: {{customer_info['approveUserName']}}</small>
                        <small  v-else-if="(customer_info['approveStatus'] == 'CANCEL')" :class="customer_info['approveStatus']">ໂດຍ: {{customer_info['createUserName']}}</small>
                    </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left">
                <div class="fi-card">
                    <small>
                        <strong>ຂັ້ນອະນຸມັດ: </strong>
                    </small>
                    <small> {{customer_info['organizeStepper']}}</small>
                    <small v-if="(customer_info['approveStatus'] == 'APPROVED')"> 
                        &#8594; <span :class="customer_info['approveStatus']"> ອະນຸມັດ &#10003;</span>
                    </small>
                    <small v-else-if="(customer_info['approveStatus'] == 'REJECTED')">
                        &#8594; <span :class="customer_info['approveStatus']"> ປະຕິເສດ &#215;</span>
                    </small>
                    <br>
                    <strong class="fi-topic">ຂໍ້ມູນສ່່ວນຕົວຂອງລູກຄ້າ</strong>
                    <hr>
                    <div>
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-3" v-if="customer_info['photo']">
                                <img class="fi-img-customer" :src="fileIp + customer_info['photo']" alt="">
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 " :class="customer_info['photo']?'col-lg-9':'col-lg-12'">
                                <table style="width: 100%">
                                    <tbody>
                                        <tr>
                                            <th class="fi-title">ຊື່ລູກຄ້າ:</th>
                                            <td>{{customer_info['customerName']?customer_info['customerName']:'................'}} <small> ({{customer_info['customerTypeDesc']}})</small></td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ເບີໂທ:</th>
                                            <td>{{customer_info['customerTel']?customer_info['customerTel']:'................'}}</td>
                                        </tr>
                                        <tr>
                                            <th class="fi-title">ອາຊີບ:</th>
                                            <td>{{customer_info['customerOccupation']?customer_info['customerOccupation']:'................'}}</td>
                                        </tr>
                                        <tr v-if="customer_info['bankAccounts']">
                                            <th class="fi-title">ເລກບັນຊີທະນາຄານ:</th>
                                            <td>
                                                <span v-if="!customer_info['bankAccounts'].length">................</span>
                                                <span v-for="(account, index) in customer_info['bankAccounts']" :key="index">
                                                    - {{account['accountNo']}}{{account['description']?':':''}}
                                                    <small v-if="account['description']"> {{account['description']}}</small>
                                                    <br>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <strong class="fi-title">ຂໍ້ມູນອື່ນໆ: </strong> 
                                    <br/>
                                    <span>&nbsp&nbsp&nbsp&nbsp </span>
                                    <span>{{customer_info['customerDetail']?customer_info['customerDetail']:'............................................................'}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fi-card">
                    <strong class="fi-topic">ຂໍ້ມູນເງິນຝາກຂອງລູກຄ້າ</strong>
                    <hr>
                    <div>
                        <table style="width: 100%">
                            <tbody>
                                <tr>
                                    <th class="fi-title">ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ:</th>
                                    <td>{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{customer_info['depositAmount']?customer_info['depositAmount'].toLocaleString(undefined,{'maximumFractionDigits':3}).replace(/,/g,'.'):0}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}</td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ສະກຸນເງິນ:</th>
                                    <td v-if="customer_info['currencyName']">{{customer_info['currencyName']}} ({{customer_info['currencyCode']}})</td>
                                    <td v-else>................</td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ໄລຍະຝາກ:</th>
                                    <td>{{customer_info['depositTypeName']?customer_info['depositTypeName']:'................'}}</td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ທາງເລືອກດອກເບ້ຍ:</th>
                                    <td>{{customer_info['interestChosen']?customer_info['interestChosen']:'................'}}</td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ອັດຕາດອກເບ້ຍປົກກະຕິ:</th>
                                    <td>{{customer_info['normalInterest']?customer_info['normalInterest']:'0'}}% 
                                    </td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ/ປີ:</th>
                                    <td>{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('normalInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                    </td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ດອກເບ້ຍຍືດຫຍຸ່ນສູງສຸດ:</th>
                                    <td>{{customer_info['interestFlexible']?customer_info['interestFlexible']:'0'}}% 
                                    </td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ອັດຕາດອກເບ້ຍທີ່ລູກຄ້າຕ້ອງການ:</th>
                                    <td>
                                        {{customer_info['customerInterest']?customer_info['customerInterest']:'0'}}% 
                                        <span style="color: red;" v-if="getExceededOutFlexible()"> 
                                            (ຍືດຫຍຸ່ນເກີນ​​ {{getExceededOutFlexible()}}%)
                                            <span v-if="(customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS')">
                                                <strong v-if="(customer_info['approveInterest'] == customer_info['customerInterest'])" class="APPROVED"> &#10003;</strong>
                                            </span>
                                        </span>
                                        <span style="color: #20A816;" v-if="getExceededInFlexible()"> 
                                            (ຍືດຫຍຸ່ນໃນກອບ​ {{getExceededInFlexible()}}%)
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="fi-title">ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ:</th>
                                    <td>{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('customerInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                    </td>
                                </tr>
                                <tr style="background: yellow;" v-if="customer_info['bankInterest']">
                                    <th class="fi-title" v-if="(customer_info['bankInterest'] != customer_info['customerInterest'])">ດອກເບ້ຍທີ່ ທຄຕລ ໃຫ້ໄດ້: </th>
                                    <td v-if="(customer_info['bankInterest'] != customer_info['customerInterest'])">
                                        {{customer_info['bankInterest']}}%
                                        <span style="color: red;" v-if="getExceededOutFlexibleBank() "> 
                                            (ຍືດຫຍຸ່ນເກີນ {{getExceededOutFlexibleBank()}}%)
                                            <span v-if="(customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS') || (customer_info['approveStatus'] == 'CANCEL')">
                                              <strong v-if="(customer_info['approveInterest'] == customer_info['bankInterest'])" class="APPROVED">&#10003;</strong>
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                                <tr style="background: yellow;" v-if="customer_info['bankInterest']">
                                    <th class="fi-title" v-if="(customer_info['bankInterest'] != customer_info['customerInterest'])">ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ:</th>
                                    <td v-if="(customer_info['bankInterest'] != customer_info['customerInterest'])">
                                        {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('bankInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="fi-card">
                    <strong class="fi-topic">ຄຳຄິດເຫັນຂອງພະນັກງານ ແລະ ເອກະສານຕິດຄັດຂອງລູກຄ້າ</strong>
                    <hr>
                    <div>
                        <div class="row">
                            <div class="col-12">
                                <strong class="fi-title">ຄຳຄິດເຫັນຂອງພະນັກງານ: </strong> 
                                <br/>
                                <span>&nbsp&nbsp&nbsp&nbsp </span>
                                <span class="fi-text">{{customer_info['staffNote']?customer_info['staffNote']:'........................................................'}}</span>
                            </div>
                            <div class="col-12">
                                <strong class="fi-title">ເອກະສານປະກອບຂອງລູກຄ້າ: </strong> 
                                <br/>
                                <span>&nbsp&nbsp&nbsp&nbsp </span>
                                <span class="fi-text">{{customer_info['documents']?customer_info['documents']:'........................................................'}}</span>
                                <br/>
                                <strong class="fi-title" v-if="document_files.length">ຟາຍລ໌ເອກະສານ:</strong> 
                                
                                    <div v-for="(file, index) in document_files" :key="index">
                                        {{index + 1}}. <a :href="fileIp + file['docUrl']" target="_blank" rel="noopener noreferrer"> {{file['docName']}}</a>
                                        <!-- <iframe :src="'http://localhost:8081' + file['docUrl']" frameborder="0" class="fi-iframe"></iframe> -->
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fi-card">
                    <strong class="fi-topic fi-expand" @click="showProducts = !showProducts">&#9660; ຜະລິດຕະພັນທີ່ລູກຄ້າໃຊ້ບໍລິການຢູ່ ທຄຕລ</strong>
                    <hr>
                    <div  :class="hideAndShow(showProducts)" v-if="showProducts">
                        <div class="fi-account" v-for="(product, index) in products" :key="index">
                            <div class="fi-account-detail text-left">
                                <!-- <label style="width: 10px; height: 10px; border-radius: 50%; background: gray; margin-bottom: 2px;"></label> -->
                                <h4 class="fi-account-title">
                                <label style="width: 10px; height: 10px; border-radius: 50%; background: gray; margin-bottom: 2px;"></label> 
                                ເລກບັນຊີ: <strong>{{product['accountNo']}}</strong>
                                </h4>
                                <small v-if="product['description']">&nbsp&nbsp&nbsp&nbsp {{product['description']}}</small>
                                <div v-if="product['coreAccs']">
                                    <span v-if="product['coreAccs']['loanAcc']">ບັນຊີເງິນກູ້: <strong> {{product['coreAccs']['loanAcc']}}, </strong> &nbsp&nbsp&nbsp&nbsp</span>
                                    <span>ບັນຊີເງິນຝາກປະຢັດ: <strong> {{product['coreAccs']['savingAcc']}}, </strong> &nbsp&nbsp&nbsp&nbsp</span>
                                    
                                    <span v-if="product['coreAccs']['tdAcc']">ບັນຊີເງິນຝາກປະຈຳ: <strong> {{product['coreAccs']['tdAcc']}}, </strong> &nbsp&nbsp&nbsp&nbsp</span>
                                    <span v-if="product['coreAccs']['currentAcc']">ບັນຊີເງິນຝາກກະແສລາຍວັນ: <strong> {{product['coreAccs']['currentAcc']}}, </strong> &nbsp&nbsp&nbsp&nbsp</span>
                                    <span v-if="product['coreAccs']['nostroAcc']">Nostro: <strong> {{product['coreAccs']['nostroAcc']}}, </strong></span>
                                </div>
                            </div>
                            <div class="products" v-if="!showLoading" :class="'product'+(index+1)">
                                <div class="text-left" v-html="products[index]['list_html']"> </div>
                                <hr>
                            </div>
                            <div v-if="showLoading">
                                <div class="fi-loading text-center">
                                    <img class="img-loader-out" src="@/assets/flexible_interest/images/loader.gif" alt="Loader">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-left">
                    <small> ໂດຍ: {{customer_info['createUserName']}} {{customer_info['createUserDivision']}} {{customer_info['createUserDepartment']}} {{customer_info['createUserBranch']}}</small>
                     <small> ({{getFormatDate(customer_info['createDate'] + ' ' + customer_info['createTime'])}})</small>
                     
                </div>
                
                    
            </div> 
            <div class="col-3 col-sm-3 col-md-6 col-lg-6 col-xl-6 text-left">
                <button class="fi-btn-next" type="button" @click="backRouter()">&#8592;</button>
            </div>
            <div class="col-9 col-sm-9 col-md-6 col-lg-6 col-xl-6 text-right">
                    <button class="fi-btn-next" type="button" @click="openReportApproveDialog()">ການອະນຸມັດ</button>
            </div>
        </div>
    </div>
</template>

<script>
import ds from '@/helper/ds.js'
import address from '@/helper/server_address.js'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/flexible_interest/fonts/phetsarath_font.css'
import fi_dialog from '@/components/flexible-interest/fi_dialog.vue'
import fi_report_approve_dialog from '@/components/flexible-interest/fi_report_approve_dialog.vue'

import { SpinnerLoader } from "vue-spinners-css";

export default {
  name: 'document_attach',
  components: {
    SpinnerLoader,
    fi_dialog,
    fi_report_approve_dialog
  },
  data(){
      return {
        showChooseUser: false,
        checkSaveLoading: false,
        chooseAll: false,
        selectedUser: [],
        fileIp: address['fileIp'],
        errorMessage: '',
        recieveUserList: [],
        fileIp: address['fileIp'],
        showLoading: true,
        showProducts: false,
        customer_info: this.$store.getters['flexible_interest_module/customer_detail'],
        document_files: [],
        products: this.$store.getters['flexible_interest_module/customer_detail']['bankAccounts'],
        config: {
            show: false,
            sendEditEvt: () => {
                this.config['show'] = false;
            },
            sendRequestEvt: () => {
                this.config['show'] = false;
            },
            sendApproveEvt: () => {
                this.config['show'] = false;
            },
            rejectEvt: () => {
                this.config['show'] = false;
            }
        },
        fi_config: {
            show: false,
            title: 'Confirm',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'Cancel',
                    action: () => {
                        //console.log("Cancel")
                        this.fi_config['show'] = false;
                    }
                },
                {
                    text: 'OK',
                    action: () => {
                        //console.log('OK');
                        this.fi_config['show'] = false;
                    }
                }
            ]
        }
      }
  },
  watch: {
    '$route'(to, from) {
        ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/by/id', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
            if(result)
            {
                this.customer_info = result;
                /*ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_info['currencyCode'], acClass: this.customer_info['accountClass']}, ( err, res ) => {
                    if(error){
                        this.customer_info['normalInterest'] = '0';
                    } else{
                        if(result){
                            this.customer_info['normalInterest'] = res['interest'];
                        } else {
                            this.customer_info['normalInterest'] = '0';
                        }
                    }
                });
                */
            //console.log(this.customer_info)
                this.getProducts();
                axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_info['accountClass']+'/'+this.customer_info['currencyCode']+'/'+this.customer_info['requirementId'])
                    .then((res) => {
                        this.customer_info['normalInterest'] = res['data']['data']['interest'];
                        this.$forceUpdate();
                    })
                    .catch((error) =>  {
                        this.customer_info['normalInterest'] = '0';
                    })
                this.$forceUpdate();
            } else {
                this.backRouter();
            }
        });
    }
  },
  created() {
  },
  mounted(){
    this.getSendToUserList();
    this.getCustomerDetail();
    ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/document/attach', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
        if(result){
            this.document_files = result;
        }
    });
  },
  destroyed(){
      this.$store.commit('flexible_interest_module/addRequestApproveDetail', { info: {} });
      window.sessionStorage.removeItem('history');
  },
  methods: {
    getCustomerDetail() {
        if(!this.customer_info['requirementId']){
            ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/by/id', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
                if(result)
                {
                    this.customer_info = result;
                    /*ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_info['currencyCode'], acClass: this.customer_info['accountClass']}, ( err, res ) => {
                        if(error){
                            this.customer_info['normalInterest'] = '0';
                        } else{
                            if(result){
                                this.customer_info['normalInterest'] = res['interest'];
                            } else {
                                this.customer_info['normalInterest'] = '0';
                            }
                        }
                    });
                    */
                //console.log(this.customer_info)
                    this.getProducts();
                    axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_info['accountClass']+'/'+this.customer_info['currencyCode']+'/'+this.customer_info['requirementId'])
                        .then((res) => {
                            this.customer_info['normalInterest'] = res['data']['data']['interest'];
                            this.$forceUpdate();
                        })
                        .catch((error) =>  {
                            this.customer_info['normalInterest'] = '0';
                        })
                    this.$forceUpdate();
                } else {
                    this.backRouter();
                }
            });
        } else {
            this.getProducts();
        }
    },
    getSendToUserList(){
        ds.rpc.make('/bcel/api/flexible/interest/recieve/users', { userId: this.$store.getters['flexible_interest_module/user']}, ( error, result ) => {
            if(result)
            {
                this.recieveUserList = result;
                this.$forceUpdate();
            }
        });
    },
    cancelSendApproveRequest(){
        this.selectedUser = [];
        this.errorMessage = '';
        this.chooseAll = false;
        this.showChooseUser = false;
        this.openReportApproveDialog();
    },
    addOrRemoveUser(){
      if(this.recieveUserList.length > 0){
        this.errorMessage = ''
      } else {
        this.errorMessage = 'ເລືອກຄະນະອະນຸມັດຢ່າງໜ້ອຍ 1 ທ່ານ'
      }
      if(this.selectedUser.length == this.recieveUserList.length) {
        this.chooseAll = true;
      } else {
        this.chooseAll = false;
      }
    },
    changeCheckAll(){
      if(this.chooseAll){
        this.selectedUser = [];
        for(var i=0; i<this.recieveUserList.length; i++){
          this.selectedUser.push(this.recieveUserList[i]['userId'])
        }
        this.errorMessage = ''
      } else {
        this.errorMessage = 'ເລືອກຄະນະອະນຸມັດຢ່າງໜ້ອຍ 1 ທ່ານ'
        this.selectedUser = [];
      }
    },
    sendApproveRequest(){
        if(this.selectedUser.length > 0) {
            this.showChooseUser = false;
            this.fi_config = {
                show: true,
                title: 'ຢືນຢັນ',
                message: 'ຂໍອະນຸມັດລາຍການຕໍ່ແທ້ບໍ?',
                buttons: [
                    {
                        text: 'ຍົກເລີກ',
                        action: () => {
                            //console.log("Cancel")
                            this.fi_config['show'] = false;
                        }
                    },
                    {
                        text: 'ຕົກລົງ',
                        action: () => {
                            this.fi_config['show'] = false;
                            var comment = this.$store.getters['flexible_interest_module/commentRequest'];
                            var _status = this.$store.getters['flexible_interest_module/commentRequestStatus'];
                            var bankInterest = this.$store.getters['flexible_interest_module/bankInterest'];

                            this.$store.commit('flexible_interest_module/changeCommentRequest', { comment: "" });
                            this.$store.commit('flexible_interest_module/changeCommentRequestStatus', { status: "" });
                            this.$store.commit('flexible_interest_module/changeBankInterest', { interest: "" });
                            //console.log(bankInterest)
                            this.checkSaveLoading = true;
                            ds.rpc.make('/bcel/chat/api/flexible/send/approve/manually', {
                                user: this.$store.getters['flexible_interest_module/user'], 
                                requirementId:  this.customer_info['requirementId'], 
                                comment: comment, 
                                status: _status,
                                bankInterest: bankInterest,
                                recieve_users: this.selectedUser
                                }, ( error, result ) => {
                                this.checkSaveLoading = false;
                                if(error){
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: "Server error while processing",
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                } else {
                                    this.fi_config = {
                                        show: true,
                                        title: 'Message',
                                        message: result['message'],
                                        buttons: [
                                            {
                                                text: 'ຕົກລົງ',
                                                action: () => {
                                                    this.fi_config['show'] = false;
                                                }
                                            }
                                        ]
                                    }
                                    this.$root.$emit("reloadAllApprove");
                                }
                            });
                        }
                    }
                ]
            }
        } else {
          this.errorMessage = 'ເລືອກຄະນະອະນຸມັດຢ່າງໜ້ອຍ 1 ທ່ານ'
        }
    },
    hideAndShow(check){
        if(check) {
            return 'show-products'
        } else {
            return 'hide-products'
        }
    },
    getProducts() {
        if(this.customer_info['bankAccounts'].length > 0) {
            axios.post(address['serverIp'] +'/bcel/api/flexible/interest/products/history/html',
                this.customer_info['bankAccounts']
            )
            .then((res) => {
                var products = res['data']['data'];
                for(var j = 0; j < products.length; j++){
                    var result = products[j]['list_html'];
                    products[j]['list_html'] = result
                        .replace(/img\//g,'/chat/img/')
                        .replace(/<\/h2>/g,'</h2>\n')
                        .replace(/body \{/g,'.kjdkfjd {')
                        .replace(/label/g,'.mndmf')
                        .replace(/<link.*\/>/g, "")
                        .replace(/<script.*<\/script>/g, "");
                    var productArr = products[j]['list_html'].match(/<div class='product.*<\/h2>/g);
                    var productUsage = '';
                    for(var k=0; k < productArr.length; k++){
                        if(productArr[k].search("disabled")<0) {
                            var product = productArr[k].split('h2')[1].slice(1, productArr[k].split('h2')[1].length - 2) +', ';
                            productUsage += product;
                        }
                    }
                    products[j]['list'] = productUsage.trim().slice(0, productUsage.length - 2);
                    try{
                        products[j]['coreAccs'] = JSON.parse(products[j]['coreAccs']);
                    } catch(e){
                        //console.log(e)
                    }
                }
                this.customer_info['bankAccounts'] = products;
                this.products = this.customer_info['bankAccounts'];
                this.showLoading = false;
                this.$forceUpdate();
            })
            .catch((error) => {
                this.showLoading = false;
            });
        } else {
            this.showLoading = false;
        }
    },
    getFormatDate(date){
        var d = new Date(date);
        var day = d.getDate();
        var month = d.getMonth() +1;
        var year = d.getFullYear();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();

        return `${(day < 10)? '0'+day: day}/${(month < 10)? '0'+month: month}/${year} ${(hour < 10)? '0'+hour: hour}:${(minute < 10)? '0'+minute: minute}:${(second < 10)? '0'+second: second}`;
    },
      getEarningPerYear(key){
          if(this.customer_info['depositAmount'] && this.customer_info['currencyCode'] && this.customer_info['depositType']){
            var interest = this.customer_info['depositAmount'] * (this.customer_info[key] / 100) * (this.customer_info['depositTotalDays'] / 360);
            return interest.toLocaleString(undefined,{'minimumFractionDigits':1,'maximumFractionDigits':3})
          } else {
            return 0;
          }
      },
      backRouter() {
          this.$router.back();
      },
      openReportApproveDialog(){
        this.config = {
            show: true,
            sendEditEvt: () => {
                this.config['show'] = false;
                this.fi_config = {
                    show: true,
                    title: 'ຢືນຢັນ',
                    message: 'ແນະນຳໃຫ້ພະນັກງານແກ້ໄຂລາຍການຄືນແທ້ບໍ?',
                    buttons: [
                        {
                            text: 'ຍົກເລີກ',
                            action: () => {
                                //console.log("Cancel")
                                this.fi_config['show'] = false;
                            }
                        },
                        {
                            text: 'ຕົກລົງ',
                            action: () => {
                                this.fi_config['show'] = false;
                                var comment = this.$store.getters['flexible_interest_module/commentEdit'];
                                this.$store.commit('flexible_interest_module/changeCommentEdit', { comment: "" });
                                this.checkSaveLoading = true;
                                ds.rpc.make('/bcel/chat/api/flexible/interest/create/response/edit/notification', {user: this.$store.getters['flexible_interest_module/user'], requirementId:  this.customer_info['requirementId'], comment: comment}, ( error, result ) => {
                                    this.checkSaveLoading = false;
                                    console.log(error, result)
                                    if(error){
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: "Server error while processing",
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                    } else{
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: result['message'],
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                        this.$root.$emit("reloadAllApprove");
                                    }
                                });
                            }
                        }
                    ]
                }
            },
            sendRequestEvt: () => {
                this.getSendToUserList();
                this.config['show'] = false;
                this.showChooseUser = true;
            },
            sendApproveEvt: () => {
                this.config['show'] = false;
                this.fi_config = {
                    show: true,
                    title: 'ຢືນຢັນ',
                    message: 'ອະນຸມັດດອກເບ້ຍໃຫ້ລູກຄ້າແທ້ບໍ?',
                    buttons: [
                        {
                            text: 'ຍົກເລີກ',
                            action: () => {
                                //console.log("Cancel")
                                this.fi_config['show'] = false;
                            }
                        },
                        {
                            text: 'ຕົກລົງ',
                            action: () => {
                                this.fi_config['show'] = false;
                                var comment = this.$store.getters['flexible_interest_module/commentApprove'];
                                var approve_interest = this.$store.getters['flexible_interest_module/bankInterest'];
                                //console.log(approve_interest)
                                this.$store.commit('flexible_interest_module/changeCommentApprove', { comment: "" });
                                this.$store.commit('flexible_interest_module/changeBankInterest', { interest: "" });
                                this.checkSaveLoading = true;
                                ds.rpc.make('/bcel/chat/api/flexible/interest/approve/customer/requirement', {
                                    user: this.$store.getters['flexible_interest_module/user'], 
                                    requirementId:  this.customer_info['requirementId'], 
                                    comment: comment,
                                    approveInterest: approve_interest?approve_interest:0
                                }, ( error, result ) => {
                                    this.checkSaveLoading = false;
                                    if(error){
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: "Server error while processing",
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                    } else {
                                        if(result['success']) {
                                            this.customer_info['approveStatus'] = 'APPROVED';
                                        }
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: result['message'],
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                        this.$root.$emit("reloadAllApprove");
                                    }
                                });
                            }
                        }
                    ]
                }
            },
            rejectEvt: () => {
                this.config['show'] = false;
                this.fi_config = {
                    show: true,
                    title: 'ຢືນຢັນ',
                    message: 'ປະຕິເສດດອກເບ້ຍຂອງລູກຄ້າແທ້ບໍ?',
                    buttons: [
                        {
                            text: 'ຍົກເລີກ',
                            action: () => {
                                //console.log("Cancel")
                                this.fi_config['show'] = false;
                            }
                        },
                        {
                            text: 'ຕົກລົງ',
                            action: () => {
                                this.fi_config['show'] = false;
                                var comment = this.$store.getters['flexible_interest_module/commentApprove'];
                                this.$store.commit('flexible_interest_module/changeCommentApprove', { comment: "" });
                                var approve_interest = this.$store.getters['flexible_interest_module/bankInterest'];
                                //console.log(approve_interest)
                                this.$store.commit('flexible_interest_module/changeBankInterest', { interest: "" });
                                this.checkSaveLoading = true;
                                ds.rpc.make('/bcel/chat/api/flexible/interest/reject/customer/requirement', {
                                    user: this.$store.getters['flexible_interest_module/user'],
                                    requirementId:  this.customer_info['requirementId'], 
                                    comment: comment,
                                    approveInterest: approve_interest?approve_interest:0
                                }, ( error, result ) => {
                                    console.log(error, result)
                                    this.checkSaveLoading = false;
                                    if(error){
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: "Server error while processing",
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                    } else {
                                        if(result['success']) {
                                            if((approve_interest?approve_interest:0) > 0) {
                                                this.customer_info['approveStatus'] = 'REJECTED_50';
                                            } else {
                                                this.customer_info['approveStatus'] = 'REJECTED';
                                            }
                                        }
                                        this.fi_config = {
                                            show: true,
                                            title: 'Message',
                                            message: result['message'],
                                            buttons: [
                                                {
                                                    text: 'ຕົກລົງ',
                                                    action: () => {
                                                        this.fi_config['show'] = false;
                                                    }
                                                }
                                            ]
                                        }
                                        this.$root.$emit("reloadAllApprove");
                                    }
                                });
                            }
                        }
                    ]
                }
            }
        }
      },
    getExceededOutFlexible() {
          try{
              var customer_interest = parseFloat(this.customer_info['customerInterest']);
            var max_interest = parseFloat(this.customer_info['normalInterest']) + parseFloat(this.customer_info['interestFlexible']);
            if((customer_interest > max_interest) && (this.customer_info['normalInterest'] > 0) && (this.customer_info['interestFlexible'] > 0)){
                return (customer_interest - max_interest).toLocaleString();
            } else {
                return 0
            }
          } catch(e) {
              return 0;
          }
    },
    getExceededOutFlexibleBank() {
        try{
              var bank_interest = parseFloat(this.customer_info['bankInterest']);
            var max_interest = parseFloat(this.customer_info['normalInterest']) + parseFloat(this.customer_info['interestFlexible']);
            if((bank_interest > max_interest) && (this.customer_info['normalInterest'] > 0) && (this.customer_info['interestFlexible'] > 0)){
                return (bank_interest - max_interest).toLocaleString();
            } else {
                return 0
            }
          } catch(e) {
              return 0;
          }
    },
    getExceededInFlexible() {
          try{
            var customer_interest = parseFloat(this.customer_info['customerInterest']);
            var normal_interest = parseFloat(this.customer_info['normalInterest']);
            var max_interest = normal_interest + parseFloat(this.customer_info['interestFlexible']);
            if((customer_interest <= max_interest) && (customer_interest > normal_interest) && (this.customer_info['normalInterest'] > 0) && (this.customer_info['interestFlexible'] > 0)){
                return (customer_interest - normal_interest).toLocaleString();
            } else {
                return 0
            }
          } catch(e) {
              return 0;
          }
    },
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.fi-status{
    padding: 0;
    @media screen and (min-width: 760px) {
        padding: .5rem 1rem;
    }
}
.fi-inverse-background {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(250, 250, 250, 0.8);
  z-index: 100;
}
.fi-processing-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0px;
  right: 0px;
  top: 50%;
  margin-top: -50px;
  z-index: 100;
}
img.img-loader-out {
  width: 50px;
  margin-bottom: 15px;
}
strong, th, td {
    color: rgb(88, 88, 88);
}
.fi-account-title {
  padding: 0px;
  margin: 0px;
}
.fi-expand {
    cursor: pointer;
}
.fi-expand:hover {
    color: rgb(189, 192, 194);
}
.PENDING{
    color: rgb(250, 150, 0);
    font-weight: bold;
    font-family: Helvetica;
    /*text-shadow: 0 1px 0 white, 0 2px 0 white, 0 3px 0 rgb(250, 150, 0), 0 4px 0 rgb(250, 150, 0);*/
}
.REJECTED{
    color: red;
}
.APPROVED{
    color: rgb(9, 192, 9);
}
.SUCCESS {
    color: rgb(33, 145, 33);
}
.CANCEL {
    color: $fi-primary;
}
.REJECTED_50 {
    color: rgb(240, 240, 15);
}
.BACKGROUND-REJECTED_50 {
    background: rgb(252, 168, 162);
    color: white;
    padding-top: 20px;
    padding-bottom: 20px;
}
.BACKGROUND-CANCEL{
    background: rgb(147, 209, 143);
    color: white;
    padding-top: 20px;
    padding-bottom: 20px;
}
.BACKGROUND-APPROVED {
    background: #20A816;
    color: white;
    padding-top: 20px;
    padding-bottom: 20px;
}
.BACKGROUND-SUCCESS {
    background: rgb(33, 145, 33);
    color: white;
    padding-top: 20px;
    padding-bottom: 20px;
}
.BACKGROUND-REJECTED {
    background: #F34E4E;
    color: white;
    padding-top: 20px;
    padding-bottom: 20px;
}
.BACKGROUND-PENDING {
    background: rgb(250, 150, 0);
    color: white;
    padding-top: 20px;
    padding-bottom: 20px;
}
.fi-iframe{
    width: 100%;
    height: 500px;
}
img{
    width: 100%;
    padding-top: 5px;
}
.fi-topic {
    font-size: 25px;
}
th.fi-title {
    width: 230px;
   // min-width: 50px;
}
.fi-title {
    font-size: 18px;
    padding-right: 10px;
}
.fi-btn-next{
    margin-top: 5px;
    margin-bottom: 10px;
    background: $fi-primary;
    color: white;
    border: 1px $fi-primary solid;
    border-radius: 3px;
    width: 8rem;
    font-size: 1.2rem;
}
.show-products {
    display: block;
}
.hide-products {
    display: none;
}
.fi-btn-next:hover{
    background: $fi-hover;
}
.fi-btn-cancel {
    background: white; 
    border: 1px $fi-primary solid;
    border-radius: 3px;
    width: 8rem;
    font-size: 1.2rem;
    color: $fi-primary; 
}
.fi-btn-cancel:hover{
    color: $fi-hover;
    border: 2px $fi-hover solid;
}


/*Choose approve user*/
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
    -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px $fi-primary;
        -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px $fi-primary;
            box-shadow: 0.5px 0.5px 0.5px 0.5px $fi-primary;
    padding: 5px;
    width: 300px;
    min-height: 120px;
}
.fi-edit-header, .fi-edit-body {
    text-align: left;
}
.fi-edit-footer{
    text-align: right;
}
.fi-btn-edit-ok{
    margin-left: 5px;
    background: #20A816;
    color: white;
    border: none;
    border-radius: 3px;
    width: 5rem;
    font-size: 1rem;
}
.fi-btn-edit-cancel{
    margin-left: 5px;
    background: rgb(250, 127, 123);
    color: white;
    border: none;
    border-radius: 3px;
    width: 5rem;
    font-size: 1rem;
}

div.fi-dropdown-panel{
    position: relative;
    background: transparent;
    border: none;
}
ul.fi-dropdown{
    border: 0.3px rgb(126, 188, 250) solid;
    color: rgb(46, 46, 46);
    height: 120px;
    overflow-y: auto;
    overflow-x: auto;
    padding: 0px;
}
ul.fi-dropdown>li{
    padding-left: 5px;
    padding-right: 5px;
}
ul.fi-dropdown>li:hover, ul.fi-dropdown>li:active{
    background: rgb(248, 184, 184);
    cursor: context-menu;
}
.fi-dropdown-active{
    background: rgb(248, 184, 184);
}
.fi-on-off{
    position:absolute;
    width: 10px; 
    height: 10px; 
    border-radius: 50%;  
    top: 8px; 
    right: 2px;
}
.ON{
    background: green;
}
.OFF{
    background: #b9703c;
}
.danger{
    margin-top: -20px;
    font-size: 12px;
    color: red;
}
/*Choose approve user*/

/* Checkbox */
.fi-check-all{
  position: absolute;
  top: 5px;
  right: 5px;
}
.fi-checkbox-container {
  display: block;
  position: relative;
  width: 100%;
  padding-left: 30px;
  margin-top: 1px;
  margin-bottom: 1px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.fi-checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.fi-checkbox-mark {
  position: absolute;
  top: 1px;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

.fi-checkbox-container:hover input ~ .fi-hover {
  background-color: rgb(245, 97, 97);
}

.fi-checkbox-container:hover input ~ .fi-hover-disable {
  background-color: rgb(201, 201, 201);
}

.fi-checkbox-container input:checked ~ .fi-hover {
  background-color: $fi-primary;
}

.fi-checkbox-mark:after {
  content: "";
  position: absolute;
  display: none;
}

.fi-checkbox-container input:checked ~ .fi-hover:after {
  display: block;
}

.fi-checkbox-container .fi-hover:after {
  left: 10px;
  top: 5px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
/* Checkbox */

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
::-webkit-scrollbar-thumb {
  background: #888; 
}
::-webkit-scrollbar-thumb:hover {
  background: $fi-hover; 
}

.fi-card{
    padding: 1rem;
    margin: .5rem 0;
    border-radius: .5rem;
    border: 1px #e7e6e6 solid;
    box-shadow: -2px 3px 14px -7px rgba(0,0,0,0.3);
    transition: box-shadow 0.5s;
    background: white;
}
// .fi-card:hover{
//     border: 1px lightgrey solid;
//     -webkit-box-shadow: 0.5px 0.5px 0.5px 1px lightgrey;
// 	   -moz-box-shadow: 0.5px 0.5px 0.5px 1px lightgrey;
// 	        box-shadow: 0.5px 0.5px 0.5px 1px lightgrey;
//     padding: 1rem;

// }
.fi-box {
  border: 1px lightgrey solid;
  -webkit-box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
    -moz-box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
        box-shadow: 0.1px 0.1px 0.1px 0.1px rgb(173, 173, 173);
  padding: 0px 5px 0px 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  background: rgb(240, 239, 239);
  border-radius: 4px;
}
.product-name{
  color: rgb(173, 173, 173);
}
.interest-title{
    font-size: 3rem;
}
input[type="file"]{
    font-size: 12px;
    color: $fi-primary;
}

@media only screen and (max-width: 767px) {
    h2{ 
        font-size: 23px;
    }
  .fi-topic{
      font-size: 20px;
  }
}
@media only screen and (max-width: 500px) {
    .fi-btn-next, .fi-btn-cancel{
        font-size: 16px;
        width: 6rem;
    }
}

@media print {
  .hide-on-print-mode {
    display: none;
  }
}

</style>