import Vue from 'vue'
import './plugins/bootstrap-vue'
import Test from './test.vue'
import router from './router'
//import { BootstrapVue, BootstrapVueIcons,BIcon } from 'bootstrap-vue'
//import BootstrapVue from './bootstrap-vue/dist/bootstrap-vue.esm';
//import BootstrapVue from './plugins/popper.min'

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(Test)
}).$mount('#app')


