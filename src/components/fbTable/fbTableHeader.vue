<template>
  <div class="--table-header">
    <div class="header-left">
      <template v-for="(btn, index) in btnEventList" :key="btn.key">
        <el-button :type="btnThemeList[index]" plain class="middle-small" @click="handleEvent(btn)" >
          <template #icon><i class="iconfont" :class="btn.icon"/></template>
          {{btn.text}}
        </el-button>
      </template>
    </div>
    <div class="header-right">
      <el-button :icon="Search" circle @click="handleToggleHeader" />
      <el-button type="primary" plain :icon="RefreshLeft" circle @click="handleRefresh"/>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { RefreshLeft, Search } from '@element-plus/icons-vue'
import { TableEventBtnEnum } from '@/components/fbTable/tableEnums'

const btnThemeList = [
  'primary',
  'success',
  'warning',
  'dander',
  'error',
  'info',
  ''
]

const emit = defineEmits(['handleRefresh', 'handleToggleHeader', 'handleEvent'])
const props = defineProps({
  headerToggle: Boolean, // 是否显示隐藏表格这个按钮
  btnList: { type: Array, default: () => [] }
})
const btnEventList = computed(() => {
  const list = []
  props.btnList.forEach(btn => {
    if (typeof btn === 'string') {
      const btnInfo = TableEventBtnEnum[btn] || ''
      btnInfo && list.push({ ...btnInfo })
    } else if (btn && btn.key) {
      const btnInfo = TableEventBtnEnum[btn.key]
      list.push(Object.assign({}, btnInfo, btn))
    }
  })
  return list
})
const handleRefresh = () => {
  emit('handleRefresh')
}

const handleToggleHeader = () => {
  if (props.headerToggle) {
    emit('handleToggleHeader')
  }
}

const handleEvent = (event) => {
  emit('handleEvent', event.key)
}

</script>

<style scoped lang="scss">
.--table-header{
  padding: 0 24px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
