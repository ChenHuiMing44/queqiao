<template>
  <div class="menu-container">
    <template v-for="v in menuList" :key="v.key">
      <div v-if="v.children && v.children.length > 1 ">
        <!-- 外层 -->
        <el-sub-menu :index="v.key" :key="v.key" class="initial-bg" v-if="!v.hide">
          <template v-slot:title>
            <i
              class="iconfont theme-color"
              :class="v.icon.font"
            ></i>
            <span class="theme-color">{{ v.name }}</span>
          </template>
          <el-menu-item-group>
            <sidebar-menu :menuList="v.children"></sidebar-menu>
          </el-menu-item-group>
        </el-sub-menu>
      </div>

      <div v-else>
        <!-- 内层 -->
        <el-menu-item
          v-if="!v.hide"
          :key="v.key"
          :index="v.key"
          @click="gotoRoute(v)"
          class="theme-bg"
        >
          <i class="iconfont theme-color" :class="v.icon.font"></i>
          <span class="theme-color">{{ v.name }}</span>
        </el-menu-item>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
// import { ElSubMenu } from 'element-plus'
import { useRouter } from 'vue-router'

defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})
const router = useRouter()
const gotoRoute = (route) => {
  router.replace({ name: route.key })
}

</script>
