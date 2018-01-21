<template>
  <layout :title="title"></layout>
</template>

<script>
import layout from '@/layouts/Mobile'
export default {
  name: 'list',
  components: {
    layout
  },
  created () {
    this.title = '中控sdk'
  }

}
</script>

<style>

</style>
