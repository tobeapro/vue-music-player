import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '@/components/Detail'
import map from '@/components/map'
Vue.use(Router)
const hello = {
  template: '<div style="position:absolute;left:50%;top:50%;transform: translate(-50%,-50%)">{{link}}</div>',
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
      name: 'home',
      component: Home,
      children: [
        {path: '/hello', name: 'hello', component: hello}
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/others',
      name: 'others',
      component: map
    }
  ]
})
