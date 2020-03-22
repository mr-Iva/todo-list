import Vue from 'vue'
import VueRouter from 'vue-router'

import mainPage from '../views/MainPage.vue'
import settings from '../views/Settings.vue'
import authorization from '../views/Authorization.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: mainPage, name: 'homePage' },
    { path: '/settings', component: settings, name: 'settings' },
    { path: '/authorization', component: authorization, name: 'auth' }
  ]
})

export default router
