
import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from 'utils/auth' // 验权
import judgeClient from 'utils/ifclient'

if (judgeClient) {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) { // 判断是否有token
      if (to.path === '/login') {
        next({ path: '/index' })
        NProgress.done()
      } else {
        next()
      }
    } else {
      if (to.path === '/login') {
        next()
      } else {
        if (to.path !== '/sign') {
          next({path: '/login'})
        } else {
          next()
        }
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    NProgress.done() // 结束Progress
  })
} else {
  router.beforeEach((to, from, next) => {
    if (getToken()) { // 判断是否有token
      next()
    } else {
      ClientObject.exitApp()
    }
  })
}
