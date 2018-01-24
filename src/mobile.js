// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Mobile from './CMobile'
import FastClick from 'fastclick'
import router from './router/mobile'
import './base/style/src/theme/index.scss'

Vue.use(Router)
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.mixin({
  props: {
    $cssPrefix: {
      type: String,
      default: 'v-'
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(Mobile)
})
let initRootFontSize = () => {
  let deviceWidth = window.innerWidth
  let devicePixelRatio = window.devicePixelRatio || window.webkitDevicePixelRatio || window.mozDevicePixelRatio
  let calc = 7.5
  if (deviceWidth > 414) deviceWidth = 414
  if (deviceWidth < 320) deviceWidth = 320
  if (deviceWidth < 320 && devicePixelRatio >= 2) calc = calc - (devicePixelRatio - 1)
  document.documentElement.style.fontSize = Math.ceil(deviceWidth / calc) + 'px'// 计算设计稿和实际像素的缩放比。向上取整1px = 0.01rem
}
window.addEventListener('resize', initRootFontSize)
initRootFontSize()