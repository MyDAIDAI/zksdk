<template>
  <div>
    <layout :title="title" :isBack="back" :active="active">
      <x-form class="fieldset" style="margin-bottom: 20px;display: fixed">
        <x-form-item align="left">
          <x-input placeholder="请输入查询姓名" v-model="query.name" @input="queryData"/>
        </x-form-item>
        <x-form-item align="left" validity-label="密码">
          <x-input>
            <daterange v-model="query.date" placeholder="请选择查询时间" @on-change="queryData"/>
          </x-input>
        </x-form-item>
      </x-form>
      <list-view @on-pullup="pullupHandler" @on-pulldown="pulldownHandler" :loading="loading" :end="end">
        <template v-for="item in list">
          <flexbox align="center" class="list-view-item">
            <flexbox-item>
              <div style="padding: 10px; padding-left: 15px">
                <h4 style="margin: 0px; color: #464c5b">{{item.name}}</h4>
                <div style="color: #657180; font-size: 12px">
                  <span>状态：{{item.status}}</span> &nbsp; &nbsp; <span>时间：{{item.time}}</span>
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
  import {XForm, XFormItem} from '@/base/form'
  import XInput from '@/base/input'
  import Daterange from '@/base/daterange'
  import {getData, deleteData, putData} from '@/util/http'
  import {dateToTimestamp, timestampToDate} from '@/util/date'
  import {ERR_OK} from '@/api/config'
  const PAGE_SIZE = 15
  export default {
    name: 'list',
    components: {
      Layout,
      ListView,
      Flexbox,
      FlexboxItem,
      Divider,
      XForm,
      XFormItem,
      XInput,
      Daterange
    },
    created () {
      this.title = '中控sdk'
      this.back = false
      this.active = 2
    },
    data () {
      return {
        list: [],
        loading: true,
        end: false,
        total: 0,
        pageSize: PAGE_SIZE,
        lastPage: 0,
        page: 1,
        query: {
          name: '',
          date: []
        }
      }
    },
    mounted () {
      this.getDataList()
    },
    methods: {
      getDataList (type) {
        if (type === 'query') {
          this.page = 1
        }
        let start = ''
        let end = ''
        if (this.dateValue) {
          start = this.dateValue[0] ? dateToTimestamp(this.dateValue[0]) : ''
          end = this.dateValue[1] ? dateToTimestamp(this.dateValue[1]) : ''
        }
        getData('/zk/listRecord',{
          name: this.queryData,
          startTime: start,
          endTime: end,
          page: this.page,
          pageSize: PAGE_SIZE
        }).then((res) => {
          if (res.code === ERR_OK) {
            this.total = res.data.notes
            let data = res.data.list ? eval(res.data.list) : []
            this.list = data.map(ele => {
              return {
                name: ele.name,
                status: ele.status,
                time: timestampToDate(ele.time)
              }
            })
          }
        }) 
      },
      pullupHandler (e) {
        this.page += 1
        if (this.page > this.lastPage) {
          this.loading = false
          this.end = true
          return
        }
        console.log(this.page)
        this._getUserList()
      },
      pulldownHandler (e) {
        this.page = 1
        this._getUserList()
      }
    }
  }
</script>