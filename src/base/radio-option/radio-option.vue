<template>
  <div class="radio-option">
    <span class="name" style="background: #fff">{{ name }}</span>
    <cube-radio ref="cubeRadio" v-model="radioValue" :options="options" :horizontal="true"/>
  </div>
</template>

<script>
import {removeClass} from '@/util/dom'
export default {
  name: 'radio-option',
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    name: {
      type: String,
      default: ''
    }
  },
  mounted () {
    let radioChilden = this.$refs.cubeRadio.$el.children
    radioChilden = Array.from(radioChilden)
    radioChilden.forEach(element => {
      removeClass(element, 'border-right-1px')
    })
  },
  data () {
    return {
      radioValue: this.value
    }
  },
  watch: {
    radioValue: function (newValue) {
      this.$emit('update:value', newValue)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/variable.styl"

  .radio-option
    display: flex
    height: 100%
    justify-content space-between
    align-items stretch
    background $color-white
    touch-action: none
    .cube-radio-group[data-horz=true]
      &:after
        display: none !important
    .name
      flex: 0 0 auto
      width: 120px
      display inline-flex
      padding-left: 10px
      align-items center
      

</style>