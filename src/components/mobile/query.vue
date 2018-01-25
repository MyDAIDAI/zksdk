<template>
  <layout ref="layout" :title="title" :isBack="back" :active="active">
    <div class="search">
      <div class="search-input">
        <x-form class="fieldset">
          <x-form-item align="left">
            <x-input placeholder="请输入查询姓名" v-model="search.input" @input="_getDataList('query')"/>            
          </x-form-item>
          <x-form-item align="left">
             <x-input>
                <daterange v-model="search.date" placeholder="请选择查询时间" @input="_getDataList('query')"/>
              </x-input>
          </x-form-item> 
        </x-form>
      </div>
    </div>
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
                <h2 class="name">{{list.name}}</h2>
                <div class="extra">
                  <span class="type">状态：{{list.status}}</span><span>时间：{{list.time}}</span>
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
import {XForm, XFormItem} from '@/base/form'
import {getData, deleteData, putData} from '@/util/http'
import {dateToTimestamp, timestampToDate} from '@/util/date'
import {ERR_OK} from '@/api/config'
import {Scroll} from 'cube-ui'
import XInput from '@/base/input'
import Daterange from '@/base/daterange'
export default {
  name: 'list',
  components: {
    Layout,    
    XForm,
    XFormItem,
    XInput,
    Daterange,
    CubeScroll: Scroll
  },
  data () {
    return {
      search: {
        input: '',
        date: []
      },
      total: 0,
      pageSize: 10,
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
    this.active = 2
  },
  mounted () {
    this._initScrollHeight()
    this._getDataList()
  },
  methods: {
    _initScrollHeight () {
      let total = this.$refs.layout.$el
      let header = total.children[0].children[0]
      let footer = total.children[0].children[2]
      let totalHeight = total.clientHeight
      let headerHeight = header.clientHeight
      let footerHeight = footer.clientHeight
      this.$refs.list.style.height = totalHeight - headerHeight - footerHeight - 50 + 'px'
    },
    _getDataList (type) {
      if (type === 'query') {
        this.page = 1
      }
      let start = ''
      let end = ''
      if (this.search.date) {
        start = this.search.date[0] ? dateToTimestamp(this.search.date[0]) : ''
        end = this.search.date[1] ? dateToTimestamp(this.search.date[1]) : ''
      }
      getData('/zk/listRecord',{
        name: this.search.input,
        startTime: start,
        endTime: end,
        page: this.page,
        pageSize: this.pageSize
      }).then((res) => {
        if (res.code === ERR_OK) {
          this.total = res.data.notes
          this.totalPage = res.data.totalPage
          let data = res.data.list ? eval(res.data.list) : []
          if (type === 'pulldown' || type === 'query') {
            this.tableData = []
            this.tableData.push(...this.formateData(data))
            return
          }
          this.tableData.push(...this.formateData(data))
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
      ret = data.map(ele => {
        return {
          name: ele.name,
          status: ele.status,
          time: timestampToDate(ele.time)
        }
      })
      return ret
    },
    onPullingDown() {
      this.page = 1
      setTimeout(() => {
        this._getDataList('pulldown')
      }, 1000)
    },
    onPullingUp() {
      // 更新数据
      this.page += 1
      setTimeout(() => {
        if (this.page > this.totalPage) {
          this.$refs.scroll.forceUpdate()
        } else {
          this._getDataList()
        }
      }, 1000)
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search 
    -moz-box-shadow:2px 2px 5px #ccc
    -webkit-box-shadow:2px 2px 5px #ccc
    box-shadow:2px 2px 5px #ccc
    margin-bottom: 5px
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
      background: #fff
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
