<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>第一页</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 获取视频信息 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入视频Id" v-model="videoId" clearable @clear="getVideo">
            <el-button slot="append" icon="el-icon-search" @click="getVideo">获取视频信息</el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <div class="video_Time">该视频的持续时间为：{{this.duration}}</div>
        </el-col>
      </el-row>
    </el-card>
    <div style="height: 50px"></div>
    <!-- 获取问题信息 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入问题Id" v-model="problemId" clearable @clear="getQuestion">
            <el-button slot="append" icon="el-icon-search" @click="getQuestion">获取问题信息</el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main2" style="width: 1000px; height: 800px"></div>
    </el-card>
    <div style="height: 50px"></div>
    <!-- 获取学生信息 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入学生Id" v-model="studentId" clearable @clear="getStudent">
            <el-button slot="append" icon="el-icon-search" @click="getStudent">获取学生信息</el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="student" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="学生Id" prop="studentId"></el-table-column>
        <el-table-column label="学生掌握知识点" prop="conceptGrasp"></el-table-column>
        <el-table-column label="学生大致掌握知识点" prop="conceptAlmostGrasp"></el-table-column>
        <el-table-column label="学生未掌握知识点" prop="conceptNoGrasp"></el-table-column>
        <el-table-column label="学生总答题目数" prop="all"></el-table-column>
        <el-table-column label="学生正确题目数" prop="right"></el-table-column>
      </el-table>
      <div style="width: 1000px; height: 100px"></div>
    </el-card>
    <div style="height: 50px"></div>
    <!-- 获取所有视频信息 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-button type="primary" icon="el-icon-search" @click="getVideoAll">获取所有视频信息</el-button>
        </el-col>
      </el-row>
      <el-table :data="videos" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="视频Id" prop="videoId"></el-table-column>
        <el-table-column label="视频时长（分钟）" prop="duration"></el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.current"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>
    <div style="height: 50px"></div>
    <!-- 获取所有问题信息 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-button type="primary" icon="el-icon-search" @click="getQuestionAll">获取所有问题信息</el-button>
        </el-col>
      </el-row>
      <el-table :data="videos" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="视频Id" prop="videoId"></el-table-column>
        <el-table-column label="视频时长（分钟）" prop="duration"></el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo2.current"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo2.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>
    <div style="height: 50px"></div>
    <!-- 获取所有学生信息 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-button type="primary" icon="el-icon-search" @click="getStudentAll">获取所有学生信息</el-button>
        </el-col>
      </el-row>
      <el-table :data="students" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="学生Id" prop="studentId"></el-table-column>
        <el-table-column label="学生掌握知识点" prop="conceptGrasp"></el-table-column>
        <el-table-column label="学生大致掌握知识点" prop="conceptAlmostGrasp"></el-table-column>
        <el-table-column label="学生未掌握知识点" prop="conceptNoGrasp"></el-table-column>
        <el-table-column label="学生总答题目数" prop="all"></el-table-column>
        <el-table-column label="学生正确题目数" prop="right"></el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo3.current"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo3.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="studentTotal">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import * as echarts from 'echarts'
export default {
  data () {
    return {
      // 视频
      videoId: '',
      video: {
        videoId: '',
        duration: ''
      },
      // 问题
      problemId: '',
      problem: {
        problemId: '',
        all: '',
        right: '',
        wrong: '',
        concept: '',
        preConcept: ''
      },
      option: {
        title: {
          text: '问题正确错误占比',
          subtext: [],
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
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      // 学生
      studentId: '',
      student: [{
        studentId: '',
        conceptGrasp: '',
        conceptAlmostGrasp: '',
        conceptNoGrasp: '',
        all: '',
        right: ''
      }],
      // 所有视频
      queryInfo: {
        current: 1,
        size: 2
      },
      videos: [],
      // 所有问题
      queryInfo2: {
        current: 1,
        size: 2
      },
      totalOfProblem: '',
      totalOfProblemVo: '',
      problemVo: [],
      problems: [],
      // 所有学生
      queryInfo3: {
        current: 1,
        size: 2
      },
      studentTotal: '',
      students: []
    }
  },
  created () {},
  methods: {
    async getVideo() {
      console.log(this.videoId)
      const { data: res } = await this.$http.get('getVideoTable', { params: { videoId: this.videoId } })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.video.videoId = res.data.video.videoId
      this.video.duration = res.data.video.duration
      console.log(this.video)
    },
    async getQuestion() {
      console.log(this.problemId)
      const { data: res } = await this.$http.get('getProblemTable', { params: { problemId: this.problemId } })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.problem.problemId = res.data.problem.problemId
      this.problem.all = res.data.problem.all
      this.problem.right = res.data.problem.right
      this.problem.wrong = res.data.problem.wrong
      this.problem.concept = res.data.problem.concept
      this.problem.preConcept = res.data.problem.preConcept
      console.log(this.problem)
      this.myChart2 = echarts.init(document.getElementById('main2'))
      this.myChart2.setOption({
        title: {
          subtext: '问题总次数为：' + res.data.problem.all
        },
        series: [
          {
            data: [
              { value: res.data.problem.right, name: 'right' },
              { value: res.data.problem.wrong, name: 'wrong' }
            ]
          }
        ]
      })
    },
    async getStudent() {
      console.log(this.studentId)
      const { data: res } = await this.$http.get('getStudentTable', { params: { studentId: this.studentId } })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.student.studentId = res.data.student.studentId
      this.student.conceptGrasp = res.data.student.conceptGrasp
      this.student.conceptAlmostGrasp = res.data.student.conceptAlmostGrasp
      this.student.conceptNoGrasp = res.data.student.conceptNoGrasp
      this.student.all = res.data.student.all
      this.student.right = res.data.student.right
      console.log(this.student)
    },
    async getVideoAll() {
      console.log(this.queryInfo)
      const { data: res } = await this.$http.get('getAllVideoTable', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.videos = res.data.videos
      console.log(this.videos)
    },
    async getQuestionAll() {
      console.log(this.queryInfo)
      const { data: res } = await this.$http.get('getAllProblemTable', { params: this.queryInfo2 })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.totalOfProblem = res.data.totalOfProblem
      this.totalOfProblemVo = res.data.totalOfProblemVo
      this.problemVo = res.data.problemVo
      this.problems = res.data.problems
    },
    async getStudentAll() {
      console.log(this.queryInfo)
      const { data: res } = await this.$http.get('getAllStudentTable', { params: this.queryInfo3 })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.total = res.data.total
      this.students = res.data.students
      console.log(this.total)
      console.log(this.students)
    }
  },
  // 此时页面上的元素，已经被渲染完毕了
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
    myChart2.setOption(this.option)
  }
}
</script>

<style lang="less" scoped>
.video_Time {
  height: 100%;
  position: absolute;
}
</style>
