import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/list'
import User from '@/components/user'
import Open from '@/components/open'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/open',
      name: 'Open',
      component: Open
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    },
  ]
})
