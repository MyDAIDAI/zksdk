import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/mobile/list'
import Create from '@/components/mobile/create'
import Query from '@/components/mobile/query'
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
  ]
})
