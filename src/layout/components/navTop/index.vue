<template>
  <div class="--nav-top" >
    <aside class="aside__top" :style="{background: state.topBack, borderColor: state.borderColor}">
      <div class="aside__top--left">
        <span
          class="iconfont toggleNavCollapse icon-zhankaimulu"
          :class="{
            active: menus.state.sidebarCollapse,
          }"
          @click="toggleNavCollapse"
        >
        </span>
        <el-breadcrumb class="nav-top-breadcrumb" separator="/">
          <transition-group name="breadcrumb">
            <!-- 防止面包屑导航出现 首页/首页， v-if="route.name!='home'" -->
            <el-breadcrumb-item
              v-for="(route, i) in menus.state.crumbList"
              :key="route.name"
              :to="{ name: route.name }"
              :class="{
                'is-last-link': i == menus.state.crumbList.length - 1,
              }"
            >
              <span v-if="route.name != 'Root'">{{
                route.meta.name
              }}</span>
            </el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb>
      </div>
      <div class="aside__top--right">
        <div class="email" @click="full">
          <span
            class="iconfont font-weight-bold"
            :class="{ 'icon-quanping_o': !state.isFullscreen,
                      'icon-quxiaoquanping_o': state.isFullscreen}"
            style="font-size:18px"/>
        </div>
        <div class="user-msg">
          <!-- <img class="user-img" :src="require('@/assets/image/a.png')" alt=""> -->
          <el-dropdown >
            <div class="drop-down-list">
              <span class="user-name">{{ userStatus.state.name }}</span>
              <i class="iconfont arrow-icon icon-zankai"></i>
            </div>
            <template #dropdown>
              <el-dropdown-menu class="nav-top-dropdown-menu">
                <el-dropdown-item class="dropdown-item">个人中心</el-dropdown-item>
                <el-dropdown-item class="dropdown-item">回到首页</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="quit-system" @click="loginOut">
          <span class="iconfont icon-guanbi"></span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import useMenus from '@/composition/useMenus'
import screenfull from 'screenfull'
import useUserStatus from '@/composition/useUserStatus'

const userStatus = useUserStatus()
const menus = useMenus()
const state = reactive({
  isFullscreen: false,
  topBack: `rgba(255,255,255, ${0})`,
  borderColor: `rgba(224,224,224, ${0})`
})

const toggleNavCollapse = () => {
  menus.toggleCollapse()
}
const full = () => {
  screenfull.isEnabled && screenfull.toggle().then(() => {
    state.isFullscreen = screenfull.isFullscreen
  })
}
const loginOut = () => {
  userStatus.userLogout()
}
const scrollHandle = (e, isDom) => {
  const changeHeight = 200
  const target = isDom ? e : e.target
  const val = target.scrollTop || 0
  const rate = Math.min(1, val / changeHeight)
  state.topBack = `rgba(255,255,255, ${rate})`
  state.borderColor = `rgba(224,224,224, ${rate})`
}

onMounted(() => {
  const target = document.querySelector('#root')
  scrollHandle(target, true)
  target?.addEventListener('scroll', scrollHandle)
})
onBeforeUnmount(() => {
  const target = document.querySelector('#root')
  target?.removeEventListener('scroll', scrollHandle)
})

</script>

<style scoped lang="scss">
.aside__top {
  border-width: 0 0 1px;
  border-style: solid;
  height: 50px;
  line-height: 50px;
  position: fixed;
  left: 200px;
  top: 0;
  right: 0;
  z-index: 1000;
  transition: left 0.25s;
  .aside__top--left{
    display: flex;
  }
  .toggleNavCollapse {
    line-height: 50px;
    display: inline-block;
    margin-left: 8px;
    padding: 0 10px;
    font-size: 26px;
    vertical-align: middle;
    color: #333;
    cursor: pointer;
    transition: all 0.5s;
    &.active {
      transform: rotate(180deg);
    }
  }

  .aside__top--right {
    position: absolute;
    right: 10px;
    top: -1px;
    bottom: 0;
    > div {
      position: relative;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      margin-left: 10px;
      padding: 0 15px;
      cursor: pointer;
      &:hover::after {
        transform-origin: 0 0;
        transform: scaleX(1);
      }
      &:first-child:before {
        border: none;
      }
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: var(--el-color-primary);
        transform: scaleX(0);
        transform-origin: right 0;
        transition: transform 0.5s;
      }
      &::before {
        content: "";
        position: absolute;
        height: 20px;
        top: 50%;
        left: -8px;
        margin-top: -10px;
        border-left: 1px solid #ccc;
      }
      &.email {
        i {
          position: absolute;
          left: 18px;
          top: -12px;
          border-radius: 20px;
          background: var(--el-color-primary);
          color: #fff;
          text-align: center;
          font-size: 12px;
          line-height: 1.5;
          min-width: 20px;
          min-height: 20px;
        }
      }
      .drop-down-list{
        height: 50px;
        box-sizing: border-box;
        padding: 10px 0;
        line-height: 30px;
        .user-name {
          color: #758eb5;
          padding: 0 4px;
        }
        .arrow-icon{
          font-size: 14px;
        }
      }
      &.user-msg {
        .iconfont {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .user-name {
          color: #758eb5;
          padding: 0 4px;
        }
      }
      .iconfont {
        position: relative;
        font-size: 24px;
        color: #758eb5;
      }
    }
  }
}
.nav-top-breadcrumb{
  line-height: 50px;
}
.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.6s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
