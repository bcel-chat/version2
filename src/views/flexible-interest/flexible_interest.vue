<template>
  <div class="container">
    <div v-if="showPersonalConfirm">
      <div
        class="fi-inverst-signature-background"
        @click="cancelSignature()"
      ></div>
      <div
        class="fi-signature-dialog"
        :class="useSignature ? 'fi-choose-signature' : 'fi-choose-photo'"
      >
        <div class="fi-signature" v-if="useSignature">
          <div class="fi-signature-header">
            <h5>ລາຍເຊັນລູກຄ້າ</h5>
          </div>
          <div class="fi-signature-body">
            <VueSignaturePad
              width="100%"
              height="230px"
              saveType="image/svg+xml"
              class="signature-pad"
              ref="signaturePad"
              :options="{ penColor: 'blue', maxWidth: '0.6' }"
            />
          </div>
          <div class="fi-signature-footer">
            <span class="no-signature" v-if="checkSignatureError"
              >(ບໍ່ມີລາຍເຊັນ)</span
            >
            <button
              type="button"
              class="fi-btn-signature-cancel"
              @click="cancelSignature()"
            >
              ຍົກເລີກ
            </button>
            <button
              type="button"
              class="fi-btn-signature-clear"
              @click="clearSignature()"
            >
              ລ້າງ
            </button>
            <button
              type="button"
              class="fi-btn-signature-ok"
              @click="saveSignature()"
            >
              ຕົກລົງ
            </button>
          </div>
        </div>
        <div class="fi-take-photo" v-if="usePhoto">
          <div class="fi-take-photo-header">
            <h5>ຖ່າຍຮູບ</h5>
          </div>
          <div class="fi-take-photo-body">
            <vue-web-cam
              ref="webcam"
              :device-id="deviceId"
              width="100%"
              height="230px"
              @started="onStarted"
              @stopped="onStopped"
              @notsupported="notSupported"
              @error="onError"
              @cameras="onCameras"
              @camera-change="onCameraChange"
            />
            <span class="fi-not-supported" v-if="checkPhotoError"
              >Not Supported</span
            >
          </div>
          <div class="fi-take-photo-footer" v-if="checkPhotoError">
            <button
              type="button"
              class="fi-btn-take-photo-cancel"
              @click="cancelTakePhoto()"
            >
              ອອກ
            </button>
          </div>
          <div class="fi-take-photo-footer" v-if="!checkPhotoError">
            <button
              type="button"
              class="fi-btn-take-photo-cancel"
              @click="cancelTakePhoto()"
            >
              ຍົກເລີກ
            </button>
            <button
              type="button"
              class="fi-btn-take-photo-shoot"
              @click="takePhoto()"
            >
              ຖ່າຍ
            </button>
          </div>
        </div>
      </div>
    </div>
    <fi_dialog :config="fi_config" />
    <div class="row">
      <div class="interest-content">
        <div
          :class="[
            'input-group-box',
            error_validation['deposit_amount'].length > 0 ? 'err-input' : ''
          ]"
        >
          <div
            :class="[
              'fi-ico-box',
              error_validation['deposit_amount'].length > 0 ? 'err-ico' : ''
            ]"
          >
            <i class="far fa-money-bill-alt"></i>
          </div>
          <input
            id="m-amount"
            type="text"
            class="fi-input"
            v-model="customer_info['deposit_amount']"
            required
            @change="changeDepositAmountValue"
            @keyup="validateCustomerDepositAmount()"
          />
          <label for="fullname" class="control-label"
            >ຈຳນວນເງິນທີ່ຕ້ອງການຝາກ *</label
          >
        </div>
        <div
          :class="[
            'input-group-box',
            error_validation['currency'].length > 0 ? 'err-input' : ''
          ]"
        >
          <div
            :class="[
              'fi-ico-box',
              error_validation['currency'].length > 0 ? 'err-ico' : ''
            ]"
          >
            <i class="fas fa-coins"></i>
          </div>
          <select
            id="currency"
            :class="[
              'selection-box',
              customer_info['currency']['currencyId'] == 'none' ||
              !customer_info['currency']['currencyId']
                ? 'sel-color'
                : ''
            ]"
            v-model="customer_info['currency']['currencyId']"
            required
            @change="changeCurrencyValue"
          >
            <option class="opt1" value="none">none</option>
            <option
              v-for="(currency, index) in currencies"
              :key="index"
              :value="currency['currencyId']"
              >{{ currency["currencyNameLa"] }} ({{
                currency["currencyCode"]
              }})</option
            >
          </select>
          <label for="curr" class="control-label-option"
            >ເລືອກສະກຸນເງິນ *</label
          >
        </div>
        <div
          :class="[
            'input-group-box',
            error_validation['currency'].length > 0 ? 'err-input' : ''
          ]"
        >
          <div
            :class="[
              'fi-ico-box',
              error_validation['currency'].length > 0 ? 'err-ico' : ''
            ]"
          >
            <i class="far fa-clock"></i>
          </div>
          <select
            id="deposit_age"
            :class="[
              'selection-box',
              customer_info['deposit_age']['typeId'] == 'none' ||
              !customer_info['deposit_age']['typeId']
                ? 'sel-color'
                : ''
            ]"
            v-model="customer_info['deposit_age']['typeId']"
            required
            @change="changeDepositAge"
          >
            <option class="opt1" value="none">none</option>
            <option
              v-for="(depositType, index) in depositTypes"
              :key="index"
              :value="depositType['typeId']"
              >{{ depositType["typeName"] }}</option
            >
          </select>
          <label for="deposit_age" class="control-label-option"
            >ເລືອກໄລຍະຝາກເງິນ *</label
          >
        </div>
        <div
          :class="[
            'input-group-box',
            error_validation['aclass'].length > 0 ? 'err-input' : ''
          ]"
        >
          <div
            :class="[
              'fi-ico-box',
              error_validation['aclass'].length > 0 ? 'err-ico' : ''
            ]"
          >
            <i class="fas fa-stopwatch"></i>
          </div>
          <select
            id="deposit_age"
            :class="[
              'selection-box',
              customer_info['aclass'] == 'none' ||
              !customer_info['aclass'] ||
              !customer_info['aclass']['descriptionLao']
                ? 'sel-color'
                : ''
            ]"
            v-model="customer_info['aclass']"
            @change="aclassSelection"
            required
          >
            <option class="opt1" value="none" @click="aclassSelection({})"
              >none</option
            >
            <option
              v-for="(aclass, index) in aclasses"
              :key="index"
              :value="aclass"
              >{{ aclass["descriptionLao"] }}</option
            >
          </select>
          <label for="deposit_age" class="control-label-option"
            >ເລືອກໄລຍະຮັບດອກເບ້ຍ *</label
          >
        </div>
        <div class="input-group-box">
          <div class="fi-ico-box">
            <i class="fas fa-money-check-alt"></i>
          </div>
          <span
            v-if="customer_info['normal_interest'] != 0.0"
            class="number-text"
            >{{
              Number(customer_info["normal_interest"]).toLocaleString(
                undefined,
                { minimumFractionDigits: 1, maximumFractionDigits: 3 }
              )
            }}%</span
          >
          <label class="control-label-number">ອັດຕາດອກເບ້ຍປົກກະຕິ</label>
        </div>
        <div class="input-group-box">
          <div class="fi-ico-box">
            <i class="fas fa-hand-holding-usd"></i>
          </div>
          <span
            v-if="customer_info['earning_general_interest'] != 0.0"
            class="number-text"
            >{{
              customer_info["currency"]["currencyCode"] == "USD"
                ? customer_info["currency"]["currencyUnit"]
                : ""
            }}{{
              Number(customer_info["earning_general_interest"]).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 3
                }
              )
            }}{{
              customer_info["currency"]["currencyCode"] != "USD"
                ? customer_info["currency"]["currencyUnit"]
                : ""
            }}</span
          >
          <label class="control-label-number"
            >ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ/ປີ</label
          >
        </div>
        <div class="input-group-box">
          <div
            class="fi-ico-box"
            role="button"
            @click="visible ? (visible = false) : (visible = true)"
          >
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <span
            v-if="customer_info['earning_general_interest'] != 0.0 && visible"
            class="number-text"
            >{{ customer_info["max_flexible"] }}%</span
          >
          <label class="control-label-number">ອັດຕາດອກເບ້ຍຍືດຫຍຸ່ນສູງສຸດ</label>
        </div>
        <div
          :class="[
            'input-group-box',
            error_validation['customer_interest'].length > 0 ? 'err-input' : ''
          ]"
        >
          <div
            :class="[
              'fi-ico-box',
              error_validation['customer_interest'].length > 0 ? 'err-ico' : ''
            ]"
          >
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <input
            id="m-number"
            type="number"
            class="fi-input number"
            v-model="customer_info['customer_interest']"
            required
            @change="changeDepositAmountValue"
            @keyup="validateCustomerInterest()"
            step="0.01"
          />
          <label for="m-number" class="control-label"
            >ອັດຕາດອກເບ້ຍຍືດຫຍຸ່ນ(%) *</label
          >
          <div class="fi-exceeded" v-if="toggleMaxFlexible">
            <span class="danger" v-if="getExceededOutFlexible()"
              >(ຍືດຫຍຸ່ນເກີນ​ {{ getExceededOutFlexible() }}%)</span
            >
            <span class="success" v-if="getExceededInFlexible()"
              >(ຍືດຫຍຸ່ນໃນກອບ {{ getExceededInFlexible() }}%)</span
            >
          </div>
        </div>
        <div class="input-group-box">
          <div class="fi-ico-box">
            <i class="fas fa-hand-holding-usd"></i>
          </div>
          <span v-if="getEarningPerYear() != 0.0" class="number-text"
            >{{
              customer_info["currency"]["currencyCode"] == "USD"
                ? customer_info["currency"]["currencyUnit"]
                : ""
            }}{{ getEarningPerYear()
            }}{{
              customer_info["currency"]["currencyCode"] != "USD"
                ? customer_info["currency"]["currencyUnit"]
                : ""
            }}</span
          >
          <label class="control-label-number">ດອກເບ້ຍທີ່ລູກຄ້າຈະໄດ້ຮັບ</label>
        </div>
        <div class>
          <div class="btn-control-box">
            <div class="fi-btn-box pd-right">
              <button
                class="fi-btn-choose-signature"
                @click="openSignatureDialog()"
              >
                ລາຍເຊັນ
              </button>
            </div>
            <div class="fi-btn-box pd-left">
              <button
                class="fi-btn-choose-photo"
                @click="openTakePhotoDialog()"
              >
                ຖ່າຍຮູບ
              </button>
              <div class="fi-img-panel" v-if="customer_signature || img">
                <span class="closeIcon" @click="clearUserConfirm()"
                  >&#215;</span
                >
                <img
                  v-if="customer_signature"
                  :src="customer_signature"
                  alt="Customer Signature"
                />
                <img v-else-if="img" :src="img" alt="Customer Photo" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left">
        <button class="fi-btn-next" type="button" @click="backwardProgress()">
          &#8592;
        </button>
      </div>
      <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">
        <button class="fi-btn-next" type="button" @click="doNext()">
          ຕໍ່ໄປ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/flexible_interest/fonts/phetsarath_font.css";
