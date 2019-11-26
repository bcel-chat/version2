<template>
  <div>
    <div v-if="config['show']">
      <div class="show-on-print-mode" id="divPrint">
        <img class="img-header" src="@/assets/flexible_interest/images/bcel_header.png" alt="header">
        <h2 class="text-center"><strong>ອະນຸມັດດອກເບ້ຍຍືດຫຍຸ່ນ</strong></h2>
        <div class="table-responsive">          
          <table class="table tb-big">
              <thead class="text-center">
                  <tr>
                      <th >ຊື່ລູກຄ້າ</th>
                      <th >ຂໍ້ມູນສ່ວນຕົວ</th>
                      <th >ປະຫວັດການໃຊ້ບໍລິການຢູ່ ທຄຕລ</th>
                      <th >ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ</th>
                      <th >ສະກຸນເງິນ</th>
                      <th >ໄລຍະຝາກ</th>
                      <th >ທາງເລືອກດອກເບ້ຍ</th>
                      <th >% ແລະ ດອກເບ້ຍປົກກະຕິ</th>
                      <th >% ດອກເບ້ຍຍືດຫຍຸ່ນສູງສຸດ</th>
                      <th >% ແລະ ດອກເບ້ຍທີ່ຕ້ອງການ</th>
                  </tr>
              </thead>
              <tbody class="text-left">
                  <tr>
                      <td>{{customer_info['customerName']}}</td>
                      <td class="fi-text-more">ເບີໂທ: {{customer_info['customerTel']}} <br/>ອາຊີບ: {{customer_info['customerOccupation']}} <br/>ຂໍ້ມູນອື່ນໆ: {{customer_info['customerDetail']}}</td>
                      <td class="fi-text-more">
                        <span v-for="(account, index) in products" :key="index">
                          - ເລກບັນຊີ {{account['accountNo']}} {{account['list']?'ໃຊ້ຜະລິດຕະພັນ ' + account['list']:' ບໍ່ໃຊ້ຜະລິດຕະພັນໃດ'}}.
                          <br style="margin: 1px; padding: 1px;">
                          <div v-if="account['coreAccs']">
                              <span v-if="account['coreAccs']['loanAcc']">ບັນຊີເງິນກູ້: <strong> {{account['coreAccs']['loanAcc']}}, </strong></span>
                              <span v-if="account['coreAccs']['savingAcc']">ບັນຊີເງິນຝາກປະຢັດ: <strong> {{account['coreAccs']['savingAcc']}}, </strong></span>
                              <span v-if="account['coreAccs']['tdAcc']">ບັນຊີເງິນຝາກປະຈຳ: <strong> {{account['coreAccs']['tdAcc']}}, </strong></span>
                              <span v-if="account['coreAccs']['currentAcc']">ບັນຊີເງິນຝາກກະແສລາຍວັນ: <strong> {{account['coreAccs']['currentAcc']}}, </strong></span>
                              <span v-if="account['coreAccs']['nostroAcc']">Nostro: <strong> {{account['coreAccs']['nostroAcc']}} </strong></span>
                          </div>
                        </span>
                      </td>
                      <td>{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{customer_info['depositAmount']?customer_info['depositAmount'].toLocaleString(undefined,{'maximumFractionDigits':3}).replace(/,/g,'.'):0}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}</td>
                      <td>{{customer_info['currencyName']}} ({{customer_info['currencyCode']}})</td>
                      <td>{{customer_info['depositTypeName']}}</td>
                      <td>{{customer_info['interestChosen']}}</td>
                      <td>
                        {{customer_info['normalInterest']}}% 
                        <hr>
                        {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('normalInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                      </td>
                      <td>{{customer_info['interestFlexible']}}% </td>
                      <td>
                        <span :class="getExceededInFlexible()?'APPROVED':getExceededOutFlexible()?'REJECTED':''">{{customer_info['customerInterest']}}%</span>  
                        <span v-if="(customer_info['approveStatus'] == 'REJECTED_50') || (customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS') || (customer_info['approveStatus'] == 'CANCEL')">
                          <strong v-if="(customer_info['approveInterest'] == customer_info['customerInterest'])" class="APPROVED"> &#10003;</strong>
                        </span>
                        <hr>
                        {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('customerInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                      </td>
                  </tr>
                    <tr v-if="customer_info['bankInterest']">
                        <td class="fi-tr-status text-center" colspan="10" v-if="(customer_info['bankInterest'] != customer_info['customerInterest'])">
                            <h6>
                              <span class="fi-bank-interest">ດອກເບ້ຍທີ່ ທຄຕລ ໃຫ້ໄດ້ (ພະແນກບໍລິຫານທຶນ): </span>
                              <span class="fi-bank-interest">{{customer_info['bankInterest']}}% = </span>
                              <span class="fi-bank-interest">
                                {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('bankInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                              </span>
                              <span v-if="(customer_info['approveStatus'] == 'REJECTED_50') || (customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS') || (customer_info['approveStatus'] == 'CANCEL')">
                                <strong v-if="(customer_info['approveInterest'] == customer_info['bankInterest'])" class="APPROVED"> &#10003;</strong>
                              </span>
                            </h6>
                        </td>
                    </tr>
                  <tr>
                      <td class="fi-tr-status text-center" colspan="10">
                          <!-- <strong>ຕາຕະລາງປຽບທຽບສ່ວນຕ່າງລະຫວ່າງລາຍຈ່າຍດອກເບ້ຍ ແລະ ລາຍຮັບດອກເບ້ຍເງິນກູ້</strong> -->
                          <h4><strong>ສະຖານະອະນຸມັດ: </strong> <strong :class="(customer_info['approveStatus'] == 'REJECTED_50')?'REJECTED':customer_info['approveStatus']">{{(customer_info['approveStatus'] == 'REJECTED_50')?'REJECTED':customer_info['approveStatus']}}</strong></h4>
                      </td>
                  </tr>
                  <tr>
                      <td colspan="6">
                          <h5 class="text-center"><strong>ທັດສະນະ ແລະ ຄຳເຫັນ</strong></h5>
                          <div class="text-left" v-for="(staff, index) in requestUsers" :key="index">
                              <div v-if="notEditShow(staff['type'])">
                                {{sequenceMax - staff['seq']}}. <strong :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''"> {{staff['position']}} {{staff['divisionName']?staff['divisionName']: staff['departmentName']?((staff['departmentId'] != '07')?staff['departmentName']:''): staff['branchName']}}</strong>
                                <p :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''"> 
                                  <span v-if="(staff['status'] == 'yes')" :class="staff['status']">&#10003; ເຫັນດີ</span>
                                  <span  v-else-if="(staff['status'] == 'no')" :class="staff['status']">&#215; ບໍ່ເຫັນດີ</span>
                                  <small style="opacity: 0.6" :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''"> {{staff['date']}} {{staff['time']}}</small>
                                  <!-- <br v-if="(staff['status'] != 'em')"/> -->
                                  <br>
                                  &nbsp &nbsp {{staff['comments']}}
                                </p>
                              </div>
                          </div>
                      </td>
                      <td class="text-left" colspan="4">
                          <h5 class="text-center"><strong>ຊື່ພະນັກງານ ແລະ ຜູ້ອະນຸມັດແຕ່ລະຂັ້ນ</strong></h5>
                          <div v-for="(staff, index) in requestUsers" :key="index">
                            <div v-if="notEditShow(staff['type'])">
                              {{sequenceMax - staff['seq']}}. <strong :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">{{staff['position']}} {{staff['divisionName']?staff['divisionName']: staff['departmentName']?((staff['departmentId'] != '07')?staff['departmentName']:''): staff['branchName']}}</strong>
                              <p>&nbsp &nbsp <span :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">{{staff['requestUserName']}}</span></p>
                            </div>
                          </div>
                          <div class="text-right">
                            <label class="text-center">
                              <strong>ລູກຄ້າ</strong>
                              <br>
                              <span>{{customer_info['customerName']}}</span>
                              <br>
                              <img v-if="customer_info['signature']" :src="customer_info['signature']" alt="Signature" width="100">
                              <!-- <img v-else-if="customer_info['photo']" :src="customer_info['photo']" alt="Signature" width="100"> -->
                            </label>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
      <div class="hide-on-print-mode">
        <div class="inverst-background"></div>
        <div class="fi-scroll-y">
          <div class="fi_report_approve_dialog">
            <div class="header">
              <span class="fi-resend" title="Resend" v-if="checkResend()" @click="resendRequest()">&#10150;</span>
              <span class="fi-print" title="Print" @click="printFlexibleInterest()"><i class="fas fa-print"></i></i></span>
              <span class="closeIcon" title="Exit" @click="exitDialog()"><i class="far fa-times-circle"></i></i></span>
              <h2 class="text-center"><strong>ອະນຸມັດດອກເບ້ຍຍືດຫຍຸ່ນ</strong></h2>
            </div>
            <div class="body">
              <div class="container">
                <div class="row">
                  <div class="col-12 col-sm-12 col-md-12" id="table_small">
                    <div class="row _border">
                      <div class="col-12">
                        <table class="tb-small">
                          <tbody>
                              <tr>
                                <td  class="col-first">
                                  <small>
                                    <strong>ຂັ້ນອະນຸມັດ:</strong> {{customer_info['organizeStepper']}}
                                  </small>
                                  <small v-if="(customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS')"> 
                                    &#8594; <span :class="customer_info['approveStatus']"> ອະນຸມັດ &#10003;</span>
                                  </small>
                                  <!--  -->
                                  <small v-else-if="(customer_info['approveStatus'] == 'REJECTED') || (customer_info['approveStatus'] == 'REJECTED_50')">
                                    &#8594; <span class="REJECTED"> ປະຕິເສດ &#215;</span>
                                  </small>
                                  <small v-else-if="(customer_info['approveStatus'] == 'CANCEL')">
                                    &#8594; <span :class="customer_info['approveStatus']"> ຍົກເລີກ &#215;</span>
                                  </small>
                                </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ຊື່ລູກຄ້າ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                      {{customer_info['customerName']}}
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ຂໍ້ມູນສ່ວນຕົວ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="fi-text-more text-left">
                                    - ເບີໂທ: {{customer_info['customerTel']}} <br/>- ອາຊີບ: {{customer_info['customerOccupation']}} <br/>- ຂໍ້ມູນອື່ນໆ: {{customer_info['customerDetail']}}                                      
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>ປະຫວັດການໃຊ້ບໍລິການຢູ່ ທຄຕລ:</strong>
                                  <hr style="margin: 1px;">
                                  <div class="fi-text-more text-left">
                                    <span v-for="(account, index) in products" :key="index">
                                      - ເລກບັນຊີ {{account['accountNo']}} {{account['list']?'ໃຊ້ຜະລິດຕະພັນ ' + account['list']:' ບໍ່ໃຊ້ຜະລິດຕະພັນໃດ'}}.
                                        <br style="margin: 1px; padding: 1px;">
                                        <div v-if="account['coreAccs']">
                                            <span v-if="account['coreAccs']['loanAcc']">ບັນຊີເງິນກູ້: <strong> {{account['coreAccs']['loanAcc']}}, </strong></span>
                                            <span v-if="account['coreAccs']['savingAcc']">ບັນຊີເງິນຝາກປະຢັດ: <strong> {{account['coreAccs']['savingAcc']}}, </strong></span>
                                            <span v-if="account['coreAccs']['tdAcc']">ບັນຊີເງິນຝາກປະຈຳ: <strong> {{account['coreAccs']['tdAcc']}}, </strong></span>
                                            <span v-if="account['coreAccs']['currentAcc']">ບັນຊີເງິນຝາກກະແສລາຍວັນ: <strong> {{account['coreAccs']['currentAcc']}}, </strong></span>
                                            <span v-if="account['coreAccs']['nostroAcc']">Nostro: <strong> {{account['coreAccs']['nostroAcc']}} </strong></span>
                                        </div>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                    {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{customer_info['depositAmount']?customer_info['depositAmount'].toLocaleString(undefined,{'maximumFractionDigits':3}).replace(/,/g,'.'):0}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}                                      
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ສະກຸນເງິນ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                      {{customer_info['currencyName']}} ({{customer_info['currencyCode']}})
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ໄລຍະຝາກ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                      {{customer_info['depositTypeName']}}
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                    <strong>ທາງເລືອກດອກເບ້ຍ:</strong>
                                    <hr style="margin: 1px;"> 
                                    <div class="text-right">
                                      {{customer_info['interestChosen']}}
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>% ແລະ ດອກເບ້ຍປົກກະຕິ:</strong>
                                  <hr style="margin: 1px;"> 
                                  <div class="text-right">
                                  {{customer_info['normalInterest']}}% = {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('normalInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}                                    
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>% ດອກເບ້ຍຍືດຫຍຸ່ນສູງສຸດ:</strong>
                                  <hr style="margin: 1px;"> 
                                  <div class="text-right">
                                    {{customer_info['interestFlexible']}}%
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>% ແລະ ດອກເບ້ຍທີ່ຕ້ອງການ:</strong>
                                  <hr style="margin: 1px;"> 
                                  <div class="text-right">
                                    <span :class="getExceededInFlexible()?'APPROVED':getExceededOutFlexible()?'REJECTED':''">{{customer_info['customerInterest']}}%</span>  
                                    =
                                    {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('customerInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                    
                                    <span v-if="(customer_info['approveStatus'] == 'REJECTED_50') || (customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS') || (customer_info['approveStatus'] == 'CANCEL')">
                                        <strong v-if="(customer_info['approveInterest'] == customer_info['customerInterest'])" class="APPROVED"> &#10003;</strong>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              <tr v-if="customer_info['bankInterest']">
                                  <td class="fi-tr-status" colspan="10" v-if="(customer_info['bankInterest'] != customer_info['customerInterest'])">
                                      <strong>ດອກເບ້ຍທີ່ ທຄຕລ ໃຫ້ໄດ້ (ພະແນກບໍລິຫານທຶນ): </strong>
                                      <hr style="margin: 1px;"> 
                                      <div  class="text-right">
                                        <span class="fi-bank-interest">{{customer_info['bankInterest']}}% </span>
                                         = 
                                        <span>
                                          {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('bankInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                        </span>
                                        <span v-if="(customer_info['approveStatus'] == 'REJECTED_50') || (customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS') || (customer_info['approveStatus'] == 'CANCEL')">
                                          <strong v-if="(customer_info['approveInterest'] == customer_info['bankInterest'])" class="APPROVED">&#10003;</strong>
                                        </span>
                                      </div>
                                  </td>
                              </tr>
                              <tr class="text-center">
                                  <td class="col-last"><h4><strong>ສະຖານະອະນຸມັດ: </strong> <strong :class="(customer_info['approveStatus'] == 'REJECTED_50')?'REJECTED':customer_info['approveStatus']">{{(customer_info['approveStatus'] == 'REJECTED_50')?'REJECTED':customer_info['approveStatus']}}</strong></h4> </td>
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="col-12">
                        <div v-if="check_response_edit">
                          <h5 class="text-center"><strong>ຄຳຄິດເຫັນຂອງ{{currenUser['position']}}</strong></h5>
                          <div class="text-left">
                            <strong>{{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}} ({{currenUser['fullName']}})</strong>
                            <br>
                            <textarea placeholder="ຄຳແນະນຳພະນັກງານ" v-model="comment_edit" @change="validateCommentEdit" rows="2"></textarea>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_edit'].length > 0">
                              <span class="danger" v-for="(error, index) in error_validation['comment_edit']" :key="index">{{error}} </span>
                            </div>
                          </div>
                        </div>
                        <div v-if="check_approve">
                          <h5 class="text-center"><strong>ທັດສະນະ ແລະ ຄຳເຫັນຂອງຜູ້ອະນຸມັດ</strong></h5>
                          <div class="text-left">
                            <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}} ({{currenUser['fullName']}})</strong>
                            <br>
                            <div class="fi-status-no-underline">
                                  <form>
                                    <label class="text-left  fi-spacing">
                                      <label class="fi-container">
                                        <span class="fi-radio-text">ເຫັນດີ</span>
                                        <input type="radio" name="radio" value="yes" v-model="comment_request_status" @change="validateCommentRequestStatus">
                                        <span class="fi-checkmark"></span>
                                      </label>
                                    </label>
                                    <label class="text-left">
                                      <label class="fi-container dis-app">
                                          <span class="fi-radio-text">ບໍ່ເຫັນດີ</span>
                                          <input type="radio" name="radio" value="no" v-model="comment_request_status" @change="validateCommentRequestStatus">
                                          <span class="fi-checkmark"></span>
                                      </label>
                                    </label>
                                    <div v-if="error_validation['comment_request_status'].length > 0">
                                      <span class="danger" v-for="(error, index) in error_validation['comment_request_status']" :key="index">{{error}} </span>
                                    </div>
                                  </form>
                            </div>

                            <!-- check_approve -->
                            <div class="fi-status text-left" v-if="checkBankInterestComment()">
                              <form v-if="(customer_info['bankInterest'] != customer_info['customerInterest'])">
                                <small><strong>- ໃຫ້ດອກເບ້ຍລູກຄ້າຕາມພະແນກບໍລິຫານທຶນບໍ? </strong></small>
                                <div class="text-right">
                                  <label class="fi-container fi-spacing">
                                    <span class="fi-radio-text">ໃຫ້</span>
                                    <input type="radio" name="radio" :value="customer_info['bankInterest']" v-model="approve_interest" @change="validateApproveInterest">
                                    <span class="fi-checkmark"></span>
                                  </label>
                                  <label class="fi-container dis-app">
                                    <span class="fi-radio-text">ບໍ່ໃຫ້</span>
                                    <input type="radio" name="radio" :value="0" v-model="approve_interest" @change="validateApproveInterest">
                                    <span class="fi-checkmark"></span>
                                  </label>
                                  <div v-if="error_validation['approve_interest'].length > 0">
                                    <span class="danger" v-for="(error, index) in error_validation['approve_interest']" :key="index">{{error}} </span>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <textarea placeholder="ປະກອບຄຳຄິດຄຳເຫັນ" v-model="comment_approve" @change="validateCommentApprove" rows="2"></textarea>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_approve'].length > 0">
                              <span class="danger" v-for="(error, index) in error_validation['comment_approve']" :key="index">{{error}} </span>
                            </div>
                          </div>
                        </div>
                        <div v-if="!check_approve && !check_response_edit">
                          <h5><strong>ທັດສະນະ ແລະ ຄຳເຫັນ</strong></h5>
                          <div class="text-left" v-for="(staff, index) in requestUsers" :key="index">
                              {{requestUsers.length - index}}. <strong :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''"> {{staff['position']}} {{staff['divisionName']?staff['divisionName']: staff['departmentName']?((staff['departmentId'] != '07')?staff['departmentName']:''): staff['branchName']}} ({{staff['requestUserName']}})</strong>
                              <p class="signature fi-margin-bottom-0" :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">
                                <span v-if="(staff['status'] == 'yes')" :class="staff['status']">&#10003; ເຫັນດີ</span>
                                <span  v-else-if="(staff['status'] == 'no')" :class="staff['status']">&#215; ບໍ່ເຫັນດີ</span>
                                <!-- <br v-if="(staff['status'] != 'em')"/> -->
                                <small style="opacity: 0.6" :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''"> {{staff['date']}} {{staff['time']}}</small>
                                <br>
                                &nbsp&nbsp {{staff['comments']}}
                              </p>
                              <div class="text-right fi-comment-list"  v-if="(staff['type']=='EQ')">
                                <code class="fi-sub-pending" v-if="(index == requestMaxIndex)">Pending( <small>{{staff['recieveUsers']}}</small> )</code>
                                <code :class="staff['status']" v-else>To ( <small>{{staff['recieveUsers']}}</small> )</code>
                              </div>
                          </div>
                          <div class="text-left" v-if="check_request_approve">
                             <strong> {{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}} ({{currenUser['fullName']}})</strong>
                            <br>
                            <div class="fi-status">
                                <div class="text-left">
                                  <label class="fi-container fi-spacing">
                                    <span class="fi-radio-text">ເຫັນດີ</span>
                                    <input type="radio" name="radio" value="yes" v-model="comment_request_status" @change="validateCommentRequestStatus">
                                    <span class="fi-checkmark"></span>
                                  </label>
                                  <label class="fi-container">
                                      <span class="fi-radio-text">ບໍ່ເຫັນດີ</span>
                                      <input type="radio" name="radio" value="no" v-model="comment_request_status" @change="validateCommentRequestStatus">
                                      <span class="fi-checkmark"></span>
                                  </label>
                                  <div v-if="error_validation['comment_request_status'].length > 0">
                                    <span class="danger" v-for="(error, index) in error_validation['comment_request_status']" :key="index">{{error}} </span>
                                  </div>
                                </div>
                                <div class="text-left" v-if="checkBankInterestUser() && (this.comment_request_status == 'no')">
                                  <span class="fi-bank-interest">ດອກເບ້ຍທີ່ສາມາດໃຫ້ລູກຄ້າ *: </span>
                                  <input type="number" class="fi-bank-input-interest" :min="customer_info['normalInterest']" step="0.01" placeholder="ອັດຕາດອກເບ້ຍໃຫ້ລູກຄ້າ" v-model="bank_interest" @change="validateBankInterest()">
                                  <!-- <span class="fi-bank-interest"> %</span> -->
                                  <div v-if="error_validation['bank_interest'].length > 0">
                                    <span class="danger" v-for="(error, index) in error_validation['bank_interest']" :key="index">{{error}} </span>
                                  </div>
                                </div>
                            </div>
                            <textarea placeholder="ປະກອບຄຳຄິດຄຳເຫັນ" v-model="comment_request" @change="validateCommentRequest" rows="2"></textarea>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_request'].length > 0">
                              <span class="danger" v-for="(error, index) in error_validation['comment_request']" :key="index">{{error}} </span>
                            </div>
                          </div>
                          <!-- v-if="customer_info['signature'] || customer_info['photo']" -->
                          <div class="text-right">
                            <label class="text-center">
                              <strong>ລູກຄ້າ</strong>
                              <br>
                              <span class="(customer_info['signature'] || customer_info['photo'])?signature:''">{{customer_info['customerName']}}</span>
                              <br>
                              <img v-if="customer_info['signature']" :src="customer_info['signature']" alt="Signature" width="100">
                              <img v-else-if="customer_info['photo']" :src="fileIp + customer_info['photo']" alt="Signature" width="100">
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-12 col-md-12" id="table_big">
                      <div class="table-responsive">          
                          <table class="table tb-big">
                              <thead class="text-center">
                                  <tr>
                                      <td class="fi-tr-status text-left" colspan="10">
                                          <span>
                                            <strong>ຂັ້ນອະນຸມັດ:</strong> {{customer_info['organizeStepper']}}
                                          </span>
                                          <span v-if="(customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS')"> 
                                            &#8594; <span :class="customer_info['approveStatus']"> ອະນຸມັດ &#10003;</span>
                                          </span>
                                          <span v-else-if="(customer_info['approveStatus'] == 'REJECTED') || (customer_info['approveStatus'] == 'REJECTED_50')">
                                            &#8594; <span class="REJECTED"> ປະຕິເສດ &#215;</span>
                                          </span>
                                          <span v-else-if="(customer_info['approveStatus'] == 'CANCEL')">
                                            &#8594; <span :class="customer_info['approveStatus']"> ຍົກເລີກ &#215;</span>
                                          </span>
                                      </td>
                                  </tr>
                                  <tr>
                                      <th >ຊື່ລູກຄ້າ</th>
                                      <th >ຂໍ້ມູນສ່ວນຕົວ</th>
                                      <th >ປະຫວັດການໃຊ້ບໍລິການຢູ່ ທຄຕລ</th>
                                      <th >ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ</th>
                                      <th >ສະກຸນເງິນ</th>
                                      <th >ໄລຍະຝາກ</th>
                                      <th >ທາງເລືອກດອກເບ້ຍ</th>
                                      <th >% ແລະ ດອກເບ້ຍປົກກະຕິ</th>
                                      <th >% ດອກເບ້ຍຍືດຫຍຸ່ນສູງສຸດ</th>
                                      <th >% ແລະ ດອກເບ້ຍທີ່ຕ້ອງການ</th>
                                  </tr>
                              </thead>
                              <tbody class="text-left">
                                  <tr>
                                      <td>{{customer_info['customerName']}}</td>
                                      <td class="fi-text-more">ເບີໂທ: {{customer_info['customerTel']}} <br/>ອາຊີບ: {{customer_info['customerOccupation']}} <br/>ຂໍ້ມູນອື່ນໆ: {{customer_info['customerDetail']}}</td>
                                      <td class="fi-text-more">
                                        <span v-for="(account, index) in products" :key="index">
                                          - ເລກບັນຊີ {{account['accountNo']}} {{account['list']?'ໃຊ້ຜະລິດຕະພັນ ' + account['list']:' ບໍ່ໃຊ້ຜະລິດຕະພັນໃດ'}}.
                                          <br style="margin: 1px; padding: 1px;">
                                          <div v-if="account['coreAccs']">
                                              <span v-if="account['coreAccs']['loanAcc']">ບັນຊີເງິນກູ້: <strong> {{account['coreAccs']['loanAcc']}}, </strong></span>
                                              <span v-if="account['coreAccs']['savingAcc']">ບັນຊີເງິນຝາກປະຢັດ: <strong> {{account['coreAccs']['savingAcc']}}, </strong></span>
                                              <span v-if="account['coreAccs']['tdAcc']">ບັນຊີເງິນຝາກປະຈຳ: <strong> {{account['coreAccs']['tdAcc']}}, </strong></span>
                                              <span v-if="account['coreAccs']['currentAcc']">ບັນຊີເງິນຝາກກະແສລາຍວັນ: <strong> {{account['coreAccs']['currentAcc']}}, </strong></span>
                                              <span v-if="account['coreAccs']['nostroAcc']">Nostro: <strong> {{account['coreAccs']['nostroAcc']}} </strong></span>
                                          </div>
                                        </span>
                                      </td>
                                      <td>{{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{customer_info['depositAmount']?customer_info['depositAmount'].toLocaleString(undefined,{'maximumFractionDigits':3}).replace(/,/g,'.'):0}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}</td>
                                      <td>{{customer_info['currencyName']}} ({{customer_info['currencyCode']}})</td>
                                      <td>{{customer_info['depositTypeName']}}</td>
                                      <td>{{customer_info['interestChosen']}}</td>
                                      <td>
                                        {{customer_info['normalInterest']}}% 
                                        <hr>
                                        {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('normalInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                      </td>
                                      <td>{{customer_info['interestFlexible']}}% </td>
                                      <td>
                                        <span :class="getExceededInFlexible()?'APPROVED':getExceededOutFlexible()?'REJECTED':''">{{customer_info['customerInterest']}}%</span> 
                                        <span v-if="(customer_info['approveStatus'] == 'REJECTED_50') || (customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS') || (customer_info['approveStatus'] == 'CANCEL')">
                                          <strong v-if="(customer_info['approveInterest'] == customer_info['customerInterest'])" class="APPROVED"> &#10003;</strong>
                                        </span>
                                        <hr>
                                        {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('customerInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                      </td>
                                  </tr>
                                  <tr v-if="customer_info['bankInterest']">
                                      <td class="fi-tr-status text-center" colspan="10" v-if="(customer_info['bankInterest'] != customer_info['customerInterest'])">
                                          <h5>
                                            <span class="fi-bank-interest">ດອກເບ້ຍທີ່ ທຄຕລ ໃຫ້ໄດ້ (ພະແນກບໍລິຫານທຶນ): </span>
                                            <span class="fi-bank-interest">{{customer_info['bankInterest']}}% = </span>
                                            <span class="fi-bank-interest">
                                              {{(customer_info['currencyCode'] == 'USD')?customer_info['currencyUnit']:''}}{{getEarningPerYear('bankInterest')}}{{(customer_info['currencyCode'] != 'USD')?customer_info['currencyUnit']:''}}
                                            </span>
                                            <span v-if="(customer_info['approveStatus'] == 'REJECTED_50') || (customer_info['approveStatus'] == 'APPROVED') || (customer_info['approveStatus'] == 'SUCCESS') || (customer_info['approveStatus'] == 'CANCEL')">
                                              <strong v-if="(customer_info['approveInterest'] == customer_info['bankInterest'])" class="APPROVED">&#10003;</strong>
                                            </span>
                                          </h5>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="fi-tr-status text-center" colspan="10">
                                          <!-- <strong>ຕາຕະລາງປຽບທຽບສ່ວນຕ່າງລະຫວ່າງລາຍຈ່າຍດອກເບ້ຍ ແລະ ລາຍຮັບດອກເບ້ຍເງິນກູ້</strong> -->
                                          <h4><strong>ສະຖານະອະນຸມັດ: </strong> <strong :class="(customer_info['approveStatus'] == 'REJECTED_50')?'REJECTED':customer_info['approveStatus']">{{(customer_info['approveStatus'] == 'REJECTED_50')?'REJECTED':customer_info['approveStatus']}}</strong></h4>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td colspan="6" v-if="check_response_edit">
                                        <h5 class="text-center"><strong>ຄຳຄິດເຫັນຂອງ{{currenUser['position']}}</strong></h5>
                                        <div class="text-left">
                                          <strong>{{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                          <br>
                                          <textarea placeholder="ຄຳແນະນຳພະນັກງານ" v-model="comment_edit" @change="validateCommentEdit" rows="2"></textarea>
                                          <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_edit'].length > 0">
                                            <span class="danger" v-for="(error, index) in error_validation['comment_edit']" :key="index">{{error}} </span>
                                          </div>
                                        </div>
                                      </td>
                                      <!--  || check_reject -->
                                      <td colspan="6" v-if="check_approve">
                                        <h5 class="text-center" v-if="check_approve"><strong>ທັດສະນະ ແລະ ຄຳເຫັນຂອງຜູ້ອະນຸມັດ</strong></h5>
                                        <h5 class="text-center" v-else-if="check_reject"><strong>ທັດສະນະ ແລະ ຄຳເຫັນຂອງຜູ້ປະຕິເສດ</strong></h5>
                                        <div class="text-left">
                                          <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                          <br>

                                          <div class="fi-status-no-underline">
                                            <div class="row">
                                              <div class="col-4 text-left">
                                                <form>
                                                  <label class="text-left" style="width:50%">
                                                    <label class="fi-container">
                                                      <span class="fi-radio-text">ເຫັນດີ</span>
                                                      <input type="radio" name="radio" value="yes" v-model="comment_request_status" @change="validateCommentRequestStatus">
                                                      <span class="fi-checkmark"></span>
                                                    </label>
                                                  </label>
                                                  <label class="text-left" style="width:50%">
                                                    <label class="fi-container">
                                                        <span class="fi-radio-text">ບໍ່ເຫັນດີ</span>
                                                        <input type="radio" name="radio" value="no" v-model="comment_request_status" @change="validateCommentRequestStatus">
                                                        <span class="fi-checkmark"></span>
                                                    </label>
                                                  </label>
                                                  <div v-if="error_validation['comment_request_status'].length > 0">
                                                    <span class="danger" v-for="(error, index) in error_validation['comment_request_status']" :key="index">{{error}} </span>
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                          </div>

                                          <!-- check_approve -->
                                          <div class="fi-status text-left"  v-if="checkBankInterestComment()">
                                            <form>
                                              <div v-if="(customer_info['bankInterest'] != customer_info['customerInterest'])">
                                                <strong>- ໃຫ້ດອກເບ້ຍລູກຄ້າຕາມພະແນກບໍລິຫານທຶນບໍ? </strong>
                                                <label class="fi-container fi-spacing">
                                                  <span class="fi-radio-text">ໃຫ້</span>
                                                  <input type="radio" name="radio" :value="customer_info['bankInterest']" v-model="approve_interest" @change="validateApproveInterest">
                                                  <span class="fi-checkmark"></span>
                                                </label>
                                                <label class="fi-container">
                                                  <span class="fi-radio-text">ບໍ່ໃຫ້</span>
                                                  <input type="radio" name="radio" :value="0" v-model="approve_interest" @change="validateApproveInterest">
                                                  <span class="fi-checkmark"></span>
                                                </label>
                                                <div v-if="error_validation['approve_interest'].length > 0">
                                                  <span class="danger" v-for="(error, index) in error_validation['approve_interest']" :key="index">{{error}} </span>
                                                </div>
                                              </div>
                                            </form>
                                          </div>
                                          <textarea placeholder="ປະກອບຄຳຄິດຄຳເຫັນ" v-model="comment_approve" @change="validateCommentApprove" rows="2"></textarea>
                                          <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_approve'].length > 0">
                                            <span class="danger" v-for="(error, index) in error_validation['comment_approve']" :key="index">{{error}} </span>
                                          </div>
                                        </div>
                                      </td>
                                      <!--   && !check_reject -->
                                      <td colspan="6" v-if="!check_approve && !check_response_edit">
                                          <h5 class="text-center"><strong>ທັດສະນະ ແລະ ຄຳເຫັນ</strong></h5>
                                          <div class="text-left" v-if="check_request_approve">
                                            <strong>* {{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                            <br>
                                            <div class="fi-status">
                                              <div class="row">
                                                <div class="col-4 text-left">
                                                  <label class="text-left" style="width:50%">
                                                    <label class="fi-container">
                                                      <span class="fi-radio-text">ເຫັນດີ</span>
                                                      <input type="radio" name="radio" value="yes" v-model="comment_request_status" @change="validateCommentRequestStatus">
                                                      <span class="fi-checkmark"></span>
                                                    </label>
                                                  </label>
                                                  <label class="text-left" style="width:50%">
                                                    <label class="fi-container">
                                                        <span class="fi-radio-text">ບໍ່ເຫັນດີ</span>
                                                        <input type="radio" name="radio" value="no" v-model="comment_request_status" @change="validateCommentRequestStatus">
                                                        <span class="fi-checkmark"></span>
                                                    </label>
                                                  </label>
                                                  <div v-if="error_validation['comment_request_status'].length > 0">
                                                    <span class="danger" v-for="(error, index) in error_validation['comment_request_status']" :key="index">{{error}} </span>
                                                  </div>
                                                </div>
                                                <div class="col-8 text-left" v-if="checkBankInterestUser() && (this.comment_request_status == 'no')">
                                                  <span class="fi-bank-interest">ດອກເບ້ຍທີ່ສາມາດໃຫ້ລູກຄ້າ *: </span>
                                                  <input type="number" class="fi-bank-input-interest" :min="customer_info['normalInterest']" step="0.01" placeholder="ອັດຕາດອກເບ້ຍໃຫ້ລູກຄ້າ" v-model="bank_interest" @change="validateBankInterest()">
                                                  <!-- <span class="fi-bank-interest"> %</span> -->
                                                  <div v-if="error_validation['bank_interest'].length > 0">
                                                    <span class="danger" v-for="(error, index) in error_validation['bank_interest']" :key="index">{{error}} </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <textarea placeholder="ຄຳຄິດຄຳເຫັນ" v-model="comment_request" @change="validateCommentRequest" rows="2"></textarea>
                                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 text-left" v-if="error_validation['comment_request'].length > 0">
                                              <span class="danger" v-for="(error, index) in error_validation['comment_request']" :key="index">{{error}} </span>
                                            </div>
                                          </div>
                                          <div class="fi-comment-list text-left" v-for="(staff, index) in requestUsers" :key="index">
                                              {{requestUsers.length - index}}. <strong :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''"> {{staff['position']}} {{staff['divisionName']?staff['divisionName']: staff['departmentName']?((staff['departmentId'] != '07')?staff['departmentName']:''): staff['branchName']}}</strong>
                                              <p class="signature fi-margin-bottom-0" :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">
                                                <span v-if="(staff['status'] == 'yes')" :class="staff['status']">&#10003; ເຫັນດີ</span>
                                                <span  v-else-if="(staff['status'] == 'no')" :class="staff['status']">&#215; ບໍ່ເຫັນດີ</span>
                                                <br v-if="(staff['status'] != 'em')"/>
                                                &nbsp &nbsp {{staff['comments']}}
                                              </p>
                                              <div class="row">
                                                <div class="col-4 text-left">
                                                  <small style="opacity: 0.6" :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''"> {{staff['date']}} {{staff['time']}}</small>
                                                </div>
                                                <div class="col-8 text-right"  v-if="(staff['type']=='EQ')">
                                                  <code class="fi-sub-pending" v-if="(index == requestMaxIndex)">Pending( <small>{{staff['recieveUsers']}}</small> )</code>
                                                  <code :class="staff['status']" v-else>To ( <small>{{staff['recieveUsers']}}</small> )</code>
                                                </div>
                                              </div>
                                          </div>
                                      </td>
                                      <!--  || check_reject -->
                                      <td class="text-center" colspan="4" v-if="check_approve">
                                        <h5 v-if="check_approve"><strong>ຊື່ຜູ້ອະນຸມັດ</strong></h5>
                                        <h5 v-else-if="check_reject"><strong>ຊື່ຜູ້ປະຕິເສດລາຍການ</strong></h5>
                                        <div>
                                          <strong>{{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                          <p><span class="new-signature">{{currenUser['fullName']}}</span></p>
                                        </div>
                                      </td>
                                      <td class="text-center" colspan="4" v-if="check_response_edit">
                                        <h5><strong>ຊື່{{currenUser['position']}}</strong></h5>
                                        <div>
                                          <strong>{{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                          <p><span class="new-signature">{{currenUser['fullName']}}</span></p>
                                        </div>
                                      </td>
                                      <!--  && !check_reject -->
                                      <td class="text-left" colspan="4" v-if="!check_approve && !check_response_edit">
                                          <h5 class="text-center"><strong>ຊື່ພະນັກງານ ແລະ ຜູ້ອະນຸມັດແຕ່ລະຂັ້ນ</strong></h5>
                                          <div  class="text-center" v-if="check_request_approve">
                                            <strong>* {{currenUser['position']}} {{currenUser['divisionName']?currenUser['divisionName']: currenUser['departmentName']?((currenUser['departmentId'] != '07')?currenUser['departmentName']:''): currenUser['branchName']}}</strong>
                                            <p><span class="new-signature">{{currenUser['fullName']}}</span></p>
                                          </div>
                                          <div v-for="(staff, index) in requestUsers" :key="index">
                                              {{requestUsers.length - index}}. 
                                              <strong :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':((staff['type']=='PR'))?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">{{staff['position']}} {{staff['divisionName']?staff['divisionName']: staff['departmentName']?((staff['departmentId'] != '07')?staff['departmentName']:''): staff['branchName']}}</strong>
                                              <p  class="signature">&nbsp &nbsp <span :class="(staff['type']=='EJ_50')?'REJECTED_50':(staff['type']=='SUCS')?'SUCCESS':(staff['type']=='PR')?'APPROVED':(staff['type']=='EJ')?'REJECTED':(staff['type']=='ED')?'EDIT':(staff['type']=='EDD')?'EDITED':''">{{staff['requestUserName']}}</span></p>
                                          </div>
                                          <!-- v-if="customer_info['signature'] || customer_info['photo']" -->
                                          <div class="text-right">
                                            <label class="text-center">
                                              <strong>ລູກຄ້າ</strong>
                                              <br>
                                              <span class="(customer_info['signature'] || customer_info['photo'])?signature:''">{{customer_info['customerName']}}</span>
                                              <br>
                                              <img v-if="customer_info['signature']" :src="customer_info['signature']" alt="Signature" width="100">
                                              <img v-else-if="customer_info['photo']" :src="fileIp + customer_info['photo']" alt="Signature" width="100">
                                            </label>
                                          </div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <!-- <div class="col-12 text-right">
                    <h3>ສະຖານະອະນຸມັດ: <strong>{{customer_info['approveStatus']}}</strong></h3>
                  </div> -->
                  <div class="col-12 hide-on-print-mode" v-if="!check_approve && !check_request_approve && !check_response_edit && !check_reject">
                      <div class="row">
                          <div class="col-12 text-right" v-if="disableLeaderApproveButton">
                              <!-- :class="!checkRequestApprove()?'spacing':''" -->
                              <button class="fi-btn edit" :class="!checkRequestApprove()?'spacing':''" type="button" @click="check_response_edit = !check_response_edit">&#9998; ແກ້ໄຂຄືນ</button>
                              <button class="fi-btn spacing request" type="button" v-if="checkRequestApprove()" @click="check_request_approve = !check_request_approve"><i class="fa fa-envelope-o" aria-hidden="true"></i> ຂໍອະນຸມັດ</button> 
                              <!-- <button class="fi-btn reject spacing" type="button" v-if="canApprove()" @click="check_reject = !check_reject">&#33; ປະຕິເສດ</button> -->
                               <!--  -->
                              <button class="fi-btn success" type="button" v-if="canApprove()" @click="check_approve = !check_approve">&#9745; ອະນຸມັດ</button>
                          </div>
                          <div class="col-12 text-right" v-if="!disableLeaderApproveButton">
                            <h6><strong :class="approve_permission['style']" v-if="approve_permission['message']">* {{approve_permission['message']}}</strong></h6>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 hide-on-print-mode" v-if="check_request_approve">
                      <div class="row" v-if="disableLeaderApproveButton">
                          <div class="col-12 text-right">
                              <button class="fi-btn cancel spacing" type="button" @click="check_request_approve = false">&#10006; ຍົກເລີກ</button> 
                              <button class="fi-btn request" type="button" @click="sendRequest()">&#9745; ຕົກລົງ</button>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 hide-on-print-mode" v-if="check_approve">
                      <div class="row" v-if="disableLeaderApproveButton && canApprove()">
                          <div class="col-12 text-right">
                              <!-- spacing -->
                              <button class="fi-btn cancel" :class="!check_reject?'spacing':''" type="button" @click="cancleApproveReject()">&#10006; ຍົກເລີກ</button> 
                              <button class="fi-btn reject spacing" type="button" v-if="check_reject && canApprove()" @click="rejectRequirement()">&#33; ປະຕິເສດ</button>
                              <button class="fi-btn success" type="button" v-if="!check_reject && canApprove()" @click="sendApprove()">&#10004; ອະນຸມັດ</button>
                          </div>
                      </div>
                  </div>
                  <!-- <div class="col-12 hide-on-print-mode" v-if="check_reject">
                      <div class="row" v-if="disableLeaderApproveButton && canApprove()">
                          <div class="col-12 text-right">
                              <button class="fi-btn cancel spacing" type="button" @click="check_reject = false">&#10006; ຍົກເລີກ</button> 
                              <button class="fi-btn reject" type="button" @click="rejectRequirement()">&#9745; ຕົກລົງ</button>
                          </div>
                      </div>
                  </div> -->
                  <div class="col-12 hide-on-print-mode" v-if="check_response_edit">
                      <div class="row" v-if="disableLeaderApproveButton">
                          <div class="col-12 text-right">
                              <button class="fi-btn cancel spacing" type="button" @click="check_response_edit = false">&#10006; ຍົກເລີກ</button> 
                              <button class="fi-btn edit" type="button" @click="sendEdit()">&#10148; ສົ່ງ</button>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ds from '@/helper/ds.js';
import address from '@/helper/server_address.js'
import axios from 'axios';
export default {
  name: 'fi_report_approve_dialog',
  data(){
    return {
      sequenceMax: 0,
      requestMaxIndex: -1,
      fileIp: address['fileIp'],
      bank_interest: '',
      approve_interest: '',
      disableLeaderApproveButton: false,
      customer_info: this.$store.getters['flexible_interest_module/customer_detail'],
      requestUsers: [],
      requestUsersReverse: [],
      products: [],
      currenUser: {},
      approve_permission: {},
      check_top_header: false,
      check_approve: false,
      check_reject: false,
      check_request_approve: false,
      check_response_edit: false,
      comment_request: "",
      comment_request_status:'',
      comment_edit: "",
      comment_approve: "",
      error_validation:{
        comment_request: [],
        comment_edit: [],
        comment_approve: [],
        comment_request_status: [],
        bank_interest: [],
        approve_interest: []
      }
    }
  },
  props: {
    config: {
      default: {
        show: true,
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
      type: Object
    }
  },
  watch: {
    '$route'(to, from) {
      ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/by/id', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
          if(result)
          {
              this.customer_info = result;
              this.$root.$emit("reloadAllApprove");
              this.getProductInfo();
              axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_info['accountClass']+'/'+this.customer_info['currencyCode']+'/'+this.customer_info['requirementId'])
              .then((res) => {
                this.customer_info['normalInterest'] = res['data']['data']['interest'];
                this.$forceUpdate();
              })
              .catch((error) =>  {
                  
              })
              this.$forceUpdate();
          }
      });
    }
  },
  created(){
    this.$root.$on('reloadAllApprove', () => {
      ds.rpc.make('/bcel/api/flexible/interest/approve/notification', { requirementId:  this.customer_info['requirementId']}, ( error, result ) => {
          if(result) {
            this.requestUsers = result;
            Object.assign(this.requestUsersReverse,this.requestUsers);
            this.requestUsersReverse.reverse();
            //console.log(this.requestUsers);
            for(var i = 0; i < this.requestUsers.length; i++){
              if(this.notEditShow(this.requestUsers[i]['type'])){
                this.requestUsers[i]['seq'] = this.sequenceMax;
                this.sequenceMax = this.sequenceMax + 1;
                if(this.requestMaxIndex == -1){
                  this.requestMaxIndex = i;
                }
              }
            }
            this.$forceUpdate();
          }
      });
      ds.rpc.make('/bcel/api/flexible/interest/approve/same/lavel/permission', {userId: this.$store.getters['flexible_interest_module/user'], requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
          if(!error) {
            this.disableLeaderApproveButton = result['permission'];
            this.check_top_header = result['topApprove'] ;
            this.approve_permission = result ;
            if(this.disableLeaderApproveButton) {
              ds.rpc.make('/bcel/api/flexible/interest/current/user', { userId: this.$store.getters['flexible_interest_module/user']}, ( error, result ) => {
                if(result)
                {
                  this.currenUser = result;
                  this.$forceUpdate();
                }
              });
            } else {
              this.currenUser = {};
            }
            this.$forceUpdate();
          }
      });
    });
    if(!this.customer_info['requirementId']){
        ds.rpc.make('/bcel/api/flexible/interest/customer/requirement/by/id', { requirementId:  atob(this.$route.params['id'])}, ( error, result ) => {
            if(result)
            {
                this.customer_info = result;
                this.$root.$emit("reloadAllApprove");
                this.getProductInfo();
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
                });*/
                axios.get(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_info['accountClass']+'/'+this.customer_info['currencyCode']+'/'+this.customer_info['requirementId'])
                .then((res) => {
                  this.customer_info['normalInterest'] = res['data']['data']['interest'];
                  this.$forceUpdate();
                })
                .catch((error) =>  {
                    
                })
                this.$forceUpdate();
            }
        });
    } else {
      this.$root.$emit("reloadAllApprove");
      //console.log(this.customer_info)
      if(this.customer_info['bankAccounts'].length > 0) {
        this.getProductInfo();
      }
    }
  },
  mounted(){
  },
  methods: {
    getPrintViewSequence(){
      var seq = this.sequenceMax - this.sequence;
      this.sequence = this.sequence + 1;
      return seq;
    },
    changeLeaderStatus(status){
      // if(this.comment_status.length > 0){
        this.comment_status = [];
        this.comment_status[0] = status;
        //console.log(this.comment_status)
      // } else {
      //   console.log('No value')
      // }
    },
    getProductInfo(){
      this.products = [];
      if(this.customer_info['bankAccounts'].length > 0) {
          axios.post(address['serverIp'] +'/bcel/api/flexible/interest/products/history/html',
              this.customer_info['bankAccounts']
          )
          .then((res) => {
              var products = res['data']['data'];
              for(var j = 0; j < products.length; j++){
                  var result = products[j]['list_html'];
                  products[j]['list_html'] = result
                        .replace(/img\//g,'/img/')
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
              //console.log(error)
              this.showLoading = false;
          });
        } else {
            this.showLoading = false;
        }
    },
    validateCommentRequest(){
      //console.log("change work")
        if(!this.comment_request.trim()){
            if(this.error_validation['comment_request'].length == 0){
              this.error_validation['comment_request'].push('ປະກອບຄຳຄິດເຫັນຂອງທ່ານ');
            }
            return false;
        } else if(this.error_validation['comment_request'].length > 0) {
            this.error_validation['comment_request'].pop();
        }
        return true;
    },
    validateCommentRequestStatus(){
        if(!this.comment_request_status.trim()){
            if(this.error_validation['comment_request_status'].length == 0){
              this.error_validation['comment_request_status'].push('ທ່ານເຫັນດີ ຫຼື ບໍ່ເຫັນດີ');
            }
            return false;
        } else if(this.error_validation['comment_request_status'].length > 0) {
            
            this.error_validation['comment_request_status'].pop();
        }
        if(this.checkBankInterestUser()){
          if(this.comment_request_status == 'yes'){
            this.bank_interest = this.customer_info['customerInterest'].toString();
            this.validateBankInterest();
          } else {
            this.bank_interest = '';
          }
        }
        // console.log((this.currenUser['positionLevel'] < 3) || (this.currenUser['positionLevel'] == 4), this.currenUser['positionLevel'])
        if(this.checkApproveUser()){
          if(this.comment_request_status.trim() == 'yes'){
            this.approve_interest = this.customer_info['customerInterest'];
            this.check_reject = false;
          } else {
            this.approve_interest = '';
            this.check_reject = true;
          }
        }
      // console.log(this.comment_request_status.trim(), this.bank_interest)
        //console.log(this.comment_request_status.trim(), this.approve_interest.toString())
    },
    validateCommentRequestStatusCheck(){
      //console.log("change work")
        if(!this.comment_request_status.trim()){
            if(this.error_validation['comment_request_status'].length == 0){
              this.error_validation['comment_request_status'].push('ທ່ານເຫັນດີ ຫຼື ບໍ່ເຫັນດີ');
            }
            return false;
        } else if(this.error_validation['comment_request_status'].length > 0) {
            
            this.error_validation['comment_request_status'].pop();
        }
        return true;
    },//
    checkApproveUser(){
      return (this.currenUser['positionLevel'] < 3) || (this.currenUser['positionLevel'] == 4);
    },
    validateBankInterest(){
        if(!this.bank_interest.trim()){
            if(this.error_validation['bank_interest'].length == 0){
              this.error_validation['bank_interest'].push('ອັດຕາດອກເບ້ຍທີ່ສາມາດໃຫ້ລູກຄ້າ');
            }
            return false;
        } else if(this.error_validation['bank_interest'].length > 0) {
            
            this.error_validation['bank_interest'].pop();
        }
        return true;
    },
    validateApproveInterest(){
        if(!this.approve_interest.toString().trim()){
            if(this.error_validation['approve_interest'].length == 0){
              this.error_validation['approve_interest'].push('ເລືອກ 1 ຄຳຕອບ...');
            }
            return false;
        } else if(this.error_validation['approve_interest'].length > 0) {
            this.error_validation['approve_interest'].pop();
        }
        //console.log(this.comment_request_status.trim(), this.approve_interest.toString())
        return true;
    },
    validateCommentEdit(){
        if(!this.comment_edit.trim()){
            if(this.error_validation['comment_edit'].length == 0){
              this.error_validation['comment_edit'].push('ປະກອບຄຳແນະນຳຂອງທ່ານ');
            }
            return false;
        } else if(this.error_validation['comment_edit'].length > 0) {
            this.error_validation['comment_edit'].pop();
        }
        return true;
    },
    validateCommentApprove(){
        if(!this.comment_approve.trim()){
            if(this.error_validation['comment_approve'].length == 0){
              this.error_validation['comment_approve'].push('ປະກອບຄຳຄິດເຫັນຂອງທ່ານ');
            }
            return false;
        } else if(this.error_validation['comment_approve'].length > 0) {
            this.error_validation['comment_approve'].pop();
        }
        return true;
    },
    isDirectorBoard(){
      return (this.currenUser['positionLevel'] < 3);
    },
    checkResend(){
      return (this.customer_info['approveStatus'] == 'PENDING') && (this.$store.getters['flexible_interest_module/user'] == (this.requestUsers.length?this.requestUsers[0]['requestUser']:undefined));
    },
    checkBankInterestComment(){
      return (this.currenUser['positionLevel'] < 3) && this.check_reject && (this.customer_info['bankInterest'] != this.customer_info['customerInterest'])
    },
    checkBankInterestUser(){
      return (this.currenUser['departmentId'] == '07') && (this.currenUser['positionLevel'] == 3);
    },
    notEditShow(type){
      return !((type == 'ED') || (type == 'EDD'));
    },
    exitDialog(){
      this.config['show'] = false;
      this.check_approve = false;
      this.check_reject = false;
      this.check_request_approve = false;
      this.check_response_edit = false;
      this.comment_request = '';
      this.comment_request_status = '';
      this.comment_edit = '';
      this.comment_approve = '';
      this.comment_status = '';
      this.bank_interest = '';
      this.approve_interest = '';
    },
    cancleApproveReject(){
      this.check_approve = false;
      this.check_reject = false;
      this.approve_interest = '';
      this.comment_request_status = '';
    },
    rejectRequirement(){
      if(this.validateCommentApprove() && (this.isDirectorBoard()?this.validateApproveInterest():true)) {
        this.$store.commit('flexible_interest_module/changeCommentApprove', { comment: this.comment_approve });
        this.$store.commit('flexible_interest_module/changeBankInterest', { interest: this.approve_interest });
        this.comment_approve = "";
        this.check_approve = false;
        this.config['rejectEvt']();
      } else {
        this.validateCommentApprove();
        this.isDirectorBoard()?this.validateApproveInterest():true;
      }
    },
    sendApprove(){
      if(this.validateCommentApprove() && this.validateCommentRequestStatusCheck()) {
        if(this.isDirectorBoard()?!this.validateApproveInterest():false) {
          this.isDirectorBoard()?this.validateApproveInterest():true;
          return;
        }
        this.$store.commit('flexible_interest_module/changeCommentApprove', { comment: this.comment_approve });
        this.$store.commit('flexible_interest_module/changeBankInterest', { interest: this.approve_interest });
        this.approve_interest = "";
        this.comment_approve = "";
        this.check_approve = false;
        this.config['sendApproveEvt']();
      } else {
        this.validateCommentApprove();
        this.validateCommentRequestStatusCheck();
      }
    },
    sendRequest(){
      if(this.validateCommentRequest() && this.validateCommentRequestStatusCheck() && (this.checkBankInterestUser()?this.validateBankInterest():true)) {
        this.$store.commit('flexible_interest_module/changeCommentRequest', { comment: this.comment_request});
        this.$store.commit('flexible_interest_module/changeCommentRequestStatus', { status: this.comment_request_status });
        this.$store.commit('flexible_interest_module/changeBankInterest', { interest: this.bank_interest });
        this.comment_request = "";
        this.comment_request_status = "";
        this.bank_interest = '';
        this.check_request_approve = false;
        this.config['sendRequestEvt']();
      } else {
        this.validateCommentRequestStatusCheck();
        this.checkBankInterestUser()?this.validateBankInterest():true;
      }
    },
    resendRequest(){
      this.$store.commit('flexible_interest_module/changeCommentRequest', { comment: this.requestUsers[0]['comments']});
      this.$store.commit('flexible_interest_module/changeCommentRequestStatus', { status: 'em' });
      this.$store.commit('flexible_interest_module/changeBankInterest', { interest: 0 });
      this.comment_request = "";
      this.comment_request_status = "";
      this.check_request_approve = false;
      this.config['sendRequestEvt']();
    },
    sendEdit() {
      if(this.validateCommentEdit()){
        this.$store.commit('flexible_interest_module/changeCommentEdit', { comment: this.comment_edit });
        this.comment_edit = "";
        this.check_response_edit = false;
        this.config['sendEditEvt']();
      }
    },
    getEarningPerYear(key){
        if(this.customer_info['depositAmount'] && this.customer_info['currencyCode'] && this.customer_info['depositType']){
          var interest = this.customer_info['depositAmount'] * (this.customer_info[key] / 100) * (this.customer_info['depositTotalDays'] / 360);
          return interest.toLocaleString(undefined,{'minimumFractionDigits':0,'maximumFractionDigits':3})
        } else {
          return 0;
        }
    },
    canApprove(){
      try{
        var customer_interest = parseFloat(this.customer_info['customerInterest']);
        var max_interest = parseFloat(this.customer_info['normalInterest']) + parseFloat(this.customer_info['interestFlexible']);
        if((customer_interest > max_interest) && (this.customer_info['normalInterest'] > 0) && (this.customer_info['interestFlexible'] > 0)){
            
            if(this.currenUser['positionLevel'] < 3) {
              return false || this.approve_permission['canApprove'];
            } else {
              return false;
            }
        } else if((customer_interest < max_interest) && (this.customer_info['normalInterest'] > 0) && (this.customer_info['interestFlexible'] > 0)){
            return false || this.approve_permission['canApprove'];
        }  else {
            return false;
        }
      } catch(e) {
          return false;
      }
    },
    checkRequestApprove(){
      try{
        var customer_interest = parseFloat(this.customer_info['customerInterest']);
        var max_interest = parseFloat(this.customer_info['normalInterest']) + parseFloat(this.customer_info['interestFlexible']);
        if(this.currenUser['positionLevel'] == 4) {
          return this.check_top_header && ((customer_interest > max_interest) && (this.customer_info['normalInterest'] > 0) && (this.customer_info['interestFlexible'] > 0));
        } else {
          return this.check_top_header;
        }
      }catch(e){
        return false;
      }
    },
    printFlexibleInterest(){
      $.print("#divPrint");
      //window.print();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
._border {
  border: solid 1px #cccccc;
  border-radius: 0.5rem;
}
// * {
//     font-family: Phetsarath_OT;
// }
.fi-margin-bottom-0{
  margin-bottom: 0%;
}
.fi-comment-list{
  margin-bottom: 10px;
}
.fi-sub-pending{
  font-size: 12px;
  //color: rgb(247, 190, 121);
  //color: rgb(199, 198, 198);
  color: rgb(247, 89, 16);
  //opacity: 0.5;
}
.fi-sub-passed {
  font-size: 12px;
  color: #20A816;
}
.yes {
  color: #20A816;
  font-size: 12px;
}
.no {
  color: #F34E4E;
  font-size: 12px;
}
.em {
  color: #888;
}

.fi-bank-interest{
  color: rgb(175, 58, 4);
}

.img-header{
  width: 100%;
  margin-bottom: 10px;
}
table.tb-big, table.tb-big td {
    border: 1px #DEE2E6 solid;
}
.show-on-print-mode{
  visibility: hidden;
}
// .fi-empty:before{
//   content: '*'
// }
.fi-text-more {
  font-size: 12px;
}

div.fi-status{
  margin-bottom: 3px;
  padding-right: 3px;
  padding-left: 3px;
  margin-top: 5px;
  border-bottom: 1px gray solid;
}

.fi-status-no-underline{
  padding-right: 3px;
  padding-left: 3px;
  margin-top: 5px;
}

/* Custom radio button */
.fi-spacing{
  margin-right: 10px;
}
.fi-container {
  display: inline;
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.fi-container input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.fi-checkmark {
  position: absolute;
  top: 1px;
  left: 0;
  height: 18px;
  width:18px;
  background-color: $fi-primary;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.fi-container:hover input[type="radio"] ~ .fi-checkmark {
  background-color:  $fi-hover;
}

/* When the radio button is checked, add a blue background */
.fi-container input[type="radio"]:checked ~ .fi-checkmark {
  background-color:  $fi-primary;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.fi-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.fi-container input[type="radio"]:checked ~ .fi-checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.fi-container .fi-checkmark:after {
 	top: 4px;
	left: 4px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: white;
}
/* Custom radio button */

input.fi-bank-input-interest{
  margin-top: -1px;
  margin-bottom: 1px;
  border: 1px #20A816 solid;
  //border-left: 1px #DC4D39 solid;
  //border-bottom: 1px #DC4D39 dotted;
  padding-left: 5px;
  width: 150px;
  color: #20A816;
  //font-weight: bold;
  font-size: 14px;
}

input.fi-bank-input-interest:focus {
  outline: none;
}

/* Custom check box */
.fi-checkbox-container {
  position: relative;
  margin-right: 10px;
  padding-left: 30px;
  margin-bottom: 0px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.fi-checkbox-container input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.fi-checkbox-mark {
  position: absolute;
  top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #C72B2C;
}

.fi-checkbox-container:hover input[type="checkbox"] ~ .fi-checkbox-mark {
  background-color: rgb(245, 97, 97);
}

.fi-checkbox-container input[type="checkbox"]:checked ~ .fi-checkbox-mark {
  background-color: #C72B2C;
}

.fi-checkbox-mark:after {
  content: "";
  position: absolute;
  display: none;
}

.fi-checkbox-container input[type="checkbox"]:checked ~ .fi-checkbox-mark:after {
  display: inline;
}

.fi-checkbox-container .fi-checkbox-mark:after {
  left: 8px;
  top: 4px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
/* Custom check box */

table.tb-big {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
table.tb-small, table.tb-small tr{
  border: none;
}
table.tb-small{
  width: 100%; 
  background-color: white;
  margin-bottom: 10px;
  border-radius: 10px;
}
table.tb-small th, table.tb-small td {
  padding: 5px;
  border-bottom: 2px rgb(242, 243, 245) solid;
}
table.tb-small td.col-first{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
table.tb-small td.col-last{
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: none;
}
// table.tb-small tr{
//   border-bottom: 2px rgb(242, 243, 245) solid;
// }
// table.tb-small>tbody>tr>th {
//   background: rgb(243, 182, 174)
// }
// table.tb-small>tbody>tr>td {
//   background: rgb(243, 182, 174);
// }
.success{
  background: #20A816;
}
.success:hover{
    background: rgb(20, 104, 14);
}
.cancel {
  background: red;
}
.cancel:hover {
  background: rgb(250, 99, 11);
}
.reject {
  background: rgb(216, 96, 77);
}
.reject:hover {
  background: rgb(170, 68, 52);
}
.PENDING{
    color: rgb(250, 150, 0);
    font-weight: bold;
    font-family: Helvetica;
    /*text-shadow: 0 1px 0 white, 0 2px 0 white, 0 3px 0 rgb(250, 150, 0), 0 4px 0 rgb(250, 150, 0);*/
}
.EDIT{
  color: rgba(247, 82, 6, 0.959);
}
.EDITED{
  color: blue;
}
.REQUEST{
  color: #A8890C;
}
.REJECTED{
    color: #F34E4E;
}
.APPROVED{
    color: #20A816;
}
.SUCCESS {
    color: rgb(33, 145, 33);
}
.CANCEL {
    color: #C72B2C;
}
.REJECTED_50 {
    color: rgb(192, 192, 6);
}
span.signature, p.signature {    
    border-bottom: 1px dotted #000;
}
span.new-signature {
  border-bottom: 2px dotted $fi-primary;
}
.spacing{
  margin-right: 10px;
  margin-left: 10px;
}

.fi-print {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  top: 5px;
  right: 35px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.3rem;
  background-color: $fi-primary;
  &:hover {
    background-color: $fi-hover;
  }
  @media screen and (min-width: 760px) {
    font-size: 1rem;
    width: 2rem;
    height: 2rem;
    right: 45px;
  }
}
.REJECTED {
  color: #f34e4e;
}
.APPROVED {
  color: #20a816;
}
.closeIcon {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  top: 5px;
  right: 8px;
  color: white;
  font-weight: bold;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.3rem;
  background-color: $primary-color;
  &:hover {
    background-color: #e96f6f;
  }
  @media screen and (min-width: 760px) {
    font-size: 1rem;
    width: 2rem;
    height: 2rem;
    right: 10px;
  }
}

.fi-resend {
  position: absolute;
  cursor: pointer;
  top: 5px;
  right: 50px;
  color: gray;
  font-weight: bold;
}
.fi-resend:hover {
  color: #C72B2C;
}

.request {
    background: #FB8C00;
}
.success {
    color: rgb(9, 192, 9);
}
.rejected_50 {
    color: rgb(240, 240, 15);
}
.danger{
    font-size: 12px;
    color: red;
}
.danger:before{
    content: '* ';
}
.fi-btn{
    margin-top: 5px;
    margin-bottom: 10px;
    color: white;
    border: none;
    border-radius: 3px;
    width: 8rem;
    font-size: 1.2rem;
}

.request{
   background-color: $fi-primary;
    &:hover{
      background-color: $fi-hover;
    }
}

.edit {
  background-color: #96831c;
  &:hover{
    background-color: #bda93a
  }
}

button:focus{
    outline: none;
}
.inverst-background {
  top: 0px;
  left: 0px;
  z-index: 100;
  position: fixed;
  background: black;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
textarea{
    width: 100%;
    background: transparent;
    border: none;
    padding-left: 5px;
    padding-right: 5px;
    border-bottom: 2px dotted $secondary-color;
}
textarea:focus{
    outline: none;
}
.fi-scroll-y{
  position: fixed;
  z-index: 100;
  top: 10px;
  left: 15%;
  width: 70%;
  height: 100%;
  overflow-y: auto;
}
.fi_report_approve_dialog {
  background: white;
  border: 1px lightgrey solid;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
    -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
        box-shadow: 0.5px 0.5px 0.5px 0.5px #C72B2C;
  padding: 0.5rem;
}
.body {
  text-align: left;
}
.footer{
  text-align: right;
}

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
  background: #A42C35; 
}
#table_big{
  display: block;
}
#table_small{
  display: none;
}

@media only screen and (max-width: 1350px) {
    .fi-scroll-y{
      width: 80%;
      left: 10%;
    }
    #table_big{
      display: none;
    }
    #table_small{
      display: block;
    }
    .PENDING{
      color: #fa9600;
      font-weight: bold;
      font-family: Helvetica;
      /*text-shadow: 0 1px 0 rgb(250, 150, 0), 0 2px 0 rgb(250, 150, 0), 0 3px 0 rgb(250, 150, 0), 0 4px 0 white;*/
    }
    input.fi-bank-input-interest {
      width: 100%;
    }
}


@media only screen and (max-width: 900px) {
  
    .fi-scroll-y{
      top: 10px;
      left: 1%;
      width: 98%;
    }
    .fi-btn{
        width: 7.7rem;
    }
}
@media only screen and (max-width: 500px) {
  .fi-scroll-y{
    top: 5px;
  }
  h2{
    font-size: 25px;
  }
  .fi-btn{
      width: 6rem;
      font-size: 18px;
  }
  input.fi-bank-input-interest {
    width: 100%;
  }
}
@media only screen and (max-width: 400px) {
    h2{
      font-size: 22px;
    }
  .fi-btn{
      font-size: 14px;
      width: 5rem;
  }
  h4{
    font-size: 20px;
  }
}

@media only screen and (max-width: 320px) {
    h2{
      font-size: 18px;
    }
  .fi-btn{
      font-size: 14px;
      width: 5rem;
  }
  h4{
    font-size: 16px;
  }
}

@media print {
  .show-on-print-mode{
    visibility: initial;
  }
  .hide-on-print-mode {
    display: none;
  }
}
</style>
