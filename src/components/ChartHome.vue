<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
  import _ from 'lodash'
  import echarts from 'echarts'
  import {GET_O} from "../util";

  export default {
    name: "chart-home",
    data() {
      return {
        chartIds: [],//一组图表的uid
        charts: {},//一组图表的实例
        allOptions: {},//一组图表的配置项
        p_clickIndex: []//选中项的key
      }
    },
    props: {
      isClickMark:{//点击时是否标记
        default:false
      },
      isCancel: {//是否禁止最后一个取消标记
        type: Boolean,
        default: false,
      },
      isMultiple: {//图表是否多选 点击回调的选中参数不适用与异步加载的图表(如点击第一个图标第二个图标会重新加载  图一图二组合选中的情况)
        type: Boolean,
        default: false,
      },
      clickFun: {//点击图表时触发的函数,第一个参数是点击的项参考官方点击事件中的点击参数,第二个参数是对应的series参数,第三个参数是选中的结果对象
        type: Function
      },
      colors: {//图表可以使用的颜色数组
        type: Array,
        default: () => null
      },
      markColor: {
        default: '#33FF33'
      },
      markWidth: {
        default: '2'
      },
      backgroundColor: {
        type: String,
        default: null
      },
      chartOption: {
        type: Object,
        default: () => {
          return {
            title:{}
          }
        }
      },
      valueItem: {
        type: Object,
        default: () => {
          return {
            name: '',
            value: '',
            itemStyle: {
              normal: {}
            }
          }
        }
      },
      chartTypeConfig: {
        type: Object,
        default: () => {
          return {
            xy: {//类型名称
              type: [undefined, 'bar', 'line'],//包含的类型
              option: {//默认配置
                xAxis: [{}]
              }
            },
            pie: {
              type: ['pie'],
              series: {
                selectedMode: ""
              }
            }
          }
        }
      },
      dataItem: {
        type: Object,
        default: () => {
          return {
            name: '',
            value: '',
            itemStyle: {
              normal: {}
            }
          }
        }
      }
    },
    computed: {//计算属性
    },
    methods: {//函数
      /**
       * 点击标记逻辑处理
       * @param params
       * @param scope
       */
      clickMark(params, options, config) {
        let vm = this;
        params.uid = config.uid;
        let data = GET_O('series[' + params.seriesIndex + '].data[' + params.dataIndex + ']', options);
        if (_.isUndefined(data)) {
          console.error('数据异常,找不到需要的数据项!');
          return;
        }
        let itemStyleNormal = GET_O('itemStyle.normal', data);
        //不是饼图并且数据项为空
        if (!vm.isChart('pie', options) && _.isUndefined(itemStyleNormal)) {
          console.error('数据异常,找不到需要的数据项!');
          return;
        }
        //设置选中颜色
        if (!_.includes(vm.p_clickIndex, params.dataIndex + "-" + params.seriesIndex + "-" + config.uid)) {
          if (config.isMultiple || vm.isMultiple) {//是否多选
            if (vm.selected) {
              vm.selected.push(params);
            } else {
              vm.selected = [];
              vm.selected.push(params);
            }
            vm.p_clickIndex.push(params.dataIndex + "-" + params.seriesIndex + "-" + config.uid);
            //设置边框
            if (!vm.isChart('pie', options)) {
              options.series[params.seriesIndex].data[params.dataIndex].itemStyle.normal.borderColor = vm.markColor;
              options.series[params.seriesIndex].data[params.dataIndex].itemStyle.normal.borderWidth = vm.markWidth;
            } else {
              options.series[params.seriesIndex].data[params.dataIndex].selected = true;
            }
          } else {
            //取消所有标记
            _.each(vm.allOptions, (item, index) => {
              _.each(item.series, function (series, seriesIndex) {
                _.each(series.data, function (item1, index1) {
                  if (!vm.isChart('pie', item)) {
                    item1.itemStyle.normal.borderColor = undefined;
                    item1.itemStyle.normal.borderWidth = '0';
                  } else {
                    item1.selected = false;
                  }
                  // series.data.splice(index1, 1, item1)
                });
                //item.series.splice(seriesIndex, 1, series)
              });
            });
            //重新设置边框
            if (!vm.isChart('pie', options)) {
              options.series[params.seriesIndex].data[params.dataIndex].itemStyle.normal.borderColor = vm.markColor;
              options.series[params.seriesIndex].data[params.dataIndex].itemStyle.normal.borderWidth = vm.markWidth;
            } else {
              options.series[params.seriesIndex].data[params.dataIndex].selected = true;
            }
            //设置标记颜色的位置
            vm.p_clickIndex[0] = params.dataIndex + "-" + params.seriesIndex + "-" + config.uid;
            if (vm.selected && vm.selected[0]) {
              vm.selected[0] = params;
            } else {
              vm.selected = [];
              vm.selected.push(params);
            }
          }
        } else {//再次点击取消选中
          if (vm.isCancel || vm.p_clickIndex.length !== 1 || vm.isMultiple) {
            //取消边框标记
            if (!vm.isChart('pie', options)) {
              options.series[params.seriesIndex].data[params.dataIndex].itemStyle.normal.borderColor = undefined;
              options.series[params.seriesIndex].data[params.dataIndex].itemStyle.normal.borderWidth = '0';
            } else {
              options.series[params.seriesIndex].data[params.dataIndex].selected = false;
            }
            _.remove(vm.p_clickIndex, function (i) {
              if (i === params.dataIndex + "-" + params.seriesIndex + "-" + config.uid) {
                return true;
              }
            });
            _.remove(vm.selected, function (i) {
              if (i.dataIndex === params.dataIndex && i.seriesIndex === params.seriesIndex && i.uid === params.uid) {
                return true;
              }
            });
          }
        }
      },
      seriesItem(options) {
        return {//默认样式配置
          selectedMode: options.selectedMode,
          itemStyle: {//标记必要,不能为空
            normal: {}
          }
        };
      },
      isChart(type, options) {
        let o = GET_O('series[0].type', options);
        if (_.includes(this.chartTypeConfig[type].type, o)) {
          this.option = _.extend({}, this.chartTypeConfig[type].option, this.option);
          return true;
        }
        return false;
      },
      initOptions(options, config) {//初始化图表配置项
        let vm = this;
        //组合默认参数
        options = _.extend({},
          JSON.parse(JSON.stringify(vm.$echart.defOptions)),
          JSON.parse(JSON.stringify(vm.chartOption)), options);
        //组合颜色参数
        _.each(options.series, function (item, index) {
          //饼图官方交互
          //为饼图判断多选和单选
          if ((config.isMultiple || vm.isMultiple) && vm.isClickMark) {//多选
            options.series[index] = _.extend({}, vm.seriesItem({}), item);
          } else if ((config.clickFun || parent.clickFun) && vm.isClickMark) {//单选
            options.series[index] = _.extend({}, vm.seriesItem({}), item);
          } else {//没有交互效果
            options.series[index] = _.extend({}, vm.seriesItem({}), item);
          }

          //组合标准data
          _.each(item.data, function (dItem, dIndex) {
            if (_.isObject(dItem)) {
              options.series[index].data[dIndex] = _.extend({}, JSON.parse(JSON.stringify(vm.dataItem)), dItem);
            } else {
              options.series[index].data[dIndex] = _.extend({}, JSON.parse(JSON.stringify(vm.dataItem)), {value: dItem});
            }
          });
        });

        //初始化参数
        vm.p_clickIndex = [];

        //直角系图标坐标系默认配置
        if (vm.isChart('xy', options)) {
          options = _.extend({}, vm.chartTypeConfig.xy.option, options);
        }
        //饼图默认配置
        if (vm.isChart('pie', options)) {
          options = _.extend({}, vm.chartTypeConfig.pie.option, options);
        }
        //设置图表颜色列表
        if (vm.colors) {
          options.color = vm.colors;
        }
        //子组件配置颜色覆盖配置
        if (config.colors) {
          options.color = config.colors;
        }
        if (this.backgroundColor) {
          options.backgroundColor = vm.backgroundColor;
        }
        if (config.backgroundColor) {
          options.backgroundColor = config.backgroundColor;
        }

        //设置图表标题
        //设置图表标题
        if (config.chartTitle && options.title) {
          options.title.show = true;
          options.title.text = config.chartTitle;
          //设置图表副标题
          if (config.chartSubtext) {
            options.option.title.subtext = config.chartSubtext;
          }
        }
        return options;
      },
      initChart(chartRef, options, config = {}, chart) {
        let vm = this;
        //保存需要控制的图表组件uid和初始化
        if (!_.includes(this.chartIds, config.uid)) {
          chart = echarts.init(chartRef);
          vm.chartIds.push(config.uid);
        } else {
          chart = echarts.getInstanceByDom(chartRef);
        }

        options = vm.initOptions(options, config);

        //绑定点击事件
        if (config.clickFun || vm.clickFun) {
          chart.off('click');//清除点击事件
          chart.on('click', function (params) {
            //点击标记
            if (vm.isClickMark) {
              vm.clickMark(params, options, config);
            }
            if (config.clickFun) {
              config.clickFun(params, options.series[params.seriesIndex], vm.selected);
            }
            //父回调函数(如果父指令存在点击事件,所有的子指令在点击时都会触发父点击事件)
            if (vm.clickFun) {
              vm.clickFun(params, options.series[params.seriesIndex], vm.selected);
            }
            //改变图表颜色配置后立即重新加载图表配置
            //饼图不用重设配置,手动设置不渲染的不执行渲染操作
            if (!config.noClickRender) {
              _.each(vm.charts, (item, index) => {
                item.setOption(vm.allOptions[index]);
              });
            }
            //发送选中事件
            vm.$emit("selected", vm.selected);
          });
        }

        //设置图表配置
        /*if (options.series) {
          chart.setOption(options);
        }*/
        vm.charts[config.uid] = chart;
        vm.allOptions[config.uid] = options;
        chart.setOption(options);
      }
    },
    mounted() {
      //this.goPage(1);
      //todo 获取ref属性初始化图表显示
      //todo 点击图表时触发selected事件  charthome包含的图表是一整个组件  选中和取消都由charthome内部处理  一组图表需要定义新的组件
    }
  }
</script>

<style scoped>

</style>
