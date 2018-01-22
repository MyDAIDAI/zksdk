<template>
  <div class="query">
    <layout :activeIndex="activeIndex">
      <el-row style="margin:30px;">
        <el-col :span="24" style="display: flex;justify-content: flex-end;">
          <div style="width: 400px; display: inline-block">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getDataList('query')">
            </el-date-picker>
          </div>
          <div style="width: 200px; display: inline-block">
            <el-input placeholder="请输入查询姓名" v-model="queryData" @change="getDataList('query')">
              <el-button slot="append" icon="el-icon-search" @click="getDataList('query')"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <div style="padding: 0 30px">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="180">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间">
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="changeTable">
        </el-pagination>
      </div>
    </layout>
  </div>
</template>

<script>
  import layout from '@/layouts/Desktop'
  import {getData} from '@/util/http'
  import {ERR_OK} from '@/api/config'
  import {dateToTimestamp} from '@/util/date'
  const PAGE_SIZE = 15
  export default {
    name: 'query',
    components: {
      layout
    },
    data () {
      return {
        queryData: '',
        tableData: [],
        dateValue: '',
        page: 1,
        total: 0,
        pageSize: PAGE_SIZE
      }
    },
    created () {
      this.activeIndex = '3'
    },
    mounted () {
      this.getDataList()
    },
    methods: {
      getDataList (type) {
        if (type === 'query') {
          this.page = 1
        }
        let start = this.dateValue[0] ? dateToTimestamp(this.dateValue[0]) : ''
        let end = this.dateValue[1] ? dateToTimestamp(this.dateValue[1]) : ''
        getData('/zk/listRecord',{
          name: this.queryData,
          startTime: start,
          endTime: start,
          page: this.page,
          pageSize: PAGE_SIZE
        }).then((res) => {
          if (res.code === ERR_OK) {
            this.total = res.data.notes
            this.tableData = eval(res.data.list)
          }
        }) 
      },
      changeTable (currentPage) {
        this.page = currentPage
        this.getDataList()
      },
    }
  }
</script>

<style>
  .block {
    display: flex;
    justify-content: flex-end;
    padding-right: 30px
  }
</style>
