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
            //图表模板
            legend: {
              data: []
            },
            xAxis: [
              {
                type: 'category',
                data: []
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [{
              name: '',
              type: 'bar',
              data: []
            }]
          }
        }
      },
      chart:{
        default:()=>{
          return {}
        }
      }
    }),
    data() {
      return {
        selected: [],//选中的元素
      }
    },
    computed: {

    },
    methods: {
      ...chartI,
      setData() {//设置数据
        this.option.legend.data = [];
        this.option.series[0].data = [];
        this.option.series[0].name = '测试';
        _.each(this.chartData,(item)=>{
          this.option.legend.data.push(item.name)
          this.option.series[0].data.push(item);
        })
      }
    },
    watch:{
      chartData(){
        this.setData();
        this.$parent.initChart(this.$refs.chart,this.option,getConfig(this))
      }
    },
    mounted() {//初始化设置数据
      this.setData();
      this.$parent.initChart(this.$refs.chart,this.option,getConfig(this))
    }
  }
</script>
<style scoped>
</style>
