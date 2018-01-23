<template>
  <div class="create">
    <div class="group">
      <input-option :type="inputType.text" class="item" :name="userLabel.name" :value="user.name" @update:value="updateData('name')"></input-option>
    </div>
    <div class="group">
      <input-option :type="inputType.password" class="item" :name="userLabel.password" :value="user.password" @update:value="updateData('password')"></input-option>
    </div>
    <div class="group">
      <radio-option class="item" :name="userLabel.userpass" :options="userPass" :value="user.userpass" @update:value="updateData('userpass')"></radio-option>
    </div>
    <div class="group">
      <select-option class="item" :options="userType" :name="userLabel.usertype" :value="user.usertype" @update:value="updateData('usertype')"></select-option>
    </div>
    <div style="margin-top: 1em; padding: 10px">
      <cube-button :disabled="buttonDisabled" >创建用户</cube-button>
    </div>
  </div>
</template>

<script>
import InputOption from '@/base/input-option/input-option'
import RadioOption from '@/base/radio-option/radio-option'
import SelectOption from '@/base/select-option/select-option'
export default {
  name: 'create',
  components: {
    InputOption,
    RadioOption,
    SelectOption
  },
  data () {
    return {
      buttonDisabled: true,
      userType: [{
        text: '管理员',
        value: '管理员'
      },{
        text: '普通用户',
        value: '普通用户'
      }],
      userPass: ['禁用', '允许'],
      inputType: {
        text: 'text',
        password: 'password'
      },
      userLabel: {
        name: '姓名',
        password: '密码',
        usertype: '用户类型',
        userpass: '通行状态',
      },
      user: {
        name: '',
        password: '',
        usertype: '',
        userpass: '允许',
        userset: ''
      }
    }
  },
  methods: {
    updateData (newVal, data) {
      this.user[data] = newVal
    }
  },
  watch: {
    
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .create
    height: 100%
    // border: 1px solid rgba(0, 0, 0, .1)
    border-radius: 5px
    transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
    // background: #ffffff
    .group
      border: 1px solid rgba(0,0,0,.1)
      border-radius: 5px
      .item
        height: 52px
        border-bottom: 1px solid rgba(0,0,0,.1) 
</style>
