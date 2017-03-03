import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import settings from 'settings'
const checkAuth = () => !!localStorage.getItem(settings.authToken)

import Composer from 'views/Composer'
import SharedPreview from 'views/SharedPreview'
import Welcome from 'views/Welcome'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/composer/:id',
      name: 'Composer',
      component: Composer
    },
    {
      path: '/composer',
      name: 'ComposerHome',
      component: Composer
    },
    {
      path: '/:userId/:id',
      name: 'Preview',
      component: SharedPreview,
      meta: { public: true }
    },
    {
      path: '/',
      component: Welcome,
      meta: { public: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = checkAuth()
  if (!auth && to.meta.public !== true) {
    next('/')
  } else if (to.path === '/' && auth) {
    next({name: 'ComposerHome'})
  } else {
    next()
  }
})

export default router