import axios from "axios";
import address from "@/helper/server_address.js";
import fi_dialog from "@/components/flexible-interest/fi_dialog.vue";
import { WebCam } from "vue-cam-vision";

import Vue from "vue";
import VueSignaturePad from "vue-signature-pad";

Vue.use(VueSignaturePad);
//Vue.use(WebCam);

import ds from "@/helper/ds.js";
import { setTimeout } from "timers";

export default {
  name: "flexible_interest",
  components: {
    fi_dialog: fi_dialog,
    "vue-web-cam": WebCam
  },
  data() {
    return {
      visible: true,
      show: false,
      hover: false,
      showPersonalConfirm: false,
      useSignature: false,
      customer_signature: "",
      checkSignatureError: false,
      usePhoto: false,
      img: "",
      camera: null,
      deviceId: null,
      devices: [],
      checkWebcam: true,
      checkPhotoError: false,
      num: 7,
      toggleMaxFlexible: true,
      checkLimitedFlexible: false,
      currencies: [],
      depositTypes: [],
      aclasses: [],
      customer_info: this.$store.getters[
        "flexible_interest_module/requirement"
      ],
      error_validation: {
        currency: [],
        customer_interest: [],
        deposit_amount: [],
        aclass: [],
        deposit_age: []
      },
      fi_config: {
        show: false,
        title: "Warning",
        message: "ຖ່າຍຮູບບໍ່ Support ກັບອຸປະກອນນີ້",
        buttons: [
          {
            text: "OK",
            action: () => {
              this.fi_config["show"] = false;
            }
          }
        ]
      }
    };
  },
  computed: {
    device: function() {
      //console.log("Computed");
      return this.devices.find(n => n.deviceId === this.deviceId);
    }
  },
  watch: {
    camera: function(id) {
      //console.log("Watch camera", id);
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (this.devices.length > 0) {
        this.camera = this.devices[this.devices.length - 1]["deviceId"];
        this.deviceId = this.devices[this.devices.length - 1]["deviceId"];
        //console.log("Watch device", this.devices);
        //console.log(this.deviceId)
      }
    }
  },
  created() {
    if (window.sessionStorage.getItem("actionProgress")) {
      var stepAction = JSON.parse(
        window.sessionStorage.getItem("actionProgress")
      );
      if (!stepAction[2]["active"]) {
        for (var i = 0; i < stepAction.length; i++) {
          if (!stepAction[i]["active-after"]) {
            if (i == 0) {
              this.$router.push({
                path:
                  this.$store.getters["flexible_interest_module/root"] +
                  "/flexible/staff/progress/info"
              });
            } else if (i == 1) {
              this.$router.push({
                path:
                  this.$store.getters["flexible_interest_module/root"] +
                  "/flexible/staff/progress/product"
              });
            } else if (i == 2) {
              this.$router.push({
                path:
                  this.$store.getters["flexible_interest_module/root"] +
                  "/flexible/staff/progress/interest"
              });
            } else if (i == 3) {
              this.$router.push({
                path:
                  this.$store.getters["flexible_interest_module/root"] +
                  "/flexible/staff/progress/document/attach"
              });
            } else if (i == 4) {
              this.$router.push({
                path:
                  this.$store.getters["flexible_interest_module/root"] +
                  "/flexible/staff/progress/interest/approve"
              });
            }
            break;
          }
        }
      } else {
        ds.rpc.make(
          "/bcel/chat/api/flexible/interest/info",
          {},
          (error, result) => {
            if (result) {
              this.currencies = result["currencies"];
              this.depositTypes = result["depositTypes"];
            }
          }
        );
      }
    } else {
      this.$root.$emit("resetDefault");
      this.$router.push({
        path:
          this.$store.getters["flexible_interest_module/root"] +
          "/flexible/staff/progress/info"
      });
    }
  },
  mounted() {
    this.getAClasses();
  },
  methods: {
    changeDepositAmountValue() {
      //       if(!this.customer_info['deposit_amount']){
      //         this.customer_info['currency'] = {
      //             currencyId: ""
      //         }
      //         this.customer_info['deposit_age'] = {
      //             typeId: ""
      //         },
      //         this.customer_info['aclass'] = {
      //             descriptionLao: ''
      //         },
      //         this.aclasses = [];
      //     }
      this.getMaxFlexibleInterest();
    },
    validateCustomerDepositAmount() {
      if (this.customer_info["deposit_amount"].trim()) {
        if (
          this.error_validation["deposit_amount"].indexOf("ເງິນຝາກຫ້າມວ່າງ") >=
          0
        ) {
          this.error_validation["deposit_amount"].splice(
            this.error_validation["deposit_amount"].indexOf("ເງິນຝາກຫ້າມວ່າງ")
          );
        }
        var floating = this.customer_info["deposit_amount"].trim().split(",");
        var amount = floating[0].replace(/\./g, "");
        if (
          isNaN(amount) ||
          isNaN(floating.length == 2 ? (floating[1] ? floating[1] : 0) : 0) ||
          floating.length > 2
        ) {
          if (
            this.error_validation["deposit_amount"].indexOf(
              "ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ"
            ) < 0
          ) {
            this.error_validation["deposit_amount"].push(
              "ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ"
            );
          }
          return false;
        } else if (
          this.error_validation["deposit_amount"].indexOf(
            "ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ"
          ) >= 0
        ) {
          this.error_validation["deposit_amount"].splice(
            this.error_validation["deposit_amount"].indexOf(
              "ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ"
            )
          );
        }
        var amount = parseFloat(floating[0].replace(/\./g, ""));
        this.customer_info["deposit_amount"] = Number(amount)
          .toLocaleString()
          .replace(/,/g, ".");
        this.customer_info["deposit_amount"] +=
          floating.length == 2 ? "," + floating[1] : "";
      } else {
        if (
          this.error_validation["deposit_amount"].indexOf(
            "ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ"
          ) >= 0
        ) {
          this.error_validation["deposit_amount"].splice(
            this.error_validation["deposit_amount"].indexOf(
              "ເງິນຝາກຄວນເປັນຕົວເລກເທົ່ານັ້ນ"
            )
          );
        }
        if (
          this.error_validation["deposit_amount"].indexOf("ເງິນຝາກຫ້າມວ່າງ") < 0
        ) {
          this.error_validation["deposit_amount"].push("ເງິນຝາກຫ້າມວ່າງ");
        }
        return false;
      }
      return true;
    },
    getDepositAmount() {
      if (this.customer_info["deposit_amount"].trim()) {
        var floating = this.customer_info["deposit_amount"].trim().split(",");
        var amount = floating[0].replace(/\./g, "");
        if (
          isNaN(amount) ||
          isNaN(floating.length == 2 ? (floating[1] ? floating[1] : 0) : 0) ||
          floating.length > 2
        ) {
          return 0;
        }
        var amount = parseFloat(floating[0].replace(/\./g, ""));
        return Number.parseFloat(amount);
      } else {
        return 0;
      }
    },
    changeCurrencyValue() {
      if (this.customer_info["currency"]["currencyId"].trim()) {
        for (var i = 0; i < this.currencies.length; i++) {
          if (
            this.currencies[i]["currencyId"] ==
            this.customer_info["currency"]["currencyId"].trim()
          ) {
            for (var key in this.currencies[i]) {
              this.customer_info["currency"][key] = this.currencies[i][key];
            }
            break;
          }
        }
      }
      this.validateCurrency();
      this.getMaxFlexibleInterest();
      this.getGeneralInterest();
    },
    validateCurrency() {
      if (!this.customer_info["currency"]["currencyId"].trim()) {
        if (this.error_validation["currency"].length == 0) {
          this.error_validation["currency"].push("ເລືອກສະກຸນເງິນ");
        }
        return false;
      } else if (this.error_validation["currency"].length > 0) {
        this.error_validation["currency"].pop();
      }
      return true;
    },
    aclassSelection(e) {
      this.validateAClass();
      this.getGeneralInterest();
      this.getMaxFlexibleInterest();
    },
    dropdownAcive(aclass) {
      if (this.customer_info["aclass"]["accountClass"]) {
        if (
          this.customer_info["aclass"]["accountClass"] == aclass["accountClass"]
        ) {
          return "fi-dropdown-active";
        }
      }
      return "";
    },
    validateAClass() {
      if (!this.customer_info["aclass"]["accountClass"]) {
        if (this.error_validation["aclass"].length == 0) {
          this.error_validation["aclass"].push("ເລືອກໄລຍະຮັບດອກເບ້ຍ");
        }
        return false;
      } else if (this.error_validation["aclass"].length > 0) {
        this.error_validation["aclass"].pop();
      }
      return true;
    },
    getGeneralInterest() {
      if (
        this.validateCustomerDepositAmount() &&
        this.validateCurrency() &&
        this.validateDepositAge() &&
        this.customer_info["aclass"]["accountClass"]
      ) {
        // ds.rpc.make('/bcel/api/flexible/interest/general', { currencyCode:  this.customer_info['currency']['currencyCode'].trim(), acClass: this.customer_info['aclass']['accountClass']}, ( error, result ) => {
        //     if(error){
        //         this.customer_info['normal_interest'] = 0;
        //     } else{
        //         if(result){
        //             this.customer_info['normal_interest'] = result['interest'];
        //         } else {
        //             this.customer_info['normal_interest'] = 0;
        //         }
        //     }
        //     console.log(error)
        //     this.customer_info['customer_interest'] = this.customer_info['normal_interest'].toString();
        // });
        //console.log(address['serverIp'] + '/bcel/api/flexible/interest/normal/'+this.customer_info['aclass']['accountClass']+'/'+this.customer_info['currency']['currencyCode'].trim()+'/0000')
        axios
          .get(
            address["serverIp"] +
              "/bcel/api/flexible/interest/normal/" +
              this.customer_info["aclass"]["accountClass"] +
              "/" +
              this.customer_info["currency"]["currencyCode"].trim() +
              "/0000"
          )
          .then(res => {
            this.customer_info["normal_interest"] =
              res["data"]["data"]["interest"];
            this.customer_info["customer_interest"] = this.customer_info[
              "normal_interest"
            ].toString();
          })
          .catch(error => {
            this.customer_info["normal_interest"] = "0";
            this.customer_info["customer_interest"] = this.customer_info[
              "normal_interest"
            ].toString();
          });
      } else {
        this.customer_info["normal_interest"] = 0;
        this.customer_info["customer_interest"] = "0";
      }
    },
    getEarningPerYear() {
      if (
        this.customer_info["deposit_amount"] &&
        this.customer_info["currency"]["currencyCode"] &&
        this.customer_info["deposit_age"]["typeId"]
      ) {
        this.customer_info["earning_general_interest"] =
          this.getDepositAmount() *
          (this.customer_info["normal_interest"] / 100) *
          (this.customer_info["deposit_age"]["totalDays"] / 360);
        this.customer_info["earning_customer_interest"] =
          this.getDepositAmount() *
          (this.customer_info["customer_interest"] / 100) *
          (this.customer_info["deposit_age"]["totalDays"] / 360);
        return Number(
          this.customer_info["earning_customer_interest"].toString()
        ).toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 3
        });
      } else {
        return 0;
      }
    },
    changeDepositAge() {
      if (this.customer_info["deposit_age"]["typeId"].trim()) {
        for (var i = 0; i < this.depositTypes.length; i++) {
          if (
            this.depositTypes[i]["typeId"] ==
            this.customer_info["deposit_age"]["typeId"].trim()
          ) {
            this.customer_info["deposit_age"]["typeName"] = this.depositTypes[
              i
            ]["typeName"];
            this.customer_info["deposit_age"]["totalDays"] = this.depositTypes[
              i
            ]["totalDays"];
            break;
          }
        }
      }
      this.getAClasses();
      this.customer_info["aclass"] = "";
      this.validateDepositAge();
      this.getMaxFlexibleInterest();
      this.getGeneralInterest();
    },
    getAClasses() {
      if (this.customer_info["deposit_age"]["typeId"].trim()) {
        ds.rpc.make(
          "/bcel/chat/api/flexible/interest/aclass",
          {
            depositAge: this.customer_info["deposit_age"]["typeId"].trim(),
            customerType: this.customer_info["type"]
          },
          (error, result) => {
            if (error) {
              this.aclasses = [];
            } else {
              this.aclasses = result;
            }
          }
        );
      } else {
        this.aclasses = [];
      }
    },
    getMaxFlexibleInterest() {
      if (
        this.validateCustomerDepositAmount() &&
        this.validateCurrency() &&
        this.validateDepositAge()
      ) {
        ds.rpc.make(
          "/bcel/chat/api/flexible/interest/max/flexible",
          {
            currencyId: this.customer_info["currency"]["currencyId"].trim(),
            customerDeposit: this.customer_info["deposit_amount"]
              .trim()
              .replace(/\./g, ""),
            depositTypeId: this.customer_info["deposit_age"]["typeId"].trim()
          },
          (error, result) => {
            if (error) {
              this.customer_info["max_flexible"] = 0;
              this.customer_info["flexible_interest_id"] = "";
            } else {
              if (result["maxFlexible"]) {
                this.customer_info["max_flexible"] = result["maxFlexible"];
                this.customer_info["flexible_interest_id"] =
                  result["flexibleInterestId"];
              } else {
                this.customer_info["max_flexible"] = 0;
                this.customer_info["flexible_interest_id"] = "";
              }
            }
            this.$store.commit("flexible_interest_module/changeMaxFlexible", {
              max: this.customer_info["max_flexible"]
            });
            //this.getGeneralInterest();
          }
        );
      }
    },
    validateDepositAge() {
      if (!this.customer_info["deposit_age"]["typeId"].trim()) {
        if (this.error_validation["deposit_age"].length == 0) {
          this.error_validation["deposit_age"].push("ເລືອກໄລຍະຝາກເງິນ");
        }
        return false;
      } else if (this.error_validation["deposit_age"].length > 0) {
        this.error_validation["deposit_age"].pop();
      }
      return true;
    },
    validateCustomerInterest() {
      /*if(this.customer_info['customer_interest'].trim()){
                if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຫຍຸ່ນຫ້າມວ່າງ') >= 0) {
                    this.error_validation['customer_interest'].splice(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຫຍຸ່ນຫ້າມວ່າງ'));
                }
                var floating = this.customer_info['customer_interest'].trim().split(',')
                var amount = floating[0].replace(/\./g,'');
                if(isNaN(amount) || isNaN((floating.length == 2)? (floating[1])?floating[1]:0:0) || (floating.length > 2)){
                    if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຫຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ') < 0){
                        this.error_validation['customer_interest'].push('ດອກເບ້ຍຍືດຫຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ');
                    }
                    return false;
                } else if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຫຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ') >= 0) {
                    this.error_validation['customer_interest'].splice(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຫຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ'));
                }
                var amount = parseFloat(floating[0].replace(/\./g, ''))
                this.customer_info['customer_interest'] = Number(amount).toLocaleString().replace(/,/g, '.');
                this.customer_info['customer_interest'] += (floating.length == 2)?',' + floating[1]:'';
            } else {
                if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຫຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ') >= 0) {
                    this.error_validation['customer_interest'].splice(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຫຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ'));
                }
                if(this.error_validation['customer_interest'].indexOf('ດອກເບ້ຍຍືດຫຍຸ່ນຫ້າມວ່າງ') < 0) {
                    this.error_validation['customer_interest'].push('ດອກເບ້ຍຍືດຫຍຸ່ນຫ້າມວ່າງ');
                }
                return false;
            }*/
      if (isNaN(this.customer_info["customer_interest"].trim())) {
        if (
          this.error_validation["customer_interest"].indexOf(
            "ດອກເບ້ຍຍືດຫຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ"
          ) < 0
        ) {
          this.error_validation["customer_interest"].push(
            "ດອກເບ້ຍຍືດຫຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ"
          );
        }
        this.getExceededOutFlexible();
        return false;
      } else if (
        this.error_validation["customer_interest"].indexOf(
          "ດອກເບ້ຍຍືດຫຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ"
        ) >= 0
      ) {
        this.error_validation["customer_interest"].splice(
          this.error_validation["customer_interest"].indexOf(
            "ດອກເບ້ຍຍືດຫຍຸ່ນຄວນເປັນຕົວເລກເທົ່ານັ້ນ"
          )
        );
      }
      return true;
    },
    hoverDropdownPanel() {
      this.hover = true;
    },
    unhoverDropdownPanel() {
      this.hover = false;
      this.show = false;
    },
    setHideShowMaxFlexible(number, check) {
      this.num = number;
      this.toggleMaxFlexible = check;
    },
    getExceededOutFlexible() {
      try {
        var customer_interest = parseFloat(
          this.customer_info["customer_interest"]
        );
        var max_interest =
          parseFloat(this.customer_info["normal_interest"]) +
          parseFloat(this.customer_info["max_flexible"]);
        if (customer_interest > max_interest) {
          return (customer_interest - max_interest).toLocaleString();
        } else {
          return 0;
        }
      } catch (e) {
        return 0;
      }
    },
    getExceededInFlexible() {
      try {
        var customer_interest = parseFloat(
          this.customer_info["customer_interest"]
        );
        var normal_interest = parseFloat(this.customer_info["normal_interest"]);
        var max_interest =
          normal_interest + parseFloat(this.customer_info["max_flexible"]);
        if (
          customer_interest <= max_interest &&
          customer_interest > normal_interest
        ) {
          return (customer_interest - normal_interest).toLocaleString();
        } else {
          return 0;
        }
      } catch (e) {
        return 0;
      }
    },
    onStarted(stream) {
      // if(this.checkWebcam){
      //   this.onStop();
      //   this.checkWebcam = false;
      // }
    },
    onStopped(stream) {},
    onStop() {
      if (this.$refs.webcam) this.$refs.webcam.stop();
    },
    notSupported() {
      this.checkPhotoError = true;
    },
    clearUserConfirm() {
      this.customer_signature = "";
      this.img = "";
    },
    onStart() {
      if (this.$refs.webcam) {
        this.$refs.webcam.start();
      } /*else {
            this.fi_config = {
                show: true,
                title: 'Warning',
                message: 'ຂໍອະໄພ? ຖ່າຍຮູບບໍ່ Support ກັບອຸປະກອນນີ້',
                buttons: [
                    {
                        text: 'OK',
                        action: () => {
                            this.fi_config['show'] = false;
                        }
                    }
                ]
            }
        }*/
    },
    onError(error) {
      this.checkPhotoError = true;
    },
    onCameras(cameras) {
      this.devices = cameras;
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
    },
    cancelTakePhoto() {
      this.showPersonalConfirm = false;
      this.usePhoto = false;
      this.checkPhotoError = false;
      this.img = null;
      this.onStop();
    },
    async takePhoto() {
      this.img = await this.$refs.webcam.capture();
      this.onStop();
      this.showPersonalConfirm = false;
      this.usePhoto = false;
      this.customer_signature = "";
    },
    openTakePhotoDialog() {
      this.showPersonalConfirm = true;
      this.usePhoto = true;
      if (this.checkWebcam) {
        this.checkWebcam = false;
      } else {
        setTimeout(() => {
          this.onStart();
        }, 10);
      }
    },
    openSignatureDialog() {
      this.showPersonalConfirm = true;
      this.useSignature = true;
    },
    cancelSignature() {
      this.$refs.signaturePad.clearSignature();
      this.$refs.signaturePad.clearCacheImages();
      this.customer_signature = "";
      this.showPersonalConfirm = false;
      this.useSignature = false;
      this.checkSignatureError = false;
    },
    clearSignature() {
      this.$refs.signaturePad.clearSignature();
    },
    saveSignature() {
      this.customer_signature = this.$refs.signaturePad.saveSignature()["data"];
      if (this.customer_signature) {
        this.showPersonalConfirm = false;
        this.useSignature = false;
        this.checkSignatureError = false;
        this.img = "";
      } else {
        this.checkSignatureError = true;
      }
    },
    doNext() {
      if (
        this.validateCustomerDepositAmount() &&
        this.validateCurrency() &&
        this.validateAClass() &&
        this.validateDepositAge() &&
        this.validateCustomerInterest()
      ) {
        this.customer_info["customer_signature"] = this.customer_signature;
        this.customer_info["customer_photo"] = this.img;
        this.$store.commit("flexible_interest_module/addCustomerRequirement", {
          info: this.customer_info
        });
        window.sessionStorage.setItem(
          "requirement",
          JSON.stringify(this.customer_info)
        );
        this.$store.commit("flexible_interest_module/addProgressActionActive", {
          index: 2,
          key: "active-after",
          val: "stepper-active-after"
        });
        this.$store.commit("flexible_interest_module/addProgressActionActive", {
          index: 3,
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
            "/flexible/staff/progress/document/attach"
        });
      } else {
        this.validateCustomerDepositAmount();
        this.validateCurrency();
        this.validateAClass();
        this.validateDepositAge();
        this.validateCustomerInterest();
      }
    },
    backwardProgress() {
      this.$router.push({
        path:
          this.$store.getters["flexible_interest_module/root"] +
          "/flexible/staff/progress/product"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.interest-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1rem;
}

.input-group-box {
  position: relative;
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding-right: 0.5rem;
  flex: 1 1 auto;
  border-radius: 0.5rem;
  border: solid 1px #a2afb8;
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
    font-weight: 600;
    // border-radius: 0 0.5rem 0.5rem 0;
  }

  .number {
    color: $fi-primary;
    font-weight: 900;
    font-size: 20px;
    text-align: right;
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

  .selection-box {
    flex: 1 1 auto;
    position: relative;
    background-color: transparent;
    border: none;
    outline: none;
    height: 100%;
    .opt1 {
      color: $secondary-color;
    }
    option {
      color: #000000;
      border: $fi-primary;
      border-radius: 0.5rem;
      &:hover {
        background-color: $fi-primary;
      }
    }
  }
  .sel-color {
    color: transparent;
  }

  .sel-color + .control-label-option {
    position: absolute;
    transform: translate(3.1rem, 0);
  }

  .control-label-option {
    position: absolute;
    transform: translate(0.2rem, -2.1rem);
    pointer-events: none;
    transition: 0.2s;
  }

  .number-text {
    flex: 1 1 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #207a09;
    font-weight: 900;
    font-size: 20px;
  }
  .number-text + .control-label-number {
    position: absolute;
    transform: translate(0.2rem, -2.1rem);
  }
  .control-label-number {
    position: absolute;
    transform: translate(3.1rem, 0);
    pointer-events: none;
    transition: 0.2s;
  }
}

.signature-pad {
  -webkit-box-shadow: inset -2px 2px 13px -1px rgba(0, 0, 0, 0.52);
  -moz-box-shadow: inset -2px 2px 13px -1px rgba(0, 0, 0, 0.52);
  box-shadow: inset -2px 2px 13px -1px rgba(0, 0, 0, 0.52);
  margin-bottom: 3px;
  color: blue;
}
.no-signature {
  font-size: 14px;
  color: #ee3024;
}
.fi-toggle {
  position: absolute;
  left: 0px;
  top: 10px;
  cursor: pointer;
  width: auto;
}
span.fi-dropdown-icon {
  position: absolute;
  font-size: 8px;
  top: 13px;
  right: 3px;
  cursor: pointer;
}
div#fomular_panel {
  position: relative;
}
div#fomular {
  top: 50%;
  margin-top: -210px;
  left: 30px;
  position: absolute;
  color: white;
}
div#fi-fomular {
  visibility: hidden;
  display: none;
}
.fi-exceeded {
  position: absolute;
  top: -1.6rem;
  right: 0;
  padding-left: 0.5rem;
  font-size: 1rem;
  background-color: white;
  .success {
    color: #20a816;
  }
  .danger {
    color: red;
  }
}
.danger:before,
.success:before {
  content: "* ";
}
.fi-img-panel {
  position: relative;
  border: 2px rgb(236, 130, 130) solid;
  img {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
.closeIcon {
  position: absolute;
  cursor: pointer;
  top: -2px;
  right: 3px;
  font-size: 20px;
  color: red;
  font-weight: bold;
  z-index: 10;
}
.closeIcon:hover {
  color: #c72b2c;
}
.fi-inverst-signature-background {
  top: 0px;
  left: 0px;
  z-index: 100;
  position: fixed;
  background: black;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.fi-choose-signature {
  margin-top: -150px;
}
.fi-choose-photo {
  //margin-top: -15%;
  margin-top: -150px;
}
.fi-signature-dialog {
  position: fixed;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  color: rgb(165, 164, 164);
  z-index: 100;
  background: white; //linear-gradient(to bottom right, rgba(243, 195, 189, 0.918) 10%, rgb(202, 86, 94) 200%);
  border: 1px lightgrey solid;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #c72b2c;
  -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #c72b2c;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #c72b2c;
  padding: 5px;
  width: 300px;
  min-height: 300px;
  height: auto;
}
.fi-signature-header,
.fi-signature-body,
.fi-take-photo-header,
.fi-take-photo-body {
  text-align: left;
}
.fi-take-photo-body {
  position: relative;
}
.fi-not-supported {
  position: absolute;
  font-size: 30px;
  left: 45px;
  top: 80px;
}
.fi-signature-footer,
.fi-take-photo-footer {
  text-align: right;
}
.fi-btn-signature-ok,
.fi-btn-take-photo-ok {
  margin-left: 5px;
  background: #20a816;
  color: white;
  border: none;
  border-radius: 3px;
  width: 5rem;
  font-size: 1rem;
}
.fi-btn-signature-clear,
.fi-btn-take-photo-clear {
  margin-left: 5px;
  background: rgb(250, 127, 123);
  color: white;
  border: none;
  border-radius: 3px;
  width: 5rem;
  font-size: 1rem;
}
.fi-btn-take-photo-shoot {
  margin-left: 5px;
  background: rgb(93, 144, 252);
  color: white;
  border: none;
  border-radius: 3px;
  width: 5rem;
  font-size: 1rem;
}
.fi-btn-signature-cancel,
.fi-btn-take-photo-cancel {
  margin-left: 5px;
  background: #ee3024;
  color: white;
  border: none;
  border-radius: 3px;
  width: 5rem;
  font-size: 1rem;
}

.btn-control-box {
  display: flex;
  justify-content: space-between;

  .fi-btn-box {
    flex: 0 0 50%;
  }
}
.pd-left {
  padding-left: 1rem;
}
.pd-right {
  padding-right: 1rem;
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
}
.fi-btn-choose-signature,
.fi-btn-choose-photo {
  margin-top: 5px;
  margin-bottom: 10px;
  background: $fi-primary;
  color: white;
  border: 1px $fi-primary solid;
  border-radius: 3px;
  width: 100%;
  font-size: 1.2rem;
  padding: 3px;
}
.fi-btn-next:hover {
  background: $fi-hover;
}
div.error-message {
  position: absolute;
  left: 12%;
  top: 54px;
}
.interest-title {
  font-size: 3rem;
}
</style>
