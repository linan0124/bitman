// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import comments from 'components'
import VueTouch from 'vue-touch'
import VueScroller from 'vue-scroller'
import './permission.js'
import msgBox from 'components/msgbox/popup'
import tipNote from 'components/messages/masklayer'
import toast from 'components/toast/toast'
import echarts from 'echarts'

Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueScroller)

Vue.config.productionTip = false
Vue.prototype.$msgbox = msgBox
Vue.prototype.$tipNote = tipNote
Vue.prototype.$toast = toast
Vue.prototype.getIosToken = getIosToken
Vue.prototype.$echarts = echarts

Vue.prototype.getIosToken = {
  aer: 'eq'
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
