<template>
  <layout>
      <x-nav slot="header" :back="isBack">
        <div slot="title">{{title}}</div>
        <button class="btn-pull" slot="pull">
          <icon>&#xe78d;</icon>
        </button>
      </x-nav>
      <x-body slot="body">
        <slot></slot>
      </x-body>
      <tabbar slot="footer" :ripple="true" @on-change="changeHandler" :active="active">
        <tabbar-item>
          <icon>&#xe6b5;</icon>
          <span>获取用户</span>
        </tabbar-item>
        <tabbar-item>
          <icon>&#xe6b9;</icon>
          <span>创建用户</span>
        </tabbar-item>
        <tabbar-item>
          <icon>&#xe6ac;</icon>
          <span>查询用户</span>
        </tabbar-item>
        <tabbar-item>
          <icon>&#xe725;</icon>
          <span>远程开门</span>
        </tabbar-item>
      </tabbar>
    </layout>
</template>

<script type="text/ecmascript-6">
  import XNav from '@/base/nav'
  import Icon from '@/base/icon'
  import XBody from '@/base/body'
  import {Tabbar, TabbarItem} from '@/base/tabbar'
  import Layout from './Layout'
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      isBack: {
        type: Boolean,
        default: false
      },
      active: {
        type: Number,
        default: 0
      },
    },
    data () {
      return {
        link: ['/list', '/create', '/query', '/open']
      }
    },
    components: {
      XNav,
      Icon,
      XBody,
      Tabbar,
      TabbarItem,
      Layout
    },
    computed: {
      classes () {
        return [this.$cssPrefix + 'layout']
      }
    },
    methods: {
      changeHandler (value) {
        this.$router.push({
          path: this.link[value]
        })
      }
    }
  }
</script>
<style lang="scss">
  .tabbar-swiper{
    height:100%;
    min-height:300px;
    text-align:center;
    line-height:40px
  }
</style>