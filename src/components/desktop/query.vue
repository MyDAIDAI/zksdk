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
              @change="queryDataFun">
            </el-date-picker>
          </div>
          <div style="width: 200px; display: inline-block">
            <el-input placeholder="请输入查询姓名" v-model="queryData" @change="queryDataFun">
              <el-button slot="append" icon="el-icon-search" @click="queryDataFun"></el-button>
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
    </layout>
  </div>
</template>

<script>
  import layout from '@/layouts/Desktop'
  import {getData} from '@/util/http'
  import {ERR_OK} from '@/api/config'
  import {dateToTimestamp} from '@/util/date'
  export default {
    name: 'query',
    components: {
      layout
    },
    data () {
      return {
        queryData: '',
        tableData: [],
        dateValue: ''
      }
    },
    created () {
      this.activeIndex = '3'
    },
    mounted () {
      this.getDataList()
    },
    methods: {
      getDataList () {
        getData('/zk/listRecord').then((res) => {
          if (res.code === ERR_OK) {
            this.tableData = eval(res.data)
          }
        }) 
      },
      queryDataFun () {
        let start = dateToTimestamp(this.dateValue[0])
        let end =dateToTimestamp(this.dateValue[1])
        console.log(start, end)
        getData('/zk/listRecord', {
          name: this.queryData,
          start: start,
          end: end
        }).then((res) => {
          if (res.code === ERR_OK) {
            this.tableData = eval(res.data)
          }
        })
      }
    }
  }
</script>

<style>

</style>
