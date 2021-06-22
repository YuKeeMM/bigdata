<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>第一页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入视频Id" v-model="videoId" clearable @clear="getVideo">
            <el-button slot="append" icon="el-icon-search" @click="getVideo"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <div class="video_Time">该视频的持续时间为：{{this.duration}}</div>
        </el-col>
      </el-row>
    </el-card>
    <div style="height: 50px"></div>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入问题Id" v-model="problemId" clearable @clear="getQuestion">
            <el-button slot="append" icon="el-icon-search" @click="getQuestion">查看</el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <!-- <div id="main" style="width: 1000px; height: 800px"></div> -->
      <div id="main2" style="width: 1000px; height: 800px"></div>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import * as echarts from 'echarts'
export default {
  data () {
    return {
      videoId: '',
      duration: '',
      problemId: '',
      problem: {
        all: '',
        right: '',
        wrong: '',
        concept: '',
        preConcept: ''
      }
    }
  },
  created () {},
  // 此时页面上的元素，已经被渲染完毕了
  methods: {
    async getVideo() {
      console.log(this.videoId)
      const { data: res } = await this.$http.get('getVideoTable', { params: { videoId: this.videoId } })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.duration = res.data.video.duration
      console.log(this.problem)
    },
    async getQuestion() {
      console.log(this.problemId)
      const { data: res } = await this.$http.get('getProblemTable', { params: { problemId: this.problemId } })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.problem.all = res.data.problem.all
      this.problem.right = res.data.problem.right
      this.problem.wrong = res.data.problem.wrong
      this.problem.concept = res.data.problem.concept
      this.problem.preConcept = res.data.problem.preConcept
      console.log(this.problem)
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById('main'))
    // // 指定图表的配置项和数据
    // var option = {
    //   title: {
    //     text: '堆叠区域图'
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'cross',
    //       label: {
    //         backgroundColor: '#6a7985'
    //       }
    //     }
    //   },
    //   legend: {
    //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       boundaryGap: false,
    //       data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value'
    //     }
    //   ],
    //   series: [
    //     {
    //       name: '邮件营销',
    //       type: 'line',
    //       stack: '总量',
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [120, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //       name: '联盟广告',
    //       type: 'line',
    //       stack: '总量',
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [220, 182, 191, 234, 290, 330, 310]
    //     },
    //     {
    //       name: '视频广告',
    //       type: 'line',
    //       stack: '总量',
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [150, 232, 201, 154, 190, 330, 410]
    //     },
    //     {
    //       name: '直接访问',
    //       type: 'line',
    //       stack: '总量',
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [320, 332, 301, 334, 390, 330, 320]
    //     },
    //     {
    //       name: '搜索引擎',
    //       type: 'line',
    //       stack: '总量',
    //       label: {
    //         show: true,
    //         position: 'top'
    //       },
    //       areaStyle: {},
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     }
    //   ]
    // }
    // // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option)
    //
    var myChart2 = echarts.init(document.getElementById('main2'))
    var option2 = {
      title: {
        text: '问题正确错误占比',
        subtext: '问题总次数为：' + this.problem.all,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '次数',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.problem.right, name: 'right' },
            { value: this.problem.wrong, name: 'wrong' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myChart2.setOption(option2)
  }
}
</script>

<style lang="less" scoped>
.video_Time {
  height: 100%;
  position: absolute;
}
</style>
