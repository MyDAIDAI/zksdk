<template>
  <layout ref="layout" :title="title" :isBack="back" :active="active">
    <div class="list" ref="list">
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="tableData"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp">
          <ul class="list-wrapper">
            <li @click="selectList(list,$event)" v-for="(list, index) in tableData" class="list-item border-1px" :key="index">
              <div class="list-content">
                <h2 class="name">{{list.username}}</h2>
                <!-- <p class="description">{{list.description}}</p> -->
                <div class="extra">
                  <span class="type">用户类型：{{list.usertype}}</span><span>通行状态：{{list.pass}}</span>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/layouts/Mobile'
import {getData, deleteData, putData} from '@/util/http'
import {ERR_OK} from '@/api/config'
import {Scroll} from 'cube-ui'
export default {
  name: 'list',
  components: {
    Layout,    
    CubeScroll: Scroll
  },
  data () {
    return {
      total: 0,
      pageSize: 5,
      page: 1,
      totalPage: 0,
      tableData: [],
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载完成',
            noMore: '没有数据咯'
          }
        }
      }
    }
  },
  created () {
    this.title = '中控sdk',
    this.back = false
    this.active = 0
  },
  mounted () {
    this._initScrollHeight()
    this._getUser()
  },
  methods: {
    _initScrollHeight () {
      let total = this.$refs.layout.$el
      let header = total.children[0].children[0]
      let footer = total.children[0].children[2]
      let totalHeight = total.clientHeight
      let headerHeight = header.clientHeight
      let footerHeight = footer.clientHeight
      this.$refs.list.style.height = totalHeight - headerHeight - footerHeight + 'px'
    },
    _getUser (type) {
      getData('/zk/listUser', {
        page: this.page,
        pageSize: 15
      }).then((res) => {
        if (res.code === ERR_OK) {
          this.total = res.data.notes
          this.totalPage = res.data.totalPage
          if (type === 'pulldown') {
            this.tableData = []
            this.tableData.push(...this.formateData(res.data.list))
            this.$refs.scroll.refresh()
            return         
          }
          this.tableData.push(...this.formateData(res.data.list))
        }
      })
    },
    selectList (list, event){
      this.$router.push({
        path: '/user/' + list.userid
      })
    },
    formateData (data) {
      let ret = []
      data.forEach(ele => {
        let usertype = ele.privilege === 3 ? '管理员' : '普通用户'
        let pass = ele.enabled ? '是' : '否'
        ret.push({
          userid: ele.userId,
          username: ele.name,
          usertype: usertype,
          pass: pass,
          set: ele.enabled
        })
      })
      return ret
    },
    onPullingDown() {
      this.page = 1
      setTimeout(() => {
        this._getUser('pulldown')
      }, 1000)
    },
    onPullingUp() {
      // 更新数据
      this.page += 1
      setTimeout(() => {
        if (this.page > this.totalPage) {
          this.$refs.scroll.forceUpdate()
        } else {
          this._getUser()
        }
      }, 1000)
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  ul
    list-style-type: none
    -webkit-padding-start: 0
  .list
    // height: 100%
    .scroll-list-wrap
      height: 100%
      // border: 1px solid rgba(0, 0, 0, .1)
      border-radius: 5px
      transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
      overflow: hidden
      .cube-scroll-item
        font-size: 16px
        color: #666
      .list-wrapper
        .list-item
          display: flex
          padding: 18px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-none()
            margin-bottom: 0
          .list-content
            flex: 1
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            .description, .extra
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .description
              line-height: 12px
              margin-bottom: 8px
            .extra
              .type
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 12px
</style>
