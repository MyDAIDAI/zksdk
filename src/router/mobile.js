import Vue from 'vue'
import Router from 'vue-router'

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
