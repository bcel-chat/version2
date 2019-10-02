<template>
  <div class="pd-product">
      <!-- <h2>BCEL Products</h2> -->
      <div class="pd-html-frame" v-html="product_html">
          
      </div>
    <!-- <iframe src="https://www.bcel.com.la/bcel/product.html?prid=deposits" frameborder="0" width="100%" height="100%" allowfullscreen></iframe> -->
  </div>
</template>

<script>
import axios from 'axios';
import address from '@/helper/server_address.js'
export default {
  name: 'bcel_product',
  data(){
      return {
          product_html: ''
      }
  },
  created(){
    var splitData = this.$router['history']['current']['fullPath'].split(/\?/g);
    var splitPath = splitData[0].split(/\//g);
    axios.post(address['serverIp'] + '/bcel/api/products/request/html',
            {
              path: splitPath[splitPath.length - 1],
              query: splitData[1]
            }
        ,{
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => {
          
          var data = res['data']['data']['result']
                                                  .replace(/https:\/\/www.bcel.com.la/g, '')
                                                  .replace(/\/bcel\//g, 'https://www.bcel.com.la/bcel/')
                                                  .replace(/\.html;.*\?/g, '?')
                                                  .replace(/atm-locator\.html"/g, 'https://www.bcel.com.la/bcel/atm-locator.html" target="_blank" ')
                                                  //.replace(/\.html/g, '')
                                                  .replace(/hide/g,'text-left')
                                                  .replace(/col\-md\-9/g,'col-sm-12')
                                                  .replace(/<\/table>/g,'</table><hr>')
                                                  .replace(/id="package2" class="/g,'class="package2 ')
                                                  .replace(/id="package1" class="/g,'class="package1 ')
                                                  .replace(/collapse/g,"uncollapse")
                                                  .replace(/<img/g,'<img class="bcel-product-image"')
                                                  .replace(/;jsessionid.*"><\/script>/g,'"><\/script>')
                                                  .replace(/id="OrderPackages"/g,'class="OrderPackages"');
          // data += ' <script> ' +
          // '$(document).ready(function(){'+
          //   '$(".package1").click(function(){' +
          //     '$(this).parent().find(".packageDetails1").toggle();' +
          //   '})' +
          //   '$(".package2").click(function(){'+
          //     '$(this).parent().find(".packageDetails2").toggle();'+
          //   '})'+
          // '});'+
          // '<\/script>';
          //console.log(data)
          this.product_html = data;
        }).catch((error) =>  {
            //console.log(error);
            //this.product_html = error;
        });
      /*axios.get(address['serverIp'] +'/bcel/api/products/request/html')
            .then((res) => {
                //console.log(res['data']['data']['result'].replace(/\/bcel\//g, 'https://www.bcel.com.la/bcel/').replace(/\.html;/g, '?'))
                this.product_html = res['data']['data']['result'].replace(/\/bcel\//g, 'https://www.bcel.com.la/bcel/').replace(/\.html;/g, '?');
            })
            .catch((error) =>  {
                //console.log(error);
                //this.product_html = error;
            })*/
  },
  mounted(){
    console.log('Mounted event')
  },
  updated(){
    $(document).ready(function(){
      $(".package1").click(function(){
        $(this).parent().find(".packageDetails1").toggle();
      })
      $(".package2").click(function(){
        $(this).parent().find(".packageDetails2").toggle();
      })
    });
  },
  methods: {
      iframeStyles() {
        this.frame = this.$refs.iframeContent.contentWindow;

        const style =
            '.layout__wrapper {background:' + this.background + ';} ' +
            'body {color:' + this.text + ';} '
        this.frame.postMessage(style, '*');
    }
  }
}

/*$(document).ready(function(){
  $(".package1").click(function(){
    $(this).parent().find(".packageDetails1").toggle();
  })
  $(".package2").click(function(){
    $(this).parent().find(".packageDetails2").toggle();
  })
});*/
</script>

<style lang="scss">
  .uncollapse{
    display: none;
  }
</style>

