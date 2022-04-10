<template>
  <div :class="{ hidden: hidden || !total }" class="pagination-container">
    <el-pagination
      :class="align"
      v-model:current-page="currentPage"
      v-model:page-size="currentPageSize"
      :total="total"
      :page-sizes="pageSizes"
      :layout="layout"
      :small="small"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'fbTablePagination',
  props: {
    total: { required: true, type: Number },
    page: { type: Number, default: 1 },
    size: { type: Number, default: 10 },
    pageSizes: { type: Array, default: () => [5, 10, 20, 50, 100, 200] },
    layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
    hidden: { type: Boolean, default: false },
    small: { type: Boolean },
    align: { type: String, default: 'right' }
  },
  emits: ['update:page', 'update:size', 'pageChange'],
  computed: {
    currentPage: {
      get () { return this.page },
      set (val) { this.$emit('update:page', val) }
    },
    currentPageSize: {
      get () { return this.size },
      set (val) { this.$emit('update:size', val) }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.currentPageSize = val
      this.$nextTick(() => {
        this.$emit('pageChange', { page: this.currentPage, size: val })
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.$nextTick(() => {
        this.$emit('pageChange', { page: val, size: this.currentPageSize })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.pagination-container {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 24px;
  .center {
    justify-content: center;
  }
  .right {
    justify-content: flex-end;
  }
}
.pagination-container.hidden {
  display: none;
}
</style>
