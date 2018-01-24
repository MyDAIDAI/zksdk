<template>
  <div class="open">
    <layout :title="title" :isBack="back" :active="active">
      <div style="padding:100px 10px;text-align: center">
        <h2>您确定使用远程进行开门？</h2>
        <div style="padding: 0px 50px">
          <x-button style="margin-top: 5em" type="primary" @on-click="openDoor">确定</x-button>          
        </div>
      </div>
    </layout>
    <alert :open="checked" @on-confirm="() => {checked = false}">开门成功！</alert>
  </div>
</template>
<script>
import Layout from '@/layouts/Mobile'
import XButton from '@/base/button'
import {putData} from '@/util/http'
import Alert from '@/base/alert'
import {ERR_OK} from '@/api/config'
export default {
  name: 'open',
  components: {
    Layout,
    XButton,
    Alert
  },
  data () {
    return {
      checked: false
    }
  },
  created () {
    this.title = '中控sdk'
    this.back = false
    this.active = 3
  },
  methods: {
    openDoor () {
      putData('/zk/openDoor', {}).then((res) => {
        if (res.code === ERR_OK) {
          this.checked = true                 
        } else {
        }
      })
    }
  }
}
  
</script>
