<template>
  <div class="container">
    <div class="pd-product">
      <div class="pd-html-frame">
        <div class="row">
          <!-- <i class="glyphicons glyphicons-credit-card"></i> -->
          <div
            class="col-sm col-md-6 col-spacing-top"
            v-for="(type, index) in product_type"
            :key="index"
          >
            <router-link class="bcel-type-link" :to="'/bcel/'+type['path']+'?'+type['query']">
              <div class="card">
                <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
                <i :class="'bcel-icon-size '+type['iconClass']"></i>
                <div class="card-body">
                  <h5 class="card-title">
                    <strong>{{type['typeName']}}</strong>
                  </h5>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ds from "@/helper/ds.js";
import "@/assets/flexible_interest/fonts/phetsarath_font.css";
import "@/assets/flexible_interest/fonts/glyphicons.css";

export default {
  name: "bcel_product_type",
  data() {
    return {
      product_type: []
    };
  },
  created() {
    ds.rpc.make("/bcel/api/product/type/list", {}, (error, result) => {
      if (result) {
        this.product_type = result;
      }
    });
  },
  methods: {}
};
</script>

<style lang="scss">
* {
  font-family: Phetsarath_OT;
}
div.pd-product {
  padding-bottom: 20px;
}
div.col-spacing-top {
  margin-top: 10px;
  margin-bottom: 10px;
}
i.bcel-icon-size {
  /*background: rgb(85, 84, 84);
  border-radius: 50%;
  width: 250px;*/
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 150px;
}
a.bcel-type-link {
  color: rgb(177, 24, 13);
  text-decoration: none;
}
a.bcel-type-link:hover {
  color: #ee3024;
  text-decoration: none;
}
</style>
