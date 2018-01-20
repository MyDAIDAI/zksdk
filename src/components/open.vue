<template>
  <div class="open">
    <layout :activeIndex="activeIndex">
      <div>
        <h3>您确定使用远程进行开门？</h3>
      </div>
      <div style="margin-top: 20px">
        <el-button type="primary" size="small">确定</el-button>        
      </div>
    </layout>
  </div>
</template>

<script>
  import layout from '@/layouts/layout'
  export default {
    name: 'open',
    components: {
      layout
    },
    created() {
      this.activeIndex = '3'
    }
  }
</script>

<style>

</style>
