import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import rank from '@/components/rankList'
import search from '@/components/searchbar'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/rank',
      name: 'rankList',
      component: rank
    },
    {
      path: '/search',
      name: 'searchbar',
      component: search
    }
  ]
})
