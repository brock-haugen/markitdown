import Vue from 'vue'
import settings from 'settings'
import Router from 'vue-router'

Vue.use(Router)

const checkAuth = () => !!localStorage.getItem(settings.authToken)

import List from 'views/List'
import Mark from 'views/Mark'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/mark/:id',
      name: 'Mark',
      component: Mark
    },
    {
      path: '/',
      name: 'Home',
      component: List
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.private && !checkAuth()) {
    next('/')
  } else {
    next()
  }
})

export default router
