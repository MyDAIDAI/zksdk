import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/mobile/list'
import Open from '@/components/mobile/open'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path:'/open',
      name:'Open',
      component:Open
    }
  ]
})
