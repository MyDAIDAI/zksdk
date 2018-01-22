<template>
  <div>
    <layout :activeIndex="activeIndex">
      <el-row style="padding: 30px">
        <el-col :span="24" style="display: flex; justify-content: flex-end">
          <el-button type="primary" icon="el-icon-error" @click="sureHandler('禁用选择')">禁用</el-button>
          <el-button type="primary" icon="el-icon-success" @click="sureHandler('允许选择')">允许</el-button>
        </el-col>
      </el-row>
      <div style="padding: 0 30px">
        <el-table
          :data="tableData"
          @selection-change="selectData"
          border
          style="width: 100%">
           <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
              <el-button @click="sureHandler('禁用', scope.row)" type="text" size="small" v-if="scope.row.set">禁用</el-button>
              <el-button @click="sureHandler('允许', scope.row)" type="text" size="small" v-else>允许</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="modifyUser(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="sureHandler('删除', scope.row)" type="text" size="small">删除</el-button>
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
  import layout from '@/layouts/Desktop'
  import {getData, deleteData, putData} from '@/util/http'
  import {ERR_OK} from '@/api/config'
  const DURATION = 2000
  const PAGE_SIZE = 15
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
        pageSize: PAGE_SIZE,
        page: 1,
        selectedData: []
      }
    },
    mounted () {
      this._getUser()
    },
    methods: {
      // 获取列表数据
      _getUser () {
        getData('/zk/listUser', {
          page: this.page,
          pageSize: PAGE_SIZE
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
      // 修改用户页面跳转
      modifyUser (row) {
        this.$router.push({
          path: `/user/${row.userid}`
        })
      },
      // 删除用户数据发送
      deleteUser (row) {
        deleteData('/zk/deleteUser', {
          userId: row.userid
        }).then((res) => {
          this.resMessage(res, '删除成功')
        })
      },
      // 禁用用户数据发送
      disableUser (row) {
        putData('/zk/disableUser', {
          userId: row.userid
        }).then((res) => {
          this.resMessage(res, '禁用成功')
        })
      },
      // 批量禁用用户数据发送
      batchDisableUser () {
        let userId = this.selectedData.map((elem) => {
          return elem.userid
        })
        putData('/zk/batchDisable', {
          userIds: userId
        }).then((res) => {
          this.resMessage(res, '禁用成功')
        })
      },
      // 允许用户数据发送
      enableUser (row) {
        putData('/zk/enableUser', {
          userId: row.userid
        }).then((res) => {
          this.resMessage(res, '允许成功')
        })
      },
      // 批量运行用户数据发送
      batchEnableUser () {
        let userId = this.selectedData.map((elem) => {
          return elem.userid
        })
        putData('/zk/batchEnable', {
          userIds: userId
        }).then((res) => {
          this.resMessage(res, '允许成功')
        })
      },
      // response提示
      resMessage (res, message) {
        if (res.code === ERR_OK) {
          this.$message({
            message: message,
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
      },
      // 操作提示处理
      sureHandler(message, row) {
        if ((message === '禁用选择' || message === '允许选择') && !this.selectedData.length) {
          this.$alert('您还未选择数据！', '操作提示', {
            confirmButtonText: '确定',
          })
          return
        }
        this.$confirm(`确定${message}用户?`, '提示', {
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
            case '禁用选择':
              this.batchDisableUser(row)
              break
            case '允许选择':
              this.batchEnableUser(row)
              break
          }
        })
      },
      // 表格选择
      selectData (selection) {
        this.selectedData = selection
      },
      // 表格翻页
      changeTable (currentPage) {
        this.page = currentPage
        this._getUser()
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
    padding-right: 30px
  }
</style>

