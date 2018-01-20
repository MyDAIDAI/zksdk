<template>
  <div>
    <layout :activeIndex="activeIndex">
      <div style="padding: 40px">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="userid"
            label="用户ID"
            width="150">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="usertype"
            label="用户类型">
          </el-table-column>
          <el-table-column
            prop="pass"
            label="通行状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="set"
            label="门禁设置"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.set">禁用</el-button>
              <el-button type="text" size="small" v-else>允许</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="modifyData(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deleteData(scope.row)" type="text" size="small">删除</el-button>
            </template>
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
  import layout from '@/layouts/layout'
  import {getData} from '@/util/http'
  import {ERR_OK} from '@/api/config'
  export default {
    name: 'user',
    components: {
      layout
    },
    created () {
      this.activeIndex = '1'
    },
    data () {
      return {
        tableData: [],
        total: 0,
        pageSize: 5,
        page: 1
      }
    },
    mounted () {
      this._getUser()
    },
    methods: {
      _getUser () {
        getData('/zk/listUser', {
          page: this.page,
          pageSize: 5
        }).then((res) => {
          if (res.code === ERR_OK) {
            let data = res.data.list
            this.total = res.data.notes
            this.tableData = []
            data.forEach(ele => {
              let usertype = ele.privilege === 3 ? '管理员' : '普通用户'
              let pass = ele.enable ? '是' : '否'
              this.tableData.push({
                userid: ele.userId,
                username: ele.name,
                usertype: usertype,
                pass: pass,
                set: ele.enable
              })
            })
          }
        })
      },
      changeTable (currentPage) {
        this.page = currentPage
        this._getUser()
      },
      modifyData (row) {
        this.$router.push({
          path: `/user/${row.userid}`
        })
      }
    }
  }
</script>

<style>
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px
  }
  .block {
    display: flex;
    justify-content: flex-end;
    padding-right: 40px
  }
</style>

