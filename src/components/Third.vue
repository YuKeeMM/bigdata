<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>第三页</el-breadcrumb-item>
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
          <el-button type="primary" icon="el-icon-search" @click="getCourseAll"
            >获取所有课程信息</el-button
          >
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
            结果：{{this.judge1.answer}},
            正确率: {{this.judge1.rightRate}},
            结果分析: {{this.judge1.analyse}},
            错误率: {{this.judge1.errorRate}},
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
      courses: [
        {
          courseId: 'course-v1:JXUST+JXUST2016001+2016_T2',
          videoCount: 40.0,
          videoDuration: 31652.875,
          count: 38.0,
          allTimes: 238.0,
          rightTimes: 194.0
        },
        {
          courseId: 'course-v1:TsinghuaX+30240243X+sp',
          videoCount: 137.0,
          videoDuration: 84349.83200000004,
          count: 108.0,
          allTimes: 6292.0,
          rightTimes: 5520.0
        },
        {
          courseId: 'course-v1:UST+UST001+sp',
          videoCount: 112.0,
          videoDuration: 68070.06300000002,
          count: 56.0,
          allTimes: 33737.0,
          rightTimes: 31492.0
        },
        {
          courseId: 'course-v1:HBNU+2019051509X+2019_T1',
          videoCount: 41.0,
          videoDuration: 15853.258999999996,
          count: 12.0,
          allTimes: 17.0,
          rightTimes: 15.0
        },
        {
          courseId: 'course-v1:TsinghuaX+70240403+2019_T1',
          videoCount: 113.0,
          videoDuration: 56032.15299999999,
          count: 68.0,
          allTimes: 527.0,
          rightTimes: 95.0
        },
        {
          courseId: 'course-v1:TsinghuaX+30240184+sp',
          videoCount: 235.0,
          videoDuration: 63273.746000000014,
          count: 155.0,
          allTimes: 28339.0,
          rightTimes: 26222.0
        },
        {
          courseId: 'course-v1:TsinghuaX+00740043X_2015_T2+sp',
          videoCount: 115.0,
          videoDuration: 58214.863999999994,
          count: 87.0,
          allTimes: 15674.0,
          rightTimes: 14211.0
        },
        {
          courseId: 'course-v1:TsinghuaX+00740043_2x_2015_T2+sp',
          videoCount: 85.0,
          videoDuration: 35754.35999999999,
          count: 48.0,
          allTimes: 4503.0,
          rightTimes: 4006.0
        },
        {
          courseId: 'course-v1:TsinghuaX+00740123_X+sp',
          videoCount: 104.0,
          videoDuration: 55478.733999999975,
          count: 81.0,
          allTimes: 5870.0,
          rightTimes: 4950.0
        },
        {
          courseId: 'course-v1:SCUT+2018122802X+2018_T2',
          videoCount: 46.0,
          videoDuration: 22259.376,
          count: 0.0,
          allTimes: 0.0,
          rightTimes: 0.0
        },
        {
          courseId: 'course-v1:TsinghuaX+30240184_2X+sp',
          videoCount: 272.0,
          videoDuration: 66304.50299999995,
          count: 119.0,
          allTimes: 10300.0,
          rightTimes: 9507.0
        },
        {
          courseId: 'course-v1:MITx+6_00_1x+sp',
          videoCount: 105.0,
          videoDuration: 44843.642,
          count: 62.0,
          allTimes: 641.0,
          rightTimes: 571.0
        }
      ],
      seriesdata1: [[]],
      option: {
        parallelAxis: [
          { dim: 0, name: '正确次数' },
          { dim: 1, name: '错误次数' },
          { dim: 2, name: '视频总数' },
          { dim: 3, name: '视频时间数' },
          { dim: 4, name: '视频数量' }
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
            [6292.0, 5520.0, 137.0, 84349.83200000004, 108.0],
            [33737.0, 31492.0, 112.0, 68070.06300000002, 56.0],
            [238.0, 194.0, 40.0, 31652.875, 38.0],
            [6292.0, 5520.0, 137.0, 84349.83200000004, 108.0],
            [33737.0, 31492.0, 112.0, 68070.06300000002, 56.0],
            [238.0, 194.0, 40.0, 31652.875, 38.0],
            [6292.0, 5520.0, 137.0, 84349.83200000004, 108.0],
            [33737.0, 31492.0, 112.0, 68070.06300000002, 56.0]
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
