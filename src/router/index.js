import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import routes from './routes'
import Login from '@/views/login/login'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // ***********************************登录
    { path: '/', redirect: '/main' },
    {
      path: '/login',
      component: (resolve) => {
        Store.registerModule('login', Login)
        require(['../views/login/index.vue'], resolve)
      }
    },
    // ************************************主页面
    {
      path: '/main',
      component: (resolve) => {
        Store.registerModule('main', require('../views/main/main.js'))
        require(['../views/main/index.vue'], resolve)
      },
      children: routes,
      beforeEnter: (to, from, next) => {
        let isAuthorized = sessionStorage.getItem('Token')
        if (!isAuthorized) {
          next({ path: '/login' })
        } else {
          next()
        }
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // do something
  console.log('to => ' + to.path)
  next()
})

export default router
