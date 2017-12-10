import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import contact from '@/components/contact'
import product from '@/components/product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/product',
      name: 'product',
      component: product
    }
  ]
})
