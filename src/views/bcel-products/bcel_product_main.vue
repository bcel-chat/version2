<template>
  <div class="pd-product">
      <h3 class="fi-bcel-product-main-title"><strong>ຜະລິດຕະພັນ & ບໍລິການ</strong></h3>
      <router-view/>
  </div>
</template>

<style lang="scss">
div.pd-product>div.pd-html-frame div.mainpic, 
div.pd-product>div.pd-html-frame footer, 
div.pd-product>div.pd-html-frame div.head-top, 
div.pd-product>div.pd-html-frame div.navbar, 
div.pd-product>div.pd-html-frame div.marketing-cen,
div.pd-product>div.pd-html-frame div.sidebar-module,/*:nth-last-child(1)*/
div.pd-product>div.pd-html-frame form,
div.pd-product>div.pd-html-frame ul.pager{
  display: none;
}

div.pd-product>div.pd-html-frame div.OrderPackages>table>tbody>tr:first-child>td:last-child, 
div.pd-product>div.pd-html-frame div.post-content div.col-xs-12>table.table-striped>tbody>tr:first-child>td:last-child,
div.pd-product>div.pd-html-frame div.post-content div.col-md-12>table.table-striped>tbody>tr:first-child>td:last-child{
  font-size: 25px;
}//col-md-12
div.pd-product>div.pd-html-frame div.OrderPackages>table>tbody>tr:first-child>td,
div.pd-product>div.pd-html-frame div.post-content div.col-xs-12>table.table-striped>tbody>tr:first-child,
div.pd-product>div.pd-html-frame div.post-content div.col-md-12>table.table-striped>tbody>tr:first-child{
  background:  linear-gradient(to bottom, rgb(223, 223, 223) 10%, rgba(182, 180, 180, 0.918) 100%);
}

img.bcel-product-image{
  width: 100%;
}

div.post-content img.bcel-product-image{
  display: none;
}

div.card {
    -webkit-box-shadow: -2px 3px 14px -7px rgba(0,0,0,0.52);
    -moz-box-shadow: -2px 3px 14px -7px rgba(0,0,0,0.52);
    box-shadow: -2px 3px 14px -7px rgba(0,0,0,0.52);
}
div.bggrey{
  background: white;
}

.fi-bcel-product-main-title{
  margin-top: 0px;
  background:  linear-gradient(to bottom, rgb(243, 182, 174) 10%, rgba(233, 111, 95, 0.918) 100%);
  padding-top: 20px;
  padding-bottom: 20px;
}

</style>
