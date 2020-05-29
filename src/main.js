import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)

NProgress.inc(0.2)
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
