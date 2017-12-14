/**
 * Created by ArvinChen9539 on 2017/11/10.
 */
const exp = {
  install(Vue){
    Vue.filter('toNumber',function(value){
      return parseInt(value);
    })
  }
}
export default exp;
