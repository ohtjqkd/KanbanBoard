// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/axios'
import App from './App'
import router from './router'
import GAuth from 'vue3-google-oauth2'
Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
const gAuthOptions = {
  clientId: '1066142769848-nb4mnr77e05v52jjpear80vu8mvjvt6v.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
  fetch_basic_profile: false
}
app.use(GAuth, gAuthOptions)
