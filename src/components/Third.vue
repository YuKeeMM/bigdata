<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 1000px; height: 800px"></div>
      <!-- <div id="main2" style="width: 1000px; height: 800px"></div> -->
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import * as echarts from 'echarts'
export default {
  data () {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      }
    }
  },
  created () {},
  // 此时页面上的元素，已经被渲染完毕了
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 指定图表的配置项和数据
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option)
    //
    // var myChart2 = echarts.init(document.getElementById('main2'))
    // var option2 = {
    //   title: {
    //     text: '某站点用户访问来源',
    //     subtext: '纯属虚构',
    //     left: 'center'
    //   },
    //   tooltip: {
    //     trigger: 'item'
    //   },
    //   legend: {
    //     orient: 'vertical',
    //     left: 'left'
    //   },
    //   series: [
    //     {
    //       name: '访问来源',
    //       type: 'pie',
    //       radius: '50%',
    //       data: [
    //         { value: 1048, name: '搜索引擎' },
    //         { value: 735, name: '直接访问' },
    //         { value: 580, name: '邮件营销' },
    //         { value: 484, name: '联盟广告' },
    //         { value: 300, name: '视频广告' }
    //       ],
    //       emphasis: {
    //         itemStyle: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: 'rgba(0, 0, 0, 0.5)'
    //         }
    //       }
    //     }
    //   ]
    // }
    // myChart2.setOption(option2)
  }
}
</script>

<style lang="less" scoped>
</style>
