<template>
  <div id="main">
    <v-head></v-head>
    <div class="main-body">
      <div><button @click="test">测试</button></div>
      <chart-home @selected="setSelected" :is-multiple="isMultiple" class="chart-home" :clickFun="clickFun">
        <div>
        <base-pie :chartData="chartData" :colors="colors"></base-pie>
        </div>
        <div>
        <base-bar :chartData="chartData"></base-bar>
        </div>
      </chart-home>
    </div>
    <v-foot></v-foot>
  </div>
</template>
<script>
  import vHead from './layout/header.vue'
  import vFoot from './layout/footer.vue'
  import BaseBar from '@/components/charts/BaseBar.vue'
  import BasePie from '@/components/charts/BasePie.vue'
  import ChartHome from '@/components/ChartHome.vue'


  export default {
    components: {
      vHead, vFoot, BaseBar, BasePie, ChartHome
    },
    data() {
      return {
        isMultiple:true,
        colors:['green','red'],
        chartData: [{name: 1, value: 10}, {name: 2, value: 20}, {name: 3, value: 30}],
        selected:[]
      }
    },
    methods: {
      clickFun(){
        console.log(arguments)
      },
      setSelected(info) {
        console.log(info);
        this.selected = info;
      },
      test() {
        _.each(this.chartData, (item, index) => {
          item.value = _.random(50, 100)
          this.chartData.splice(index, 1, item)
        })
      }
    }
  }
</script>
<style scoped>
  #main {
    height: calc(100% - 30px);
  }

  .main-body {
    display: flex;
    flex: 1 0 auto;
    background-color: #f3f4f9;
    width: 100%;
    min-height: calc(100% - 100px);
    padding: 20px;
  }
  .chart-home > div{
    display: inline-block;
  }
</style>
