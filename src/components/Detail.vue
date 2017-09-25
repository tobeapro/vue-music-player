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
      columns2: [
        {
          type: 'index',
          align: 'center'
        },
        {
          title: '歌名',
          key: 'name'
        },
        {
          title: 'id',
          key: 'songid'
        },
        {
          title: '歌手',
          key: 'singer'
        }
      ],
      dataList: [],
      dataList2: []
    }
  },
  created: function () {
    this.$axios.get('/api/detail')
      .then((res) => {
        this.dataList = res.data.data
      })
      .catch((res) => {
        console.log(res)
      })
    this.$on('datadetail', val => {
      console.log(2)
      this.dataList2 = val
    })
  },
//  methods: {
//    songlist: function (val) {
//      this.dataList2 = val
//      console.log(val)
//    }
//  },
  filters: {
    priceFilter: function (val) {
      return '¥' + ' ' + val
    }
  }
}
</script>

<style>

</style>
