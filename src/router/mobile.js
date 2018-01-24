import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/mobile/list'
import Create from '@/components/mobile/create'
import Query from '@/components/mobile/query'
import Open from '@/components/mobile/open'
import User from '@/components/mobile/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/query',
      name: 'Query',
      component: Query
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
