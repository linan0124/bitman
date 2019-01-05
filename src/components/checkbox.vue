<template>
  <label class="bm-checkbox">
    <span class="bm-checkbox__input"
      :class="{'is-checked': currentValue}"
    >
      <span class="bm-checkbox__inner"></span>
      <input
        class="bm-checkbox__original"
        type="checkbox"
        v-model="currentValue"
        @change="handleChange">
    </span>
    <span class="bm-checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'BmCheckbox',
  data () {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: {},
    checked: Boolean
  },
  methods: {
    handleChange () {
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
    }
  },
  computed: {
    isChecked () {
      return this.model
    }
  }
}
</script>

<style lang="scss" scoped>
.bm-checkbox{
  &__input{
    white-space: nowrap;
    outline: none;
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }
  &__inner{
    display: inline-block;
    position: relative;
    // border: 1px solid #dcdfe6;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 3px;
    z-index: 1;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)
  }
  &__original{
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }
  &__label{
    display: inline-block;
    padding-left: 10px;
    font-size: 14px;
  }

  .is-checked .bm-checkbox__inner::after{
    content: '';
    position: absolute;
    top: 0px;
    left: 1px;
    background: url('/static/images/down.png');
    background-size: cover;
    width: 19px;
    height: 15px;
  }
}
</style>
