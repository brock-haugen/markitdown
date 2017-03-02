import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Mark from 'views/Mark'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/:id',
      name: 'Mark',
      component: Mark
    }
  ]
})

export default router
