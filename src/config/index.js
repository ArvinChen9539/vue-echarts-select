/**
 * Created by ArvinChen9539 on 2018/1/2.
 */
//通用图表配置
let chartProps = {
  colors: {
    default: () => {
      return null
    }
  },
  backgroundColor:'',
  noClickRender:false,//点击时是否不重新渲染
  chartTitle:'',
  chartSubtext:'',
  clickFun:Function
};

let chartI = {

};

let defOptions = {};

//获取子到父的图表配置项
let getConfig = (vm) =>{
  let res = {uid:vm._uid};
  for (let key of Object.keys(chartProps)) {
    res[key] = vm[key]
  }
  return res;
};

const init = function(defOptions1,chartI1){
  defOptions = defOptions1;
  chartI = chartI1;
};
export {
  chartProps,
  getConfig,
  chartI,
  defOptions,
  init
}
