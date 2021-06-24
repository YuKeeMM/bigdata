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
          <el-input placeholder="请输入课程Id" v-model="courseId" clearable @clear="getCourse">
            <el-button slot="append" icon="el-icon-search" @click="getCourse">获取课程信息</el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="course" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="视频Id" prop="courseId"></el-table-column>
        <el-table-column label="视频总数" prop="videoCount"></el-table-column>
        <el-table-column label="视频时间数" prop="videoDuration"></el-table-column>
        <el-table-column label="视频数量" prop="count"></el-table-column>
        <el-table-column label="正确次数" prop="allTimes"></el-table-column>
        <el-table-column label="错误次数" prop="rightTimes"></el-table-column>
      </el-table>
      <div style="width: 1000px; height: 100px"></div>
      <!-- <div id="main" style="width: 1000px; height: 800px"></div> -->
    </el-card>
    <!-- 获取所有课程信息 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-button type="primary" icon="el-icon-search" @click="getCourseAll">获取所有课程信息</el-button>
        </el-col>
      </el-row>
      <div id="main" style="width: 1000px; height: 800px"></div>
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
      courseId: '',
      course: [{
        courseId: '',
        videoCount: '',
        videoDuration: '',
        count: '',
        allTimes: '',
        rightTimes: ''
      }],
      // 全部课程
      courses: [],
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
            [0.6, 0.4, 0.5, 0.2, 0.3],
            [0.4, 0.6, 0.7, 0.15, 0.15],
            [0.1, 0.9, 0.4, 0.4, 0.2]
          ]
        }
      }
    }
  },
  created() {},
  methods: {
    async getCourse() {
      console.log(this.courseId)
      const { data: res } = await this.$http.get('getCourseTable', { params: { courseId: this.courseId } })
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
      const { data: res } = await this.$http.get('getAllCourseTable', { })
      if (res.code !== 200) return this.$message.error(res.data.提示)
      this.$message.success(res.message)
      this.courses = res.data.course
      console.log(this.courses)
      this.myChart = echarts.init(document.getElementById('main'))
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
