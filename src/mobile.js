// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Mobile from './CMobile'
import FastClick from 'fastclick'
import router from './router/mobile'
import Cube from 'cube-ui'

Vue.use(Router)
Vue.use(Cube)
FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(Mobile)
})
