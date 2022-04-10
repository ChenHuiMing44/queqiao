<template>
  <div class="sidebar" :style="{backgroundImage: `url(${theme.state.sidebar})`}">
    <div class="logo-box">
      <div class="logo-icon box-image"><img :src="logoIcon"/></div>
      <span class="app-name">{{AppName}}</span>
    </div>
    <el-menu
      :collapse="menus.state.sidebarCollapse"
      text-color="#fff"
      active-text-color="#fff"
      :default-active="menus.state.currentMenu"
      class="initial-bg"
      id="menu"
    >
      <sidebar-menu :menuList="menus.state.menus"></sidebar-menu>
    </el-menu>
  </div>
</template>
<script setup>
// import { reactive ,computed, ref} from "vue"
import SidebarMenu from './sidebarMenu.vue'
import useMenus from '@/composition/useMenus'
import useTheme from '@/composition/useTheme'
import logoIcon from '@/assets/logo.png'
import { AppName } from '@/config'

const theme = useTheme()

const menus = useMenus()

</script>

<style lang="scss" scoped>

</style>
