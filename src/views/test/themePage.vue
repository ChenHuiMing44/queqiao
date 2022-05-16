<template>
  <div class="page-container">
    <fb-table-header :btn-list="['create', 'edit']" @handleEvent="handleEvent"/>
    <card>
      <div class="content">
        <fb-table :columns="columns" :list="list" :operates="operates" operates-width="280"/>
        <fb-table-pagination :total="state.total" v-model:page="state.page" v-model:size="state.size"/>
      </div>
    </card>
  </div>
</template>

<script setup>
import Card from '@/components/card/card'
import FbTableHeader from '@/components/fbTable/fbTableHeader'
import FbTable from '@/components/fbTable/fbTable'
import FbTablePagination from '@/components/fbTable/fbTablePagination'
import { reactive } from 'vue'
const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'orgName', label: '机构名' },
  { prop: 'role', label: '岗位' },
  { prop: 'key1', label: '字段1' },
  { prop: 'key2', label: '字段2' },
  { prop: 'key3', label: '字段3' },
  { prop: 'key4', label: '字段4' },
  { prop: 'key5', label: '字段5' },
  { prop: 'key6', label: '字段6' }
]
const list1 = [
  { name: '张三', age: 30, orgName: '工商局', role: '副局长', key1: '111', key2: '3333333', key3: '555555', key4: '111', key5: '111', key6: '111' },
  { name: '张三', age: 30, orgName: '工商局', role: '副局长', key1: '111', key2: '111', key3: '111', key4: '111', key5: '111', key6: '111' },
  { name: '张三', age: 30, orgName: '工商局', role: '副局长', key1: '111', key2: '111', key3: '121212', key4: '111', key5: '111', key6: '111' },
  { name: '张三', age: 30, orgName: '工商局', role: '副局长', key1: '111', key2: '111', key3: '121212413', key4: 'wfd', key5: '111', key6: '111' },
  { name: '张三', age: 30, orgName: '工商局', role: '副局长', key1: '111', key2: '111', key3: '111', key4: 'dfvfdv', key5: '111', key6: '111' },
  { name: '张三', age: 30, orgName: '工商局', role: '副局长', key1: '111', key2: '111', key3: '111', key4: 'efe', key5: '111', key6: '111' }
]

const operates = (row) => {
  return ['detail', 'edit', 'create', 'delete']
}

const list = list1.concat(list1)
const state = reactive({
  page: 1,
  size: 10,
  total: 104
})
const handleEvent = (key) => {
  console.log('handleEvent: ', key)
}
const tapOperates = (key, row) => {
  console.log('handleOperate', row, key)
}
</script>

<style scoped lang="scss">
.content{
  min-height: 300px;
}
</style>
