<template>
  <div class="--setting-panel">
    <div class="close-icon" @click="emit('close')"><i class="iconfont icon-shanchu1"/></div>

    <div class="module-title">主题色</div>
    <div class="colors-box">
      <template v-for="(color, index) in ThemeColors" :key="index">
        <div
          :class="{active: isSameColor(primaryTheme.state.color, color)}"
          :style="{backgroundColor: color, outlineColor: getBorderColor(color)}"
          class="color-item"
          @click="tapSelectColor(color)"
        />
      </template>
      <div class="space"/>
      <el-color-picker :model-value="primaryTheme.state.color" size="large" @change="tapSelectColor"/>
    </div>

    <div class="module-title">菜单背景</div>
    <div class="sidebar-list">
      <template v-for="(icon,index) in SidebarBacks" :key="index">
        <div
          class="sidebar-item cover-image"
          :class="{active: primaryTheme.state.sidebar === icon}"
          @click="tapChangeSidebar(icon)"
        >
          <img :src="icon"/>
        </div>
      </template>
    </div>

    <div class="module-title">内容背景</div>
    <div class="colors-box content-colors">
      <template v-for="(color, index) in ContentColors" :key="index">
        <div
          :class="{active: isSameColor(primaryTheme.state.contentBack, color)}"
          :style="{backgroundColor: color}"
          class="color-item"
          @click="tapContentColor(color)"
        />
      </template>
    </div>

  </div>
</template>

<script setup>
import { isSameColor, themeMix } from '@/utils/theme'
import useTheme from '@/composition/useTheme'
import { defineEmits } from 'vue'
import sidebar1 from '@/assets/imgs/siderImages/sidebar-1.jpg'
import sidebar2 from '@/assets/imgs/siderImages/sidebar-2.jpg'
import sidebar3 from '@/assets/imgs/siderImages/sidebar-3.jpg'
import sidebar4 from '@/assets/imgs/siderImages/sidebar-4.jpg'

const emit = defineEmits(['close'])

const SidebarBacks = [sidebar1, sidebar2, sidebar3, sidebar4]

const ContentColors = ['#f6f7f8', '#ffffff', '#eeeeee', '#dddddd', '#fffaef', '#f1f9fa']

const ThemeColors = ['#4ab7bd', '#089BAB', '#F7BA1E', '#F5212D', '#2F54EA', '#722ED1']

const primaryTheme = useTheme()

const tapSelectColor = (color) => {
  if (!isSameColor(primaryTheme.state.color, color)) {
    primaryTheme.changeTheme(color)
  }
}

const tapContentColor = (color) => {
  if (!isSameColor(primaryTheme.state.contentBack, color)) {
    primaryTheme.changeContentBack(color)
  }
}

const tapChangeSidebar = (img) => {
  if (img !== primaryTheme.state.sidebar) {
    primaryTheme.changeSidebar(img)
  }
}

const getBorderColor = (color) => {
  return themeMix(color, '#ffffff', 0.8)
}

</script>

<style scoped lang="scss">
.--setting-panel{
  position: relative;
  width: 280px;
  padding: 10px;
  .close-icon{
    position: absolute;
    top: -20px;
    right: 12px;
    height: 26px;
    width: 26px;
    border-radius: 13px;
    text-align: center;
    line-height: 26px;
    cursor: pointer;
    background-color: var(--el-overlay-color);
    &:active {
      background-color: var(--el-overlay-color-lighter);
    }
    .iconfont {
      color: var(--el-color-white);
      font-size: 10px;
    }
  }
  .picker-color{
    margin-left: 10px;
  }
  .module-title{
    text-align: center;
    font-weight: bold;
  }
  .colors-box{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0 10px;
    .space{
      margin-left: 10px;
    }
    .color-item{
      cursor: pointer;
      margin: 5px 8px;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      outline-style: solid;
      outline-width: 0;
      outline-color: var(--el-color-primary-light-4);
      &:hover, &.active {
        outline-width: 4px;
      }
    }
  }
  .sidebar-list{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 10px;
    .sidebar-item{
      border-radius: 10px;
      width: 75px;
      margin: 0 4px;
      height: 100px;
      cursor: pointer;
      &.active, &:hover {
        outline: 3px solid var(--el-color-primary-light-4);
      }

    }
  }
}

</style>
