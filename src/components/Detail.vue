<template lang="pug">
  Table(:columns="columns1",:data="dataList")
</template>

<script>
export default{
  name: 'detail',
  data: function () {
    return {
      columns1: [
        {
          type: 'index',
          align: 'center'
        },
        {
          title: '商品',
          key: 'goods'
        },
        {
          title: '价格',
          key: 'price'
        }
      ],
      dataList: []
    }
  },
  created: function () {
    this.$axios.get('/user/detail')
      .then((res) => {
        this.dataList = res.data.data
      })
      .catch((res) => {
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
