<template>
  <div class="user">
    <layout :activeIndex="activeIndex" :menu="menuData">
      <div style="width: 50%; padding: 50px" >
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="form.privilege" placeholder="请选择用户类型">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通行状态">
            <el-switch v-model="form.enabled" :active-value="activeValue" :inactive-value="inactiveValue" active-text="允许" inactive-text="禁用"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createUser" v-if="!isModify">创建</el-button>
            <el-button type="primary" @click="modifyUser" v-else>修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </layout>
  </div>
</template>

<script>
  import layout from '@/layouts/layout'
  import {getData, putData} from '@/util/http'
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
          privilege: '',
          enabled: true
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
        this.menu.push({
          link: `/user/${this.userId}`,
          title: '修改用户',
          icon: 'el-icon-edit',
          active: '4'
        })
      }
    },
    mounted () {
      this._getUserInfo()
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
            this.form.privilege = data.privilege === 3 ? '管理员' : '普通用户'
            this.form.enabled = data.enabled
          }
        })
      },
      createUser () {
        postData('/zk/createUser', this.form).then((res) => {
          console.log(res)
        })
      },
      modifyUser () {
        this.form.privilege = this.form.privilege === '管理员' ? 3 : 0
        console.log(typeof this.userId)
        let data = Object.assign({}, this.form, {userId: this.userId})
        putData('/zk/updateUser', data).then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>

<style>

</style>




