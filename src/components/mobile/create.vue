<template>
  <div class="create">
    <layout :title="title" :isBack="back" :active="active">
      <x-form>
        <x-form-item>
          <span slot="label">姓名</span>
          <x-input v-model="form.name" placeholder="请填写姓名" :clear="false" required/>
        </x-form-item>
        <x-form-item>
          <span slot="label">密码</span>
          <x-input v-model="form.password" placeholder="请填写密码" :htmlType="passwordType" :clear="false"/>          
        </x-form-item>
        <x-form-item>
          <span slot="label">用户类型</span>
          <x-select
            v-model="form.usertype"
            :options="typeOptions"
            placeholder="请选择"
            required/>
        </x-form-item>
        <divider></divider>
        <x-form-item>
          <span slot="label">通行状态</span>
          <x-switch v-model="form.enabled"/>
        </x-form-item>
        <br />
        <div style="padding:0px 10px;">
          <x-button type="primary" @on-click="validateData">创建用户</x-button>
        </div>
      </x-form>
    </layout>
    <alert :open="checked" @on-confirm="() => {checked = false}">{{alertMessage}}</alert>
  </div>
</template>

<script>
  import Layout from '@/layouts/Mobile'
  import {XForm, XFormItem} from '@/base/form'
  import XButton from '@/base/button'
  import XInput from '@/base/input'
  import XSelect from '@/base/select'
  import Divider from '@/base/divider'
  import XSwitch from '@/base/switch'
  import Alert from '@/base/alert'
  import {getData, putData, postData} from '@/util/http'
  import {ERR_OK} from '@/api/config';
  export default {
    name: 'create',
    components: {
      Layout,
      XForm,
      XFormItem,
      XButton,
      XInput,
      XSelect,
      Divider,
      XSwitch,
      Alert
    },
    created () {
      this.title = '中控sdk',
      this.back = false
      this.active = 1
      this.passwordType = 'password'
    },
    data () {
      return {
        form: {
          name: '',
          password: '',
          usertype: '',
          enabled: true
        },
        typeOptions: [
          {
            label: '管理员',
            value: '3',
            selected: true
          },
          {
            label: '普通用户',
            value: '0'
          }
        ],
        alertMessage: '',
        checked: false
      }
    },
    methods: {
      validateData () {
        if (!this.form.name) {
          this.alertMessage = '请填写姓名!'
          this.checked = true
          return
        }
        if (!this.form.usertype) {
          this.alertMessage = '请选择用户类型!'
          this.checked = true
          return
        }
        if (this.form.name && this.form.usertype) {
          this.createUser()
          return
        }
      },
      createUser () {
        let userData = {
          name: this.form.name,
          password: this.form.password,
          privilege: parseInt(this.form.usertype),
          enabled: this.form.enabled
        }
        let data = Object.assign({}, userData, {userId: parseInt(Math.random() * 100 + 1).toString()})
        postData('/zk/createUser', data).then((res) => {
          if (res.code === ERR_OK) {
            this.alertMessage = '用户创建成功!'
            this.checked = true
            this.form = {
              name: '',
              password: '',
              usertype: '',
              enabled: true
            }
          } else {
            this.alertMessage = res.msg
            this.checked = true
          }
        })
      },
    },
  }
</script>