<template>
  <div>
    <div ref="chart" style="height: 200px;width: 200px"></div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        option: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: undefined,
            data: [1,2,3]
          },
          series: [{
            name: '测试',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{name:1,value:30},{name:2,value:40},{name:3,value:50}]
          }
          ]
        },
        selected: [],//选中的元素
      }
    },
    computed: {},
    methods: {},
    watch:{
      chartData(){
        this.$parent.initChart(this.$refs.chart,this.option,this._uid)
      }
    },
    mounted() {
      this.$parent.initChart(this.$refs.chart,this.option,this._uid)
    }
  }
</script>
<style scoped>
</style>
