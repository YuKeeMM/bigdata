<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>第二页</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 获取课程信息 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input
            placeholder="请输入课程Id"
            v-model="id"
            clearable
            @clear="getCourse"
          >
            <el-button slot="append" icon="el-icon-search" @click="getCourse"
              >获取课程信息</el-button
            >
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="course" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="视频Id" prop="courseId"></el-table-column>
        <el-table-column label="视频总数" prop="videoCount"></el-table-column>
        <el-table-column
          label="视频时间数"
          prop="videoDuration"
        ></el-table-column>
        <el-table-column label="视频数量" prop="count"></el-table-column>
        <el-table-column label="正确次数" prop="allTimes"></el-table-column>
        <el-table-column label="错误次数" prop="rightTimes"></el-table-column>
      </el-table>
      <div style="width: 1000px; height: 100px"></div>
      <!-- <div id="main" style="width: 1000px; height: 800px"></div> -->
    </el-card>
    <div style="height: 50px"></div>
    <!-- 获取所有课程信息 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
        </el-col>
      </el-row>
      <div id="main" style="width: 1000px; height: 800px"></div>
    </el-card>
    <div style="height: 50px"></div>
    <!-- 学生答疑正确率预测 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入学生Id" v-model="studentId">
          </el-input>
          <el-input placeholder="请输入问题Id" v-model="problemId">
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="getJudge">学生答疑正确率预测</el-button>
        </el-col>
        <el-col :span="5">
          <div class="video_Time">
            <p>正确率:  {{this.judge1.rightRate}}</p >
            <p>结果分析:  {{this.judge1.analyse}}</p >
            <p>结果:  {{this.judge1.answer}}</p >
            <p>错误率:  {{this.judge1.errorRate}}</p >
            <p>已掌握知识点:  {{this.judge1.studentDetail}}</p >
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      // option: {
      //   xAxis: {
      //     type: 'category',
      //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      //   },
      //   yAxis: {
      //     type: 'value'
      //   },
      //   series: [
      //     {
      //       data: [120, 200, 150, 80, 70, 110, 130],
      //       type: 'bar'
      //     }
      //   ]
      // },
      // 课程
      id: '',
      course: [
        {
          courseId: '',
          videoCount: '',
          videoDuration: '',
          count: '',
          allTimes: '',
          rightTimes: ''
        }
      ],
      studentId: '',
      problemId: '',
      judge1: {},
      // 全部课程
      queryInfo: {
        current: 1,
        size: 12
      },
      courses: [],
      seriesdata1: [[]],
      option: {
        parallelAxis: [
          { dim: 0, name: '正确次数' },
          { dim: 1, name: '错误次数' },
          { dim: 2, name: '视频总数' },
          { dim: 3, name: '视频时间数' },
          { dim: 4, name: '题目数量' }
        ],
        series: {
          type: 'parallel',
          lineStyle: {
            width: 4
          },
          data: [
            [238.0, 194.0, 40.0, 31652.875, 38.0],
            [6292.0, 5520.0, 137.0, 84349.83200000004, 108.0],
            [33737.0, 31492.0, 112.0, 68070.06300000002, 56.0],
            [17.0, 15.0, 41.0, 15853.258999999996, 12.0],
            [527.0, 95.0, 113.0, 56032.15299999999, 68.0],
            [28339.0, 26222.0, 235.0, 63273.746000000014, 155.0],
            [15674.0, 14211.0, 115.0, 58214.863999999994, 87.0],
            [4503.0, 4006.0, 85.0, 35754.35999999999, 48.0],
            [5870.0, 4950.0, 104.0, 55478.733999999975, 81.0],
            [0.0, 0.0, 46.0, 22259.376, 0.0],
            [10300.0, 9507.0, 272.0, 66304.50299999995, 119.0],
            [641.0, 571.0, 105.0, 44843.642, 62.0]
          ]
        }
      }
    }
  },
  created() {},
  methods: {
    async getCourse() {
      console.log(this.id)
      const { data: res } = await this.$http.get('getCourseTable', {
        params: { courseId: this.id }
      })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.course[0].courseId = res.data.course.courseId
      this.course[0].videoCount = res.data.course.videoCount
      this.course[0].videoDuration = res.data.course.videoDuration
      this.course[0].count = res.data.course.count
      this.course[0].allTimes = res.data.course.allTimes
      this.course[0].rightTimes = res.data.course.rightTimes
      console.log(this.course)
    },
    async getCourseAll() {
      // const { data: res } = await this.$http.get('getAllCourseTable', { })
      // if (res.code !== 200) return this.$message.error(res.data.提示)
      // this.$message.success(res.message)
      // this.courses = res.data.course
      console.log(this.courses)
      // this.myChart = echarts.init(document.getElementById('main'))
      // for (let i = 0; i < this.queryInfo.size; i++) {
      //   this.seriesdata1[i] = [
      //     this.students[i].rightTimes,
      //     this.students[i].allTimes,
      //     this.students[i].videoCount,
      //     this.students[i].videoDuration,
      //     this.students[i].count
      //   ]
      //   console.log(this.seriesdata1[i])
      // }
      // console.log(this.seriesdata1)
      // this.myChart.setOption({
      //   series: [
      //     {
      //       data: this.seriesdata1
      //     }
      //   ]
      // })
    },
    async getJudge() {
      console.log(this.videoId)
      const { data: res } = await this.$http.get('judge', { params: { studentId: this.studentId, problemId: this.problemId } })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.judge1 = res.data
      console.log(this.judge1)
    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    myChart.setOption(this.option)
  }
}
</script>

<style lang="less" scoped>
</style>
