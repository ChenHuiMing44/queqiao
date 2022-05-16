import { onBeforeMount, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const pageSizeList = [5, 10, 20, 50, 100]
const defaultSize = 10
const minRefreshing = 1500
/**
 * @author: hm, 2022/1/25
 * des: query 是请求 fn 返回的必须是  {total: number, result: []}
 */
export default (queryFn, options = {}) => {
  if (typeof queryFn !== 'function') {
    throw new Error('useFreshList must has params 0 with promise function')
  }
  const queryPromiseFn = ref(queryFn)
  // 这几个可以直接在 options 里面设置，属性名 不带 query的
  const queryGetParams = ref(options.getParams || {})
  const queryBeforeHook = ref(options.beforeHook || null)
  const querySuccessHook = ref(options.successHook || null)
  const queryErrorHook = ref(options.errorHook || null)

  const state = reactive({
    loading: false,
    refreshing: false,
    finished: false,
    empty: false,
    error: false,
    list: [],
    pageSizeList,
    total: 0,
    page: 1,
    size: options.size || defaultSize,
    immediately: options.immediately === undefined ? true : !!options.immediately
  })

  // 设置 options
  const setParamsCallback = (fn) => {
    if (typeof fn === 'function' || Object.prototype.toString.call(fn) === '[Object Object]') {
      queryGetParams.value = fn
    }
  }
  const setBeforeHook = (fn) => {
    if (typeof fn === 'function') {
      queryBeforeHook.value = fn
    }
  }

  const setSuccessHook = (fn) => {
    if (typeof fn === 'function') {
      querySuccessHook.value = fn
    }
  }
  const setErrorHook = (fn) => {
    if (typeof fn === 'function') {
      queryErrorHook.value = fn
    }
  }

  const getQueryParams = async () => {
    const pageSize = { page: state.page, size: state.size }

    if (typeof queryGetParams.value === 'function') {
      const paramsObj = await queryGetParams.value(pageSize)
      return { ...pageSize, ...paramsObj }
    }
    return { ...pageSize, ...queryGetParams.value }
  }

  const query = (reset) => {
    if (state.refreshing) {
      state.page = 1
    }
    const timeStart = Date.now()
    const params = getQueryParams()
    if (typeof queryBeforeHook.value === 'function') {
      queryBeforeHook.value(...params)
    }
    queryPromiseFn.value(params).then(res => {
      const list = res.result || []
      const total = +res.total || 0
      state.total = total
      state.list = list
      if (state.list * state.page >= total) {
        state.finished = true
      } else {
        state.finished = false
        state.page++
      }
      state.empty = state.list.length === 0
      state.error = false
      const requestDuration = Date.now() - timeStart
      if (state.refreshing && requestDuration < minRefreshing) {
        setTimeout(() => {
          state.refreshing = false
        }, minRefreshing - requestDuration)
      } else {
        state.refreshing = false
      }
      state.loading = false
      if (typeof querySuccessHook.value === 'function') {
        querySuccessHook.value(res)
      }
    }).catch(err => {
      err?.errMsg && ElMessage.error(err.errMsg)
      state.error = true
      state.loading = false
      state.refreshing = false
      if (typeof queryErrorHook.value === 'function') {
        queryErrorHook.value(err)
      }
    })
  }

  onBeforeMount(() => {
    if (state.immediately) {
      query(true)
    }
  })

  // 刷新页面用的
  const load = () => {
    state.loading = true
    query()
  }

  const queryRefresh = () => {
    state.refreshing = true
    state.loading = true
    query(true)
  }

  return {
    state,
    setParamsCallback,
    setBeforeHook,
    setSuccessHook,
    setErrorHook,
    queryRefresh,
    load
  }
}
