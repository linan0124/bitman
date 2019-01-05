<template>
  <div class="bm-verification">
    <div class="bm-row">
      <div class="bm-col" v-for="(item, index) in currentValue" :key="index" :class="`bm-col${index}`">
        <bm-input align="center" type="number" :maxlength="1" @input="changeInput($event, index)"></bm-input>
      </div>
    </div>
  </div>
</template>

<script>
import BmInput from './input'
export default {
  data () {
    return {
      currentValue: [0, 0, 0, 0, 0, 0]
    }
  },
  props: {
    value: [String, Number]
  },
  components: {BmInput},
  methods: {
    changeInput (ev, index) {
      let tvalue = ''
      this.currentValue.splice(index, 1, ev)
      $('.bm-col' + index).find('input').blur()
      $('.bm-col' + (index + 1)).find('input').focus()
      this.currentValue.forEach(k => {
        tvalue = tvalue + k
      })
      this.$emit('input', tvalue)
    }
  }
}
</script>

<style lang="scss" scoped>
.bm-verification{
  // text-align:
}
.bm-row{
  overflow: hidden;
  margin: 0 -5px;

  .bm-col{
    width: 16.66667%;
    padding: 0 5px;
    box-sizing: border-box;
    float: left;
  }
}
</style>
