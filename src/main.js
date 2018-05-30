/**
 * Created by ArvinChen9539 on 2017/11/1.
 * demo 入口
 */
import Vue from 'vue'
import './css/common.css'
import './css/reset.css'
import App from './views/app.vue'
import VueChart from './index';

Vue.use(VueChart,{

});
new Vue({
  ...App
}).$mount('#app')
