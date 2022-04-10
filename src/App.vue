<template>
  <el-config-provider :locale="zh">
    <router-view/>
  </el-config-provider>
</template>

<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn'

</script>

<style>
#app {
}
</style>
