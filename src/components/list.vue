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
              <el-button @click="sureHandler(scope.row, '禁用')" type="text" size="small" v-if="scope.row.set">禁用</el-button>
              <el-button @click="sureHandler(scope.row, '允许')" type="text" size="small" v-else>允许</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="modifyUser(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="sureHandler(scope.row, '删除')" type="text" size="small">删除</el-button>
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
  import {getData, deleteData, putData} from '@/util/http'
  import {ERR_OK} from '@/api/config'
  const DURATION = 2000
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
              let pass = ele.enabled ? '是' : '否'
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
      changeTable (currentPage) {
        this.page = currentPage
        this._getUser()
      },
      modifyUser (row) {
        this.$router.push({
          path: `/user/${row.userid}`
        })
      },
      deleteUser (row) {
        deleteData('/zk/deleteUser', {
          userId: row.userid
        }).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: DURATION,
              onClose: () => {
                this._getUser()
              }
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: DURATION
            })
          }
        })
      },
      disableUser (row) {
        putData('/zk/disableUser', {
          userId: row.userid
        }).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '禁用成功',
              type: 'success',
              duration: DURATION,
              onClose: () => {
                this._getUser()
              }
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: DURATION
            })
          }
        })
      },
      enableUser (row) {
        putData('/zk/enableUser', {
          userId: row.userid
        }).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '允许成功',
              type: 'success',
              duration: DURATION,
              onClose: () => {
                this._getUser()
              }
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: DURATION
            })
          }
        })
      },
      sureHandler(row, message) {
        this.$confirm(`确定${message}该用户?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          switch (message) {
            case '删除': 
              this.deleteUser(row)
              break
            case '禁用':
              this.disableUser(row)
              break
            case '允许':
              this.enableUser(row)
              break
          }
        })
      },
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

