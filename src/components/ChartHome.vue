<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
  import _ from 'lodash'
  import echarts from 'echarts'

  export default {
    name: "chart-home",
    data() {
      return {
        chartIds: []
      }
    },
    props: {
      options: {
        default: () => {
        },
      },
      selected: {//多选时选中的对象
        default: () => [],
      },
      vModel: {//未知用途
        default: () => [],
      },
      isCancel: {//是否禁止最后一个取消标记
        type: Boolean,
        default: false,
      },
      isMultiple: {//图表是否多选//点击回调的选中参数不适用与异步加载的图标(如点击第一个图标第二个图标会重新加载  图一图二组合选中的情况)
        type: Boolean,
        default: false,
      },
      clickFun: {
        type: Function
      },
      colors: {
        type: Array,
        default: () => []
      },
      backgroundColor: {
        type: String,
        default: 'red'
      },
      chartOption: {
        type: Object,
        default: () => {
          return {
            title: {
              x: 'center',
              show: false,
              text: '',
              textStyle: {
                fontSize: 20
              },
              subtext: '',
              subtextStyle: {
                fontSize: 16
              }
            },
            legend: {
              textStyle: {
                color: 'white'
              },
              orient: 'horizontal',
              x: 'center'
            },
            grid: {
              top: 50
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            }
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
              normal: {
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
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
                xAxis: [{
                  boundaryGap: ['20%', '20%'],
                  axisLabel: {
                    interval: 0,
                    rotate: 30
                  }
                }]
              }
            },
            pie: {
              type: ['pie'],
              option: {},
              series: {
                selectedMode: ""
              }
            }
          }
        }
      }
    },
    computed: {//计算属性
      option: () => {
        return '1'
      }
    },
    methods: {//函数
      seriesItem(options) {
        return {//默认样式配置
          barMaxWidth: 50,
          barCategoryGap: '30%',
          selectedMode: options.selectedMode,
          selectedOffset: 10,
          itemStyle: {//标记必要,不能为空
            normal: {}
          }
        };
      },
      isChart(type) {
        let o = this.GET_O('option.series[0].type', this.option);
        if (_.includes(this.chartTypeConfig[type].type, o)) {
          this.option = _.extend({}, this.chartTypeConfig[type].option, this.option);
          return true;
        }
        return false;
      },
      initChart(chartRef, options, uid) {
        //保存需要控制的图表组件
        if (!_.includes(this.chartIds, uid)) {
          this.chartIds.push(uid);
        }
       /* _.each(this.$children, (item) => {
          if (_.includes(this.chartIds, item._uid)) {
            console.log(item)
          }
        })*/
        let c = echarts.init(chartRef);
        c.setOption(_.extend({}, this.chartOption, options));
      }
    },
    mounted() {
      //this.goPage(1);
      //todo 获取ref属性初始化图表显示
      //todo 点击图表时触发selected事件  charthome包含的图标是一整个组件  选中和取消都由charthome内部处理  一组图表需要定义新的组件
    }
  }
</script>

<style scoped>

</style>
