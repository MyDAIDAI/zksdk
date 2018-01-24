<template>
  <div>
    <layout :title="title" :isBack="back" :active="active">
      <list-view @on-pullup="pullupHandler" @on-pulldown="pulldownHandler" :loading="loading" :end="end">
        <template v-for="item in list">
          <flexbox align="center" class="list-view-item">
            <flexbox-item>
              <div style="padding: 10px; padding-left: 15px">
                <h4 style="margin: 0px; color: #464c5b">{{item.username}}</h4>
                <div style="color: #657180; font-size: 12px">
                  <span>用户类型：{{item.usertype}}</span> &nbsp; &nbsp; <span>通行状态：{{item.pass}}</span>
                </div>
              </div>
            </flexbox-item>
          </flexbox>
          <divider></divider>
        </template>
      </list-view>
    </layout>
  </div>
</template>

<script>
  import Layout from '@/layouts/Mobile'
  import ListView from '@/base/list-view'
  import Divider from '@/base/divider'
  import {Flexbox, FlexboxItem} from '@/base/flexbox'
  import {getData, deleteData, putData} from '@/util/http'
  import {ERR_OK} from '@/api/config'
  const PAGE_SIZE = 15
  export default {
    name: 'list',
    components: {
      Layout,
      ListView,
      Flexbox,
      FlexboxItem,
      Divider
    },
    created () {
      this.title = '中控sdk'
      this.back = false
      this.active = 0
    },
    data () {
      return {
        list: [],
        loading: true,
        end: false,
        total: 0,
        pageSize: PAGE_SIZE,
        page: 1,
      }
    },
    mounted () {
      this._getUserList()
    },
    methods: {
      _getUserList () {
        getData('/zk/listUser', {
          page: this.page,
          pageSize: this.pageSize
        }).then((res) => {
          if (res.code === ERR_OK) {
            
            let data = res.data.list
            this.total = res.data.notes
            this.tableData = []
            data.forEach(ele => {
              let usertype = ele.privilege === 3 ? '管理员' : '普通用户'
              let pass = ele.enabled ? '是' : '否'
              this.list.push({
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
      pullupHandler () {
        this.page += 1
        this._getUserList()
      },
      pulldownHandler () {
        this.page = 1
        this._getUserList()
      }
    }
  }
</script>