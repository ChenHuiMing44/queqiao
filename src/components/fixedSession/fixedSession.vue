
<template>
  <div class="--fixed-session">

    <el-backtop v-if="state.render" :bottom="90" :right="35" target="#root">
      <div class="back-top-box">
        <div class="back-top-content primary-back-light1">
          <i class="iconfont icon-31huidaodingbu"/>
        </div>
        <i class="shadow"/>
      </div>
    </el-backtop>

    <div class="setting-box">
      <el-popover popper-class="setting-color-popover" :visible="state.open" placement="top" width="300" effect="dark">
        <div class="">
          <theme-setting-panel @close="tapSetting"/>
        </div>
        <template #reference>
          <div class="setting-content primary-back-light1" :class="{closed: !state.open}" @click="tapSetting">
            <i v-if="!state.open" class="iconfont icon-shezhi"/>
            <i v-else class="iconfont icon-shanchu1"/>
          </div>
        </template>
      </el-popover>
      <i class="shadow"/>
    </div>

  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import ThemeSettingPanel from '@/components/themeSettingPanel/themeSettingPanel'

const state = reactive({
  open: false,
  render: false,
  showBackTop: false
})

onMounted(() => {
  state.render = true
})

const tapSetting = () => {
  state.open = !state.open
}

</script>

<style scoped lang="scss">
.--fixed-session{
  position: fixed;
  right: 30px;
  bottom: 30px;
  .setting-box{
    height: 36px;
    width: 46px;
    color:#fff;
    text-align: center;
    position: relative;
    font-weight: bold;
    .setting-content{
      position: relative;
      text-align: center;
      z-index: 5;
      padding: 8px 5px 5px;
      box-sizing: border-box;
      height: 36px;
      width: 46px;
      border-radius: 8px 8px 8px 8px;
      cursor: pointer;
      .iconfont{font-size: 18px;}
      &.closed {
        border-radius: 0 8px 8px 8px;
      }
      &:hover {
        background-color: var(--el-color-primary);
      }
      &.closed:hover:before{
        border-color: transparent var(--el-color-primary) transparent  transparent ;
      }
      &.closed:before {
        content: '';
        display: block;
        width: 0;
        height:0;
        border: solid 13px;
        border-top: 24px;
        border-color: transparent var(--el-color-primary-light-1) transparent  transparent ;
        position: absolute;
        top: 0;
        left: -23px;
      }
    }
    .shadow {
      box-shadow: $box-shadow-dark;
      position: absolute;
      left: 23px;
      top: 18px;
    }
  }
  .back-top-box{
    width: 46px;
    height: 46px;
    position: relative;
    .shadow {
      box-shadow: $box-shadow-dark;
      position: absolute;
      left: 23px;
      top: 18px;
    }
  }
  .back-top-content{
    z-index: 2;
    width: 46px;
    height: 46px;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover {
      background-color: var(--el-color-primary);
      outline: 4px solid var(--el-color-primary-light-3);
    }

    .iconfont {
      font-size: 18px;
      font-weight: bold;
      color: var(--el-color-white);
    }
  }
}
</style>
