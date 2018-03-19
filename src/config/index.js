/**
 * Created by ArvinChen9539 on 2018/1/2.
 */
//通用图表配置
let chartProps = {
  colors: {
    default: () => {
      return null
    }
  }
};

//获取子到父的图表配置项
let getConfig = (vm) =>{
  let res = {};
  for (let key of Object.keys(chartProps)) {
    res[key] = vm[key]
  }
  return res;
};
export {
  chartProps,
  getConfig
}
