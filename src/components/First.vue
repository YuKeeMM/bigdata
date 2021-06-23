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
          <div class="video_Time">该视频的持续时间为：{{this.duration1}}</div>
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
      <div id="main1" style="width: 1000px; height: 800px"></div>
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
      :page-sizes="[20, 30, 40, 50]"
      :page-size="queryInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>
    <div style="height: 50px"></div>
    <!-- 获取所有问题信息 -->
    <el-card>
      <!-- <el-row :gutter="20">
        <el-col :span="7">
          <el-button type="primary" icon="el-icon-search" @click="getQuestionAll">获取所有问题信息</el-button>
        </el-col>
      </el-row>
      <el-table :data="problems" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="问题Id" prop="problemId"></el-table-column>
        <el-table-column label="答题总次数" prop="all"></el-table-column>
        <el-table-column label="答对次数" prop="right"></el-table-column>
        <el-table-column label="答错次数" prop="wrong"></el-table-column>
        <el-table-column label="问题知识点" prop="concept"></el-table-column>
        <el-table-column label="问题先修知识" prop="preConcept"></el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo2.current"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="queryInfo2.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination> -->
      <div id="main2" style="width: 1000px; height: 800px"></div>
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
      :page-sizes="[20, 30, 40, 50]"
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
        duration1: ''
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
        size: 20
      },
      total: 2,
      videos: [],
      // 所有问题
      queryInfo2: {
        current: 1,
        size: 20
      },
      totalOfProblem: '',
      problems: [
        {
          problemId: 'P_01c72494e56b41ddba14524d3e4e0ab7',
          all: 441.0,
          right: 405.0,
          wrong: 36.0,
          concept: '向量',
          preConcept: null
        },
        {
          problemId: 'P_01c72494e56b41ddba14524d3e4e0ab7',
          all: 441.0,
          right: 405.0,
          wrong: 36.0,
          concept: '向量',
          preConcept: null
        },
        {
          problemId: 'P_01c72494e56b41ddba14524d3e4e0ab7',
          all: 441.0,
          right: 405.0,
          wrong: 36.0,
          concept: '向量',
          preConcept: null
        },
        {
          problemId: 'P_01c72494e56b41ddba14524d3e4e0ab7',
          all: 441.0,
          right: 405.0,
          wrong: 36.0,
          concept: '向量',
          preConcept: null
        }
      ],
      option2: {
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: this.problems
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
      // 所有学生
      queryInfo3: {
        current: 1,
        size: 20
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
      this.video.duration1 = res.data.video.duration
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
      this.myChart1 = echarts.init(document.getElementById('main2'))
      this.myChart1.setOption({
        title: {
          subtext: '问题总次数为：' + res.data.problem.all + '问题涉及知识点' + res.data.problem.concept + '问题先修知识点' + res.data.problem.preConcept
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
      this.videos = res.data.videos
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
    var myChart1 = echarts.init(document.getElementById('main1'))
    myChart1.setOption(this.option)
    var myChart2 = echarts.init(document.getElementById('main2'))
    myChart2.setOption(this.option2)
  }
}
</script>

<style lang="less" scoped>
.video_Time {
  height: 100%;
  position: absolute;
}
</style>
