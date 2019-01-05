import Vue from 'vue'
import button from './button'
import input from './input'
import back from './back'
import checkbox from './checkbox'
import successBox from './successBox'
import speedupList from './speedList'
import hint from './hint'
import graybutton from './graybutton'
import item from './verifyItem'

const components = [
  button,
  input,
  back,
  checkbox,
  successBox,
  speedupList,
  hint,
  graybutton,
  item
]

components.forEach(k => {
  Vue.component(k.name, k)
})

export default components
