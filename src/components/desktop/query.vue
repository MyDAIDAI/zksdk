<template>
  <div class="query">
    <layout :activeIndex="activeIndex">
      <el-row style="display: flex;justify-content: flex-end;margin-bottom: 1em">
        <el-col :span="6">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="queryData" >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
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
    </layout>
  </div>
</template>

<script>
  import layout from '@/layouts/Desktop'
  export default {
    name: 'query',
    components: {
      layout
    },
    data () {
      return {
        queryData: '',
        tableData: []
      }
    },
    created () {
      this.activeIndex = '3'
    }
  }
</script>

<style>

</style>
