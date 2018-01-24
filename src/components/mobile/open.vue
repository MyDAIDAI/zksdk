<template>
  <div class="open">
    <layout :title="title" :isBack="back" :active="active">
      <div style="padding:100px 10px;text-align: center">
        <h2>您确定使用远程进行开门？</h2>
        <div style="padding: 0px 50px">
          <x-button style="margin-top: 5em" type="primary">确定</x-button>          
        </div>
      </div>
    </layout>
  </div>
</template>
<script>
import Layout from '@/layouts/Mobile'
import XButton from '@/base/button'
export default {
  name: 'open',
  components: {
    Layout,
    XButton
  },
  created () {
    this.title = '中控sdk'
    this.back = false
    this.active = 3
  },
}
  
</script>
