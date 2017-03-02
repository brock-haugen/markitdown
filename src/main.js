import Vue from 'vue'
import router from './router'
import './firebase'

import VueHead from 'vue-head'
Vue.use(VueHead)

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI, { locale })

import AuthMixin from 'mixins/auth'
Vue.mixin(AuthMixin)

import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  head: {
    title () {
      return {
        inner: 'markitdown',
        separator: '|',
        complement: [this.$route.name].concat(Object.values(this.$route.params))
      }
    },
    link: [
      { rel: 'shortcut icon', href: require('./assets/logo.svg') }
    ],
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
    ]
  },
  router,
  template: '<App />',
  components: { App },
  watch: {
    $route (n, o) {
      this.$emit('updateHead')
    }
  }
})
