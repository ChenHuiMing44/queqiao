<template>
  <div class="--card-table-header">
    <div class="header-left">
      <template v-for="btn in btnEventList" :key="btn.key">
        <el-button  type="primary"  @click="handleEvent(btn)">{{btn.text}}</el-button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { TableEventBtnEnum } from '@/composition/useTableEvent'

const emit = defineEmits(['handleRefresh', 'handleToggleHeader', 'handleEvent'])
const props = defineProps({
  title: String,
  des: String,
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

const handleEvent = (event) => {
  console.log(1111, event)
  emit('handleEvent', event.key)
}

</script>

<style scoped lang="scss">
.--card-table-header{
  padding: 16px 24px 24px;
}
</style>
