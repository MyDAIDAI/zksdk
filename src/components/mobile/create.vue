<template>
  <div class="create">
    <layout :title="title" :isBack="back" :active="active">
      <x-form @on-submit="submitHandler" :validator="formValidator">
        <x-form-item>
          <span slot="label">姓名</span>
          <x-input v-model="form.name" :clear="false" required/>
        </x-form-item>
        <x-form-item>
          <span slot="label">密码</span>
          <x-input v-model="form.password" :htmlType="passwordType" :clear="false"/>          
        </x-form-item>
        <x-form-item>
          <span slot="label">用户类型</span>
          <x-select
            v-model="form.usertype"
            :options="typeOptions"
            placeholder="请选择"
            required
            />
        </x-form-item>
        <divider></divider>
        <x-form-item>
          <span slot="label">通行状态</span>
          <x-switch v-model="form.status"/>
        </x-form-item>
        <br />
        <div style="padding:0px 10px;">
          <x-button type="primary" htmlType="submit">创建用户</x-button>
        </div>
      </x-form>
    </layout>
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
      XSwitch
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
          status: true
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
        ]
      }
    },
    methods: {
      formValidator () {
        console.log('formValidator')
      },
      submitHandler () {
        // window.$toast({
        //   type: 'loading',
        //   content: '数据中...',
        //   onClose: () => {
        //     window.$toast({
        //       type: 'success',
        //       content: '数据提交成功！'
        //     })
        //   }
        // })
      }
    },
  }
</script>