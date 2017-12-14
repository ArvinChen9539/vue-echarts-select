<template>
  <div>
    <div ref="chart" style="height: 200px;width: 200px"></div>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {
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
      }
    },
    data() {
      return {
        selected: [],//选中的元素
      }
    },
    computed: {},
    methods: {
      setData() {//设置数据
        this.option.legend.data = [];
        this.option.series[0].name = '测试';
        _.each(this.chartData,(item)=>{
          this.option.legend.data.push(item.name)
          this.option.series[0].data.push(item);
        })
      }
    },
    watch:{
      chartData(){
        this.setData()
        this.$parent.initChart(this.$refs.chart,this.option,this._uid)
      }
    },
    mounted() {//初始化设置数据
      this.setData()
      this.$parent.initChart(this.$refs.chart,this.option,this._uid)
    }
  }
</script>
<style scoped>
</style>
