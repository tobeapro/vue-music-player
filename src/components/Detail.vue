<template>
  <el-table
    :data="dataList"
    style="width: 100%">
    <el-table-column
      type="index"
      width="80px">
    </el-table-column>
    <el-table-column
      prop="goods"
      label="商品">
    </el-table-column>
    <el-table-column
      label="价格">
      <template scope="scope">
        <span>{{scope.row.price|priceFilter}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import elementUi from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(elementUi)
export default{
  name: 'detail',
  data: function () {
    return {
      dataList: [
        { 'goods': '手机', 'price': 1000 },
        { 'goods': '电脑', 'price': 5000 },
        { 'goods': '充电器', 'price': 100 }
      ]
    }
  },
  created: function () {
    axios.get('/data.json')
      .then(function (res) {
        console.log(res)
      })
      .catch(function (res) {
        console.log(res)
      })
  },
  filters: {
    priceFilter: function (val) {
      return '¥' + ' ' + val
    }
  }
}
</script>

<style>


</style>
