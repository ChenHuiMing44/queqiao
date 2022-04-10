<template>
  <div class="--row-operates">
    <template v-for="btn in btnOperateList" :key="btn.key">
      <el-button type="text" :class="btn.theme" @click="handleOperate(btn)" >
        <template #icon><i class="iconfont" :class="btn.icon"/></template>
        {{btn.text}}
      </el-button>
    </template>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import { TableOperateBtnEnum } from '@/components/fbTable/tableEnums'

const emit = defineEmits(['handleOperate'])
const props = defineProps({
  btnList: { type: Array, default: () => [] }
})
const btnOperateList = computed(() => {
  const list = []
  props.btnList.forEach(btn => {
    if (typeof btn === 'string') {
      const btnInfo = TableOperateBtnEnum[btn] || ''
      btnInfo && list.push({ ...btnInfo })
    } else if (btn && btn.key) {
      const btnInfo = TableOperateBtnEnum[btn.key]
      list.push(Object.assign({}, btnInfo, btn))
    }
  })
  return list
})
const handleOperate = (btn) => {
  emit('handleOperate', event.key)
}
</script>

<style scoped lang="scss">

</style>
