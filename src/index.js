/**
 * Created by ArvinChen9539 on 2018/1/2.
 * 安装入口
 */
import ChartHome from './components/ChartHome';
import BaseBar from './components/charts/BaseBar';
import BasePie from './components/charts/BasePie';


const components = {
  ChartHome,
  BaseBar,
  BasePie
};

const install = function(Vue, opts = {},chartI) {
  if (install.installed) return;

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });

  Vue.prototype.$echartOptions = opts;
  Vue.prototype.$chartI = chartI;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

