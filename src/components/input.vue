<template>
  <div class="bm-input">
    <input
      class="bm-input__inner"
      :style="style"
      v-bind="$props"
      :value="currentValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur">
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'BmInput',
  data () {
    return {
      currentValue: this.value
    }
  },
  props: {
    styleObj: {
      background: String,
      paddingLeft: Number
    },
    value: [String, Number],
    placeholder: String,
    align: String,
    maxlength: Number,
    minlength: Number,
    type: String,
    disabled: {
      type: Boolean,
      default: false
    },
    name: String,
    width: [String, Number],
    background: {
      type: String,
      default: '#ffffff'
    }
  },
  methods: {
    setCurrentValue (value) {
      if (value === this.currentValue) return
      this.currentValue = value
    },
    handleBlur (event) {
      this.$emit('blur', event)
    },
    handleFocus (event) {
      this.$emit('focus', event)
    },
    handleInput (event) {
      const value = event.target.value
      this.$emit('input', value)
      this.setCurrentValue(value)
      this.$emit('change', value)
    }
  },
  computed: {
    style () {
      let obj = {}
      this.align && (obj['text-align'] = this.align)
      if (this.width) {
        // console.log(this.width)
        obj['padding-left'] = this.width.indexOf('px') > 0 ? this.width : this.width + 'px'
      }
      if (this.background) {
        obj['background-color'] = this.background
      }
      return obj
    }
  },
  watch: {
    'value' (val, oldValue) {
      this.setCurrentValue(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.bm-input{
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;

  &__inner{
    -webkit-appearance: none;
    border-radius: 4px;
    border: none;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 50px;
    line-height: 1;
    outline: none;
    padding: 0 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    background-color: #fff;
  }
  span{
    position: absolute;
    top: 16px;
    left: 10px;
    color: #606266;
  }
}
</style>
