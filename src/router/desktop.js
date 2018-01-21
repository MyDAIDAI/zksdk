import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/desktop/list'
import User from '@/components/desktop/user'
import Open from '@/components/desktop/open'
import Query from '@/components/desktop/query'

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
      path: '/query',
      name: 'Query',
      component: Query
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    },
  ]
})
