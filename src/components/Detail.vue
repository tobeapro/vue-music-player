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
export default{
  name: 'detail',
  props: { 'dataList': {
    type: Array
  }},
  filters: {
    priceFilter: function (val) {
      return '¥' + ' ' + val
    }
  }
}
</script>

<style>

</style>
