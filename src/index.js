/**
 * Created by ArvinChen9539 on 2018/1/2.
 * 安装入口
 */
import ChartHome from './components/ChartHome';
import BaseBar from './components/charts/BaseBar';
import BasePie from './components/charts/BasePie';
import * as config from './config'


const components = {
  ChartHome,
  BaseBar,
  BasePie
};

const install = function(Vue, opts = {},chartI = {}) {
  if (install.installed) return;

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
  Vue.prototype.$echartOptions = Object.assign(config.defOptions,opts);
  Vue.prototype.$chartI = Object.assign(config.chartI,chartI);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

let exports = {
  install
}
export default exports;
