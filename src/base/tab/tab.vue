<template>
  <layout class="navigator-view" :title="title">
    <div slot="content">
      <div class="navigator-container" ref="viewport">
        <navigator :navList="navList" @change="change" :currentTabIndex="currentTabIndex">
          <span slot="item" slot-scope="props">
            <router-link :to="props.link" class="tab-name" :class="{'link-active':isCurrent(props.index)}">{{props.text}}</router-link>
          </span>
        </navigator>
      </div>
      <div class="tab-render-content">
        <router-view></router-view>
      </div>
    </div>
  </layout>
</template>

<script type="text/ecmascript-6">
  import Layout from '@/layouts/Mobile'
  import Navigator from '@/base/navigator/navigator'

  const navList = [
    {
      id: 1,
      name: '获取用户',
      link: '/list'
    },
    {
      id: 2,
      name: '创建用户',
      link: '/user'
    },
    {
      id: 3,
      name: '查询用户',
      link: '/query'
    },
    {
      id: 4,
      name: '远程开门',
      link: '/open'
    }
  ]

  export default {
    data() {
      return {
        navList: navList,  // 渲染的列表数据
        currentTabIndex: 1 // 当前默认tab
      }
    },
    created () {
      this.title = '中控sdk'
    },
    methods: {
      isCurrent (index) {
        return index === this.currentTabIndex
      },
      change (item) {
        if (item !== undefined) {
          this.currentTabIndex = item.id
        }
        // 以下部分编写点击相应的navList item时，渲染的逻辑代码
        // this.$router.replace('/examples/nav-list/' + this.currentTabIndex + '/' + this.$i18n.locale)
      }
    },
    components: {
      Layout,
      Navigator
    }
  }
</script>
<style lang='stylus' rel='stylesheet/stylus' type="text/stylus">
  a
    text-decoration: none
  .navigator-view
    .navigator-container
      height: 52px;
      background: #fff;
      box-shadow: 0 2px 3px rgba(0, 0, 0, .12)
      overflow: hidden;
    .tab-render-content
      position: absolute;
      left: 0;
      top: 80px;
      right: 0;
      bottom: 0;
      margin-top: 15px;
      padding: 15px;
      // background: #fff;
      line-height: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
</style>
