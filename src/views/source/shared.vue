<template>
  <div class="page-container">
    <fb-table-header @handleEvent="handleEvent" @handleRefresh="pagination.load"/>
    <card>
      <div class="content">
        <fb-table is-serial :columns="columns" :list="pagination.state.list" :operates="operates" operates-width="100"/>
      </div>
    </card>
  </div>
</template>

<script>
import ApiSource from '@/api/source'
import usePagination from '@/composition/usePagination'
import FbTableHeader from '@/components/fbTable/fbTableHeader'
import FbTable from '@/components/fbTable/fbTable'

const columns = [
  { prop: 'name', label: '分享模块名' }
]
const operates = ['detail']

export default {
  name: 'shard',
  components: { FbTable, FbTableHeader },
  setup () {
    const pagination = usePagination(ApiSource.shardList)

    return { pagination, columns, operates }
  }
}
</script>

<style scoped>

</style>
