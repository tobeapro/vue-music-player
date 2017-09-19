<template>
  <div id="app" class="app">
    <v-header :user="userInfo"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/" @click.native="selectItem(0)">首页</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/detail" @click.native="selectItem(100)">详情</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/others" @click.native="selectItem(200)">其他</router-link>
      </div>
    </div>
    <div class="chosen-item" :style="{transform:'translateX('+itemPosition+')'}"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from '@/components/header'
  import Vue from 'vue'
  import axios from 'axios'
  Vue.use(axios)
  export default {
    name: 'app',
    data: function () {
      return {
        userInfo: {
          userName: '',
          userIcon: ''
        },
        itemPosition: 0
      }
    },
    created: function () {
      axios.get('/api')
        .then((res) => {
          this.userInfo = res.data.data
        })
        .catch((res) => {
          console.log(res)
        })
    },
    components: {
      'v-header': header
    },
    methods: {
      selectItem: function (e) {
        this.itemPosition = e + '%'
      }
    }
  }
</script>

<style>
html,body,div,span,
applet,object,iframe,
h1,h2,h3,h4,h5,h6,p,blockquote,pre,
a,abbr,acronym,address,big,cite,code,
del,dfn,em,font,img,ins,kbd,q,s,samp,
small,strike,strong,sub,sup,tt,var,
dd,dl,dt,li,ol,ul,
fieldset,form,label,legend,select,
table,caption,tbody,tfoot,thead,tr,th,td,input,button,i,span{
  margin:0;
  padding:0;
  border:0;
}
body{font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
input,button,textarea,td,th,select{outline:none;}
table {border-collapse:collapse;border-spacing:0;}
ol,ul{list-style: none;}
a{text-decoration:none;}
a:hover{text-decoration:none;cursor:pointer;}
.fl{float:left;}
.fr{float:right;}
.clearFloat:after{content:"";display:block;clear:both;}
.clearFloat{zoom:1;}
input[disabled], select[disabled]{
  background: #f9fafc !important;
  cursor: not-allowed !important;
}
.app .tab{
  display:flex;
  margin-bottom:2px;
  height:40px;
  line-height:40px;
  font-size:14px;
  font-weight:bold;
  background:#fff;
}
.app .tab-item{
  flex:1;
  text-align:center;
}
.app .tab-item a{
  display:inline-block;
  width:100%;
  color:#000;
  letter-spacing: 2px;
}
.app .tab-item a.router-link-exact-active{
  color:indianred;
}
.app .chosen-item{
  width:33.3%;
  transition: .4s;
  border-bottom:3px solid #dc0000;
}
</style>
