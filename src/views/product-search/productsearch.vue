<template>
  <div id="product-search">
    <div class="_control">
      <div class="control-box">
        <form @submit.prevent="searchData()">
          <input
            class="ps-input-search"
            placeholder="Enter account number here"
            type="text"
            autofocus
            v-model="accountSearch"
          />
        </form>
      </div>
      <div class="clear-box" v-if="btnClear">
        <div class="clear" @click="clear">Clear</div>
        <div class="search" @click="searchData()">Search</div>
      </div>
    </div>
    <div class="blank-page">
      <span v-if="!product">Empty</span>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-12 col-lg-12 col-xl-12 products" v-if="!showLoading">
          <div class="text-left" v-html="product"></div>
        </div>
        <div class="fi-box" v-else>
          <div class="fi-loading text-center">
            <img
              class="img-loader-out"
              src="@/assets/flexible_interest/images/loader.gif"
              alt="Loader"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import address from "@/helper/server_address.js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/flexible_interest/fonts/phetsarath_font.css";
export default {
  name: "product_search",
  data() {
    return {
      showLoading: false,
      accountSearch: "",
      product: "",
      btnClear: false
    };
  },
  watch: {
    accountSearch(val) {
      if (!val) {
        this.product = "";
        this.btnClear = false;
      } else {
        this.btnClear = true;
      }
    }
  },
  methods: {
    searchData() {
      if (!this.accountSearch.trim()) {
        return;
      }
      this.showLoading = true;
      axios
        .get(
          address["serverIp"] +
            "/bcel/api//products/search/" +
            this.accountSearch +
            "/html"
        )
        .then(res => {
          var product = res["data"]["data"];
          var result = product
            .replace(/img\//g, "/chat/img/")
            .replace(/<\/h2>/g, "</h2>\n")
            .replace(/body \{/g, ".kjdkfjd {")
            .replace(/label/g, ".mndmf")
            .replace(/<link.*\/>/g, "")
            .replace(/<script.*<\/script>/g, "");
          this.product = result;
          this.showLoading = false;
        })
        .catch(error => {
          this.product = "";
          this.showLoading = false;
        });
    },
    clear() {
      this.product = "";
      this.accountSearch = "";
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  font-family: Phetsarath_OT;
}

._control {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: solid 1px rgb(228, 228, 228);
  box-shadow: 0px 3px 6px -3px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  z-index: 1;
  .clear-box {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    .clear {
      position: relative;
      color: #ef5353;
      margin-left: 1rem;
      &:hover {
        color: #ee7b7b;
      }
      &:active {
        color: #ef5353;
      }
    }
    .search {
      position: relative;
      color: #3660ec;
      margin-left: 1rem;
      &:hover {
        color: #5d7fec;
      }
      &:active {
        color: #3660ec;
      }
    }
  }
}

.control-box {
  flex: 1 1 auto;
  input[type="text"] {
    border: none;
    outline: none;
    width: 100%;
  }
}

.fi-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  .fi-loading {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

.blank-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  span {
    font-size: 2rem;
    color: #d3d3d3;
  }
}

img.img-loader {
  width: 50px;
  margin-bottom: 15px;
}
img.img-loader-out {
  margin-top: 15px;
  width: 80px;
  margin-bottom: 15px;
}
.fi-not-found {
  position: relative;
  padding-top: 246px;
  background: rgb(240, 239, 239);
  color: #d3d3d3;
  width: 100%;
  height: 500px;
  margin-bottom: 5px;
}
.products {
  background-color: white;
}
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
</style>
