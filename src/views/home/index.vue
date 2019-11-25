<template>
  <div class="home">
    <div class="displayBox">
      <!-- 展示框 -->
      <el-row :gutter="20">
          <!-- :xs="24"(1个) :sm="12"(2个) :md="12"(2个) :lg="6"(4个) -->
          <el-col :xs="24" :sm="12" :md="12" :lg="6" v-for="(list,i) in lists" :key="i">
            <div class="grid-content bg-purple item" :style="{background:list.color}">
              <div>{{list.name}}</div>
              <countTo :startVal='0' :endVal='list.number' :duration='list.duration'></countTo>
            </div>
          </el-col>
      </el-row>
      <br/> <hr class="hr"> <br/>
    </div>
    <div class="Tobiao">
      <!-- 图表 -->
      <div id="mychart" style="width:100%;height:300px;"></div>
      <div class="main">
        <div class="data" style="width:50%;height:300px;float:left" ref="data"></div>
        <div class="building" style="width:50%;height:300px;float:left" ref="building"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import echarts from 'echarts'
export default {
  data () {
    return {
      lists:[
        {name:'最高可借金额',color:'#67C23A',number:13594,duration:2000},
        {name:'回报率',color:'#E6A23C',number:9833,duration:3000},
        {name:'业绩领跑',color:'#F56c6c',number:8888,duration:1500},
        {name:'安稳底薪战队',color:'#409eff',number:6666,duration:3500},
        
      ]
    }
  },
  methods:{
    initChart(){
        // 基于准备好的dom，初始化echarts实例
        this.chart  = echarts.init(document.getElementById('mychart'));
        // 指定图表的配置项和数据
        var option = {
          title: {
              left: 'center',
              text: '大数据量面积图',
          },
          xAxis: {
              type: 'category',
              data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320,732,890,634,1238,1200],
              type: 'line',
              areaStyle: {}
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(option);
    },
    initData () {
        this.data = echarts.init(this.$refs.data)
        var options = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [192,168,600,1000,1180,993,630],
              type: 'bar', //柱
              barGap:'-100%', //两个系列的柱子重叠
              barCategoryGap:'40%',//同一系列的柱间距离
              itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#61A0A8'},
                            {offset: 0.5, color: '#2F4554'},
                            {offset: 1, color: '#C23531'}
                        ]
                    )
                }
              }
          }]            
        }
       this.data.setOption(options)
      },
      initBuild () {
        this.build = echarts.init(this.$refs.building)
        var arr1 = [63,0,0,53,80,80]
        var arr2 = [0,63,80,85,72,74]
        var arr3 = [70,73,65,85,68,72]
        var option = {
        radar: [
          {
            indicator: [
              {text: 'ThemeRiver', max: 100},
              {text: 'Calendar', max: 100},
              {text: 'Custom', max: 100},
              {text: 'PictorialBar', max: 100},
              {text: 'Funnel', max: 100},
              {text: 'Gauge', max: 100}
            ],
            center: ['50%','54%'],//调整雷达图的位置
            radius: 80,//半径，可放大放小雷达图
            axisLine: {//坐标轴线相关设置
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine : {
              show : true,
              lineStyle : {
                  width : 1,
                  color : '#fff' // 图表背景网格线的颜色
              }
            },
            splitArea: {
                show: false,
            },
            name: {
              rich: {
                a: {
                    color: '#999',
                    lineHeight: 20
                },
              },
              formatter: (a)=>{
                  return `{a|${a}}`
              }
            }
        },
          ],
          series: [
            {
                type: 'radar',
                symbol: 'none',//去掉拐点的圈
                data: [
                  {
                    value: arr1,
                    name: 'ThemeRiver',
                    areaStyle: {
                        normal: {
                            color: '#C23531'
                        }
                    },
                    lineStyle: {
                        color:"rgba(255,255,255,0)"
                    },
                  },{
                    value: arr2,
                    name:'Custom',
                    areaStyle: {
                        normal: {
                            color: '#2F4554' // 图表中各个图区域的颜色
                        }
                    },
                    lineStyle: {
                        color:"rgba(255,255,255,0)" // 图表中各个图区域的边框线颜色
                    },
                  },{
                    value: arr3,
                    name:'Funnel',
                    areaStyle: {
                        normal: {
                            color: '#61A0A8' // 图表中各个图区域的颜色
                        }
                    },
                    lineStyle: {
                        color:"rgba(255,255,255,0)" // 图表中各个图区域的边框线颜色
                    },
                  }
                ]
            },
          ]
        };
        this.build.setOption(option)
      }
  },
  mounted(){  //挂载完成
    this.initChart();
    this.initData()
    this.initBuild()
    window.onresize = ()=>{   //根据窗口大小自适应
      this.chart.resize();
      this.data.resize();
      this.build.resize();
    }
  },
  components:{
    CountTo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.home{
  width: 100%;
  margin-top: 10px;
  .displayBox{
    .item{
      padding:10px;
    }
    .hr{
      color:#ccc;
      size: 1px;
    }
  }
}
</style>
