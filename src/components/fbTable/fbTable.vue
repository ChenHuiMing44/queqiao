<template>
  <div class="--fb-table-container">
    <el-table
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @select="handleSelectSingleRow"
      @select-all="selectAll"
      ref="tableRef"
      :data="list"
      :size="tableSize"
      class="--fb-table"
      :row-key="rowKey"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
    >
      <el-table-column fixed type="selection" width="50" v-if="selection" />
      <el-table-column fixed width="80" :align="align" :label="serialLabel" v-if="isSerial">
        <template v-slot="scope">{{ (page - 1) * size + scope.$index + 1 }}</template>
      </el-table-column>
      <template v-for="(column, index) in columns" :key="index">
        <el-table-column
          v-if="column.render || column.slot"
          :fixed="column.fixed"
          :label="column.label"
          :class-name="targetValue(column.className)"
          :min-width="column.width || '120px'"
          :prop="column.prop"
          :align="align"
        >
          <template v-slot="scope">
            <!-- slot column -->
            <template v-if="column.slot">
              <slot
                :name="column.prop"
                :row="scope.row"
                :column="scope.column"
                :cell="getTargetVal(scope.row, column)"
                :index="scope.$index"
              ></slot>
            </template>
            <!--  render -->
            <template v-else>
              {{ column.render(getTargetVal(scope.row, column), scope.row, scope.$index) }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :fixed="column.fixed"
          :label="column.label"
          :class-name="targetValue(column.className)"
          :min-width="column.width || '120px'"
          :prop="column.prop"
          :align="align"
        >
          <template v-slot="scope">{{ getTargetVal(scope.row, column) }}</template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup>
import { defineProps, defineExpose, defineEmits, ref, computed } from 'vue'

const emit = defineEmits(['selection-change', 'select-all', 'selection-single'])

const props = defineProps({
  // 1.label require  2.key require 3.render 规则
  // 4.fixed  5.className 6.export=true 7.exportRule 8.width 9.prop
  columns: { type: Array, required: true },
  list: { type: Array, required: true },
  align: { type: String, default: 'center' },
  tableSize: { type: String, default: 'middle' },
  loading: Boolean,
  serialLabel: { type: String, default: '序号' },
  isSerial: Boolean,
  size: { type: Number, default: 10 },
  page: { type: Number, default: 1 },
  rowKey: { type: String, default: 'id' },
  selection: Boolean,

  headerToggle: Boolean,
  headerBtns: { type: Array, default: () => [] }
})

const tableRef = ref(null)

const cellStyle = computed(() => {
  if (props.tableSize === 'large') {
    return { minHeight: '65px' }
  }
  return { minHeight: '58px', width: '0' }
})
const headerCellStyle = {
  color: '#abb0ba'
}

const targetValue = (originValue, ...params) => {
  if (typeof originValue === 'function') {
    return originValue(...params)
  }
  return originValue
}
const handleSelectionChange = (section) => {
  emit('selection-change', section)
}
const selectAll = (section) => {
  emit('select-all', section)
}
const handleSelectSingleRow = (section, row) => {
  emit('selection-single', section, row)
}
// 提供给外部使用的方法
const toggleRowSelection = (row, select = true) => {
  tableRef.value?.toggleRowSelection(row, select)
}
const getTargetVal = (row, rule) => {
  if (!rule.path) {
    return row[rule.prop]
  }
  const paths = rule.path.split('.')
  let process = row
  paths.forEach((key) => {
    if (!process) {
      return
    }
    process = process[key]
  })
  return process
}

defineExpose({
  toggleRowSelection
})

</script>

<style scoped lang="scss">
.--fb-table{
  font-weight: bold;
  color: var(--el-color-info-dark-2);
  font-size: 13px;
}
</style>
