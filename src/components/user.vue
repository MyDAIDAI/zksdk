<template>
  <div class="user">
    <layout :activeIndex="activeIndex" :menu="menuData">
      <div style="width: 50%; padding: 50px" >
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="usertype">
            <el-select v-model="form.usertype" placeholder="请选择用户类型">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通行状态" prop="enabled">
            <el-switch v-model="form.enabled" :active-value="activeValue" :inactive-value="inactiveValue" active-text="允许" inactive-text="禁用"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="validateUser('create')" v-if="!isModify">创建</el-button>
            <el-button type="primary" @click="validateUser('modify')" v-else>修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </layout>
  </div>
</template>

<script>
  import layout from '@/layouts/layout'
  import {getData, putData, postData} from '@/util/http'
  import {ERR_OK} from '@/api/config'
  export default {
    name: 'user',
    components: {
      layout
    },
    data () {
      return {
        menuData: [{
          link: '/list',
          title: '获取用户',
          icon: 'el-icon-tickets',
          active: '1'
        }, {
          link: '/user/create',
          title: '创建用户',
          icon: 'el-icon-plus',
          active: '2'
        }, {
          link: '/open',
          title: '远程开门',
          icon: 'el-icon-phone-outline',
          active: '3'
        }],
        userId: '',
        form: {
          name: '',
          password: '',
          usertype: '',
          enabled: true
        },
        rules: {
          name:  [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          usertype:  [{ required: true, message: '请选择用户类型', trigger: 'change' }],
          password: [],
          enabled: []
        },
        activeIndex: '2',
        activeValue: true,
        inactiveValue: false,
        isModify: false
      }
    },
    created () {
      this.userId = this.$route.params.id
      this.isModify = this.userId === 'create' ? false : true
      if (this.isModify) {
        this.menuData.push({
          link: `/user/${this.userId}`,
          title: '修改用户',
          icon: 'el-icon-edit',
          active: '4'
        })
        this.activeIndex = '4'
      }
    },
    mounted () {
      if (this.isModify) {
        this._getUserInfo()
      }
    },
    methods: {
      _getUserInfo () {
        getData('/zk/getUserInfo', {
          userId: this.userId
        }).then((res) => {
          if (res.code === ERR_OK) {
            let data = res.data
            this.form.name = data.name
            this.form.password = data.password
            this.form.usertype = data.privilege === 3 ? '管理员' : '普通用户'
            this.form.enabled = data.enabled
          }
        })
      },
      validateUser (message) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (message === 'create') {
              this.createUser()
            } else {
              this.modifyUser()
            }
          } else {
            return false
          }
        })
      },
      createUser () {
        this.form.privilege = this.form.usertype === '管理员' ? 3 : 0
        let data = Object.assign({}, this.form, {userId: parseInt(Math.random() * 100 + 1).toString()})
        postData('/zk/createUser', data).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '创建用户成功',
              type: 'success',
              onClose: () => {
                this.$refs.form.resetFields()
              }
            })
          }
        })
      },
      modifyUser () {
        this.form.privilege = this.form.usertype === '管理员' ? 3 : 0
        let data = Object.assign({}, this.form, {userId: this.userId})
        putData('/zk/updateUser', data).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '用户信息修改成功, 跳转用户列表',
              type: 'success',
              onClose: () => {
                this.$router.push({
                  path: '/list'
                })
              }
            })
          }
        })
      }
    }
  }
</script>

<style>

</style>




