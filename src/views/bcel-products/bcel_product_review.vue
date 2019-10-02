<template>
  <div class="pd-product">
    <!-- <h2>Product Reviews</h2> -->
    <div class="pd-html-frame" v-html="product_review_html"></div>
    <div id="script_content"></div>
    <!-- <iframe src="https://www.bcel.com.la/bcel/product.html?prid=deposits" frameborder="0" width="100%" height="100%" allowfullscreen></iframe> -->
  </div>
</template>

<script>
import axios from "axios";
import address from "@/helper/server_address.js";
import "@/assets/flexible_interest/fonts/glyphicons.css";
export default {
  name: "bcel_product_review",
  data() {
    return {
      product_review_html: "",
      scripts: ""
    };
  },
  created() {
    var splitData = this.$router["history"]["current"]["fullPath"].split(/\?/g);
    var splitPath = splitData[0].split(/\//g);
    axios
      .post(
        address["serverIp"] + "/bcel/api/products/request/html",
        {
          path: splitPath[splitPath.length - 1],
          query: splitData[1] ? splitData[1] : "-1"
        },
        {
          headers: {
            "content-type": "application/json"
          }
        }
      )
      .then(res => {
        console.log();
        var data = res["data"]["data"]["result"]
          .replace(/https:\/\/www.bcel.com.la/g, "")
          .replace(/\/bcel\//g, "https://www.bcel.com.la/bcel/")
          .replace(/\.html;.*\?/g, "?")
          .replace(/col\-sm\-9/g, "col-sm-12")
          .replace(/<tbody>/g, '<tbody class="text-left">')
          .replace(/col\-md\-9/g, "col-sm-12")
          .replace(/<img/g, '<img class="bcel-product-image"')
          .replace(/;jsessionid.*"><\/script>/g, '"><\/script>')
          .replace(
            /href="atm-locator-map\.html/g,
            ' target="_blank" href="https://www.bcel.com.la/bcel/atm-locator-map.html'
          );
        // var scripts = data.match(/<script.*script>/g);
        // for(var script of scripts){
        //   this.scripts += script + '\n';

        // }
        this.product_review_html = data; //.replace(/<script.*script>/g,'');
        //console.log(this.scripts)
      })
      .catch(error => {
        //console.log(error);
        //this.product_html = error;
      });
  },
  updated() {
    // $(document).ready(function(){
    //   $(".package1").click(function(){
    //     $(this).parent().find(".packageDetails1").toggle();
    //   })
    //   $(".package2").click(function(){
    //     $(this).parent().find(".packageDetails2").toggle();
    //   })
    // });
    //   console.log(this.scripts)
    //   var scrs = this.scripts;
    // $(window).ready(function(){
    //    $('#script_content').html(scrs);
    // })
  },
  methods: {}
};
</script>

<style lang="scss">
</style>
