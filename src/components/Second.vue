<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>第二页</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 1000px; height: 800px"></div>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
// import * as echarts from 'echarts'
export default {
  data () {
    return {}
  },
  created () {},
  // 此时页面上的元素，已经被渲染完毕了
  mounted () {
  }
}
</script>

<style lang="less" scoped>
</style>
