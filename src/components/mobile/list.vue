<template>
  <div class="list">
    <div class="scroll-list-wrap">
       <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
      </cube-scroll>
     </div>
  </div>
</template>

<script>
import {getData, deleteData, putData} from '@/util/http'
import {ERR_OK} from '@/api/config'
export default {
  name: 'list',
  data () {
    return {
      total: 0,
      pageSize: 5,
      page: 1,
      tableData: [],
      items: [],
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载中',
            noMore: '没有数据咯'
          }
        }
      }
    }
  },
  mounted () {
    this._getUser()
  },
  methods: {
    _getUser () {
        getData('/zk/listUser', {
          page: this.page,
          pageSize: 15
        }).then((res) => {
          if (res.code === ERR_OK) {
            let data = res.data.list
            this.total = res.data.notes
            this.tableData = []
            data.forEach(ele => {
              let usertype = ele.privilege === 3 ? '管理员' : '普通用户'
              let pass = ele.enabled ? '是' : '否'
              this.items.push(ele.name + '-' + usertype)
              this.tableData.push({
                userid: ele.userId,
                username: ele.name,
                usertype: usertype,
                pass: pass,
                set: ele.enabled
              })
            })
          }
        })
      },
    onPullingDown() {
      this.page = 1
      setTimeout(() => {
        this._getUser()
      }, 1000)
    },
    onPullingUp() {
      // 更新数据
      this.page += 1
      setTimeout(() => {
        this._getUser()
      }, 1000)
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .list
    height: 100%
    .scroll-list-wrap
      height: 100%
      border: 1px solid rgba(0, 0, 0, .1)
      border-radius: 5px
      transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
      overflow: hidden
      background: #ffffff 
</style>
