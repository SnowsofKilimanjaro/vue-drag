import Vue from 'vue/dist/vue'
import Router from 'vue-router'
import LayOut from '@/components/LayOut'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LayOut',
      component: LayOut
    }
  ]
})
