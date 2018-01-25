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
if (process.browser) {
  ((w) => {
    w.$toast = (_props, mounted = document.body) => {
      let props = Object.assign({
        open: true,
        onClose: () => {
          return true
        }
      }, _props)
      let node = document.createElement('div')
      mounted.appendChild(node)
      let vue = new Vue({ //eslint-disable-line
        el: node,
        render (createElement) {
          let content = props.content
          return createElement(Toast, {
            props: props,
            on: {
              'on-close': this.closeHandler
            },
            scopedSlots: {
              default: props => createElement('div', content)
            }
          })
        },
        data: {props: props},
        methods: {
          closeHandler: () => {
            props.open = props.onClose() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          }
        },
        destroyed: () => {
          requestAnimationFrame(() => {
            vue.$el.remove()
          })
        }
      })
      return vue
    }

    w.$alert = (_props, mounted = document.body) => {
      let props = Object.assign({
        open: true,
        onConfirm: () => {
          return true
        }
      }, _props)
      let node = document.createElement('div')
      mounted.appendChild(node)
      let vue = new Vue({ //eslint-disable-line
        el: node,
        render (createElement) {
          let content = props.content
          return createElement(Alert, {
            props: props,
            on: {
              'on-confirm': this.confirmHandler,
              'on-close': this.closeHandler
            },
            scopedSlots: {
              default: props => createElement('div', content)
            }
          })
        },
        data: {props: props},
        methods: {
          confirmHandler: () => {
            props.open = props.onConfirm() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          },
          closeHandler: () => {
            props.open = props.onCancel() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          }
        },
        destroyed: () => {
          requestAnimationFrame(() => {
            vue.$el.remove()
          })
        }
      })
      return vue
    }

    w.$confirm = (_props, mounted = document.body) => {
      let props = Object.assign({
        open: true,
        onConfirm: () => {
          return true
        },
        onCancel: () => {
          return true
        }
      }, _props)
      let node = document.createElement('div')
      mounted.appendChild(node)
      let vue = new Vue({ //eslint-disable-line
        el: node,
        render (createElement) {
          let content = props.content
          return createElement(Confirm, {
            props: props,
            on: {
              'on-confirm': this.confirmHandler,
              'on-close': this.closeHandler
            },
            scopedSlots: {
              default: props => createElement('div', content)
            }
          })
        },
        data: {props: props},
        methods: {
          confirmHandler: () => {
            props.open = props.onConfirm() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          },
          closeHandler: () => {
            props.open = props.onCancel() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          }
        },
        destroyed: () => {
          requestAnimationFrame(() => {
            vue.$el.remove()
          })
        }
      })
      return vue
    }
    w.$prompt = (_props, mounted = document.body) => {
      let props = Object.assign({
        open: true,
        disabled: true,
        onConfirm: () => {
          return true
        },
        onCancel: () => {
          return true
        },
        onChange: (value) => {
          if (value && value.trim()) {
            return false
          } else {
            return true
          }
        }
      }, _props)
      let node = document.createElement('div')
      mounted.appendChild(node)
      let vue = new Vue({ //eslint-disable-line
        el: node,
        render (createElement) {
          let content = props.content
          return createElement(Prompt, {
            props: props,
            on: {
              'on-confirm': this.confirmHandler,
              'on-close': this.closeHandler,
              'on-change': this.changeHandler
            },
            scopedSlots: {
              default: props => createElement('div', content)
            }
          })
        },
        data: {props: props},
        methods: {
          confirmHandler: () => {
            props.open = props.onConfirm() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          },
          closeHandler: () => {
            props.open = props.onCancel() === false
            !props.open && setTimeout(() => {
              vue.$destroy()
            }, 1000)
          },
          changeHandler: (value) => {
            props.disabled = props.onChange(value)
          }
        },
        destroyed: () => {
          requestAnimationFrame(() => {
            vue.$el.remove()
          })
        }
      })
      return vue
    }
  })(window)
}
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