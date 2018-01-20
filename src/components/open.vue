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
  import layout from '@/layouts/layout'
  import {putData} from '@/util/http'
  import {ERR_OK} from '@/api/config'
  export default {
    name: 'open',
    components: {
      layout
    },
    created() {
      this.activeIndex = '3'
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
          }
        })
      }
    }
  }
</script>

<style>

</style>
