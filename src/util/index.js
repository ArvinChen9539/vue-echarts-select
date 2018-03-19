/**
 * Created by ArvinChen9539 on 2018/1/2.
 */
//从某对象中获取指定路径的属性值
let GET_O = (url, obj) => {
  let o = _.at(obj ? obj : this, url)[0];
  if (!o) {
    console.log(obj,'找不到对象\"' + url + '\"');
    return _.noop();
  }
  return o;
};

export {
  GET_O
}
