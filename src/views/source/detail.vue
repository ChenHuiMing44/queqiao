<template>
  <div class="app-container">
    <el-descriptions title="资源详情" size="large"  border>
      <template #extra>
        <el-button type="default" @click="tapBack">返回</el-button>
      </template>
      <el-descriptions-item label="项目名">{{detail.name}}</el-descriptions-item>
      <el-descriptions-item label="入口文件">{{detail.filename}}</el-descriptions-item>
      <el-descriptions-item label="启用端口">{{detail.port}}</el-descriptions-item>
      <el-descriptions-item label="是否开启">
        <el-tag :type="detail.on ? 'success':'error'">{{detail.on ? '是':'否'}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="项目地址">
        <el-link :href="detail.url">{{detail.url}}</el-link>
      </el-descriptions-item>
      <el-descriptions-item label="依赖项目">
        {{detail.remotes?detail.remotes.join('、'):'-'}}
      </el-descriptions-item>
    </el-descriptions>
    <div style="margin-top: 30px"/>
    <h4>分享模块</h4>
    <fb-table
      is-serial
      :columns="columns"
      :list="detail.exposes" :operates="operates" operates-width="100" @handleOperate="handleTableOperate">
      <template v-slot:code="{cell}">
        <div class="text-overflow3">{{cell}}</div>
      </template>
    </fb-table>
    <el-dialog title="代码详情" v-model="dialogVisible">
      <div class="code_out">
        <div class="code_in">&nbsp;代码</div>
        <div class="code_center">{{currentCode}}<br />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import ApiSource from '@/api/source'
import { onBeforeMount, ref } from 'vue'
import FbTable from '@/components/fbTable/fbTable'
import { useRoute, useRouter } from 'vue-router'
const operates = [{ key: 'detail', text: '查看代码', icon: 'icon-chakan' }]

const columns = [
  { prop: 'name', label: '模块名' },
  { prop: 'note', label: '备注' },
  { prop: 'path', label: '地址', with: 220 },
  { prop: 'code', label: '代码', width: 240, slot: true }
]

export default {
  name: 'detail',
  components: { FbTable },
  setup (props, { root }) {
    const route = useRoute()
    const router = useRouter()
    const dialogVisible = ref(false)
    const detail = ref({})
    const currentCode = ref('')
    const projectName = route.query.name

    onBeforeMount(() => {
      ApiSource.sourceDetail({ projectName }).then(res => {
        detail.value = res || {}
      })
    })
    const tapBack = () => {
      router.back()
    }
    const handleTableOperate = (key, row) => {
      console.log(row, key)
      dialogVisible.value = true
      currentCode.value = row.code
    }
    return { columns, operates, detail, tapBack, dialogVisible, currentCode, handleTableOperate }
  }
}
</script>

<style scoped lang="scss">
.code_out {
  border-style: dotted dotted dotted solid;
  border-color: rgb(120, 0, 0);
  border-width: 1px 1px 1px 4px;
  background: rgb(250, 252, 254) none repeat scroll 0% 0%;
  background-clip: initial;
  background-origin: initial;
}
.code_in {
  padding: 3px;
  background: rgb(253, 237, 237) none repeat scroll 0% 0%;
  background-clip: initial;
  background-origin: initial;
  font-weight: bold;

}
.code_center{
  color: #fff;
  background-color: black;
  padding: 6px;
  font-size: 16px;
  white-space: pre-wrap;
}
</style>
