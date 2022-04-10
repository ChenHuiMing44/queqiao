<template>
  <div class="page-content">
    <div>测试一下theme 的一些东西拉</div>
    <div class="center-box">
      <el-button type="primary">按钮给一个</el-button>
    </div>
    <div class="sidebar-back cover-image">
      <img :src="theme.state.sidebar"/>
    </div>
    <div class="sidebar-back cover-image">
      <img :src="theme.state.sidebar"/>
    </div>
    <div class="sidebar-back cover-image">
      <img :src="theme.state.sidebar"/>
    </div>
    <div class="sidebar-back cover-image">
      <img :src="theme.state.sidebar"/>
    </div>
    <div class="sidebar-back cover-image">
      <img :src="theme.state.sidebar"/>
    </div>
    <div class="sidebar-back cover-image">
      <img :src="theme.state.sidebar"/>
    </div>
  </div>
</template>

<script setup>
import useTheme from '@/composition/useTheme'
const theme = useTheme()
</script>

<style scoped lang="scss">
.page-content{
  margin: auto;
  text-align: center;
}
  .center-box{
    width: 600px;
    margin: 20px auto;
  }
  .sidebar-back{
    margin: 30px auto;
    width: 200px;
    height: 300px;
  }
</style>
