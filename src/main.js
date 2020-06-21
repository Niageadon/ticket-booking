import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import VueTelInputVuetify from 'vue-tel-input-vuetify'
import '@/styles/index.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(require('vue-moment'));

Vue.use(VueTelInputVuetify, {
  vuetify,
});

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
