<template>
  <div className="page-container">
    <fb-table-header @handleEvent="handleEvent" @handleRefresh="pagination.load"/>
    <card>
      <div className="content">
        <fb-table
          is-serial
          :columns="columns"
          :list="pagination.state.list"
          :operates="operates" operates-width="200"
          @handleOperate="handleTableOperate"
        >
          <template v-slot:on="{cell}">
            <el-tag :type="cell ? 'success': 'error'">{{cell ? '开启': '关闭'}}</el-tag>
          </template>
        </fb-table>
      </div>
    </card>
  </div>
</template>

<script>
import ApiSource from '@/api/source'
import usePagination from '@/composition/usePagination'
import FbTableHeader from '@/components/fbTable/fbTableHeader'
import FbTable from '@/components/fbTable/fbTable'
import { useRouter } from 'vue-router'

const columns = [
  { prop: 'name', label: '项目名' },
  { prop: 'filename', label: '入口文件' },
  { prop: 'remotes', label: '依赖项目', render: (val) => val ? val.join('、') : '-' },
  { prop: 'port', label: '启用端口' },
  { prop: 'on', label: '启动状况', slot: true },
  { prop: 'url', label: '项目地址' },
  { prop: 'exposesNum', label: '分享个数' }
]
const operates = ['detail', 'on', 'off']

export default {
  name: 'sourceList',
  components: { FbTable, FbTableHeader },
  setup () {
    const router = useRouter()
    const pagination = usePagination(ApiSource.sourceList)
    const handleTableOperate = (key, row) => {
      if (key === 'detail') {
        router.push({ name: 'SourceDetail', query: { name: row.name } })
      }
    }
    return { pagination, columns, operates, handleTableOperate }
  }
}
</script>

<style scoped>

</style>
