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
    { path: '/', component: mainPage },
    { path: '/settings', component: settings },
    { path: '/authorization', component: authorization }
  ]
})

export default router
