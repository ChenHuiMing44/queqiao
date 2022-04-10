<template>
  <div class="app-wrapper" :class="{navCollapsed: menus.state.sidebarCollapse}">
    <sidebar class="sidebar-container" />
    <div class="main-container" :style="{backgroundColor: theme.state.contentBack}"  id="root">
      <div class="holder"/>
      <nav-top/>
      <app-main/>
    </div>
    <fixed-session/>
  </div>
</template>

<script setup>
import AppMain from './components/appMain/index'
import Sidebar from './components/sidebar/navLeft'
import useMenus from '@/composition/useMenus'
import NavTop from './components/navTop/index'
import FixedSession from '@/components/fixedSession/fixedSession'
import useTheme from '@/composition/useTheme'

const theme = useTheme()
const menus = useMenus()

</script>

<style lang="scss">
@import "@/style/_sidebar.scss";
.app-wrapper{
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  .main-container {
    position: fixed;
    overflow-y: scroll;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding:20px;
    box-sizing: border-box;
    .holder{
      height: 50px;
    }
  }
}

</style>
