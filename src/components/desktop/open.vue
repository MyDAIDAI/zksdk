<template>
  <div class="open">
    <layout :activeIndex="activeIndex">
      <div>
        <div>
          <h3>您确定使用远程进行开门？</h3>
        </div>
        <div style="margin-top: 20px">
          <el-button type="primary" size="small" @click="openDoor">确定</el-button>        
        </div>
      </div>
    </layout>
  </div>
</template>

<script>
  import layout from '@/layouts/Desktop'
  import {putData} from '@/util/http'
  import {ERR_OK} from '@/api/config'
  export default {
    name: 'open',
    components: {
      layout
    },
    created() {
      this.activeIndex = '4'
    },
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      openDoor () {
        putData('/zk/openDoor', {}).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '开门成功',
              type: 'success'
            })
            this.isOpen = true
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: DURATION
            })
          }
        })
      }
    }
  }
</script>

<style>

</style>
