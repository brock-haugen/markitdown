import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Mark from 'views/Mark'
import SharedPreview from 'views/SharedPreview'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/:userId/:id',
      name: 'Preview',
      component: SharedPreview
    },
    {
      path: '/:id',
      name: 'Mark',
      component: Mark
    }
  ]
})

export default router
