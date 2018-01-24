<template>
  <button :class="classes" :disabled="disabled" :type="nativeType" @click="clickHandler">
    <slot></slot>
  </button>
</template>

<script>
import { button } from '@/util/mixins.js'
export default {
  name: 'XButton',
  mixins: [button],
  computed: {
    classes () {
      return [this.$cssPrefix + 'btn', this.type ? (this.$cssPrefix + 'btn-' + this.type) : this.clas]
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('on-click', e)
    }
  }
}
</script>
