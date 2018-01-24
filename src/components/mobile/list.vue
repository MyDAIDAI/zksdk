<template>
  <div>
    <layout :title="title" :isBack="back" :active="active"></layout>
  </div>
</template>

<script>
  import Layout from '@/layouts/Mobile'

  export default {
    name: 'list',
    components: {
      Layout
    },
    created () {
      this.title = '中控sdk'
      this.back = false
      this.active = 0
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>