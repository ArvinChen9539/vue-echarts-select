/**
 * Created by ArvinChen9539 on 2017/11/1.
 */
import Vue from 'vue'
import Filter from './filter/index'
import _ from 'lodash'

import './css/common.css'
import './css/reset.css'
import App from './views/app.vue'

//过滤器
Vue.use(Filter)

Vue.prototype.GET_O = (url, obj) => {
  let o = _.at(obj ? obj : this, url)[0];
  if (!o) {
    console.log('找不到对象\"' + url + '\"');
    return _.noop();
  }
  return o;
};

new Vue({
  ...App
}).$mount('#app')
