<template>
  <div>
    <div ref="chart" style="height: 200px;width: 200px"></div>
  </div>
</template>
<script>
  import {chartProps,getConfig,chartI} from '../../config'
  export default {
    components: {},
    props: Object.assign({},chartProps,{
      chartData: {
        default: () => {
          return []
        }
      },
      option: {
        default: () => {
          return {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              y: undefined,
              data: [1, 2, 3]
            },
            series: [{
              name: '测试',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [{name: 1, value: 30}, {name: 2, value: 40}, {name: 3, value: 50}]
            }]
          }
        }
      }
    }),
    data() {
      return {
        selected: [],//选中的元素
      }
    },
    computed: {},
    methods: {
      ...chartI,
      setData() {//设置数据
        this.option.legend.data = [];
        this.option.series[0].data = [];
        this.option.series[0].name = '测试';
        _.each(this.chartData, (item) => {
          this.option.legend.data.push(item.name)
          this.option.series[0].data.push(item);
        })
      }
    },
    watch: {
      chartData() {
        this.setData();
        this.$parent.initChart(this.$refs.chart, this.option,getConfig(this))
      }
    },
    mounted() {
      this.setData();
      this.$parent.initChart(this.$refs.chart, this.option,getConfig(this))
    }
  }
</script>
<style scoped>
</style>
