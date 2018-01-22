<template>
  <div class="open">
    <div>
      <div class="title">
        <h3>您确定使用远程进行开门？</h3>
      </div>
      <div style="padding: 20px 40px">
        <cube-button @click="openDoor">确认开门</cube-button>
      </div>
    </div>
  </div>
</template>

<script>
import {putData} from '@/util/http'
import {ERR_OK} from '@/api/config'

export default {
  name: 'open',
  methods: {
    openDoor () {
      putData('/zk/openDoor', {}).then((res) => {
        if (res.code === ERR_OK) {
         this.$createDialog({
            type: 'alert',
            title: '操作提示',
            content: '开门成功',
            icon: 'cubeic-alert'
          }).show()
        } else {
          this.$createDialog({
            type: 'alert',
            title: '操作提示',
            content: res.msg,
            icon: 'cubeic-alert'
          }).show()
        }
      })
    }
  }
}
</script>

<style>
  .open {
    height: 100%;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 5px;
    transform: rotate(0deg);
    overflow: hidden;
    background: #ffffff;
  }
  .title {
    height: 200px;
    width: 100%;
    text-align: center;
    font-size: 1.2em;
    line-height: 200px
  }
</style>
