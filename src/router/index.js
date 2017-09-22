import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '@/components/Detail'

Vue.use(Router)
const helloLink = {
  template: '<div>{{link}}</div>',
  data: function () {
    return {
      link: 'this is link'
    }
  }
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      tab: 0,
      component: Home,
      children: [
        {path: '/helloLink', name: 'helloLink', component: helloLink}
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      tab: 100,
      component: Detail
    },
    {
      path: '/others',
      name: 'others',
      tab: 200,
      component: {template: '<div>others</div>'}
    }
  ]
})
