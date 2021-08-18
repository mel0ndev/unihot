import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

export const eventBus = new Vue(); 

Vue.use(VueRouter);


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
