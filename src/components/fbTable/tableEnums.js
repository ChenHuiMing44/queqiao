
/**
 * @author: hm, 2022/4/7
 * des: 表格上面枚举
 */
export const TableEventBtnEnum = {
  create: { key: 'create', text: '新增', icon: 'icon-tianjia', theme: 'primary' },
  download: { key: 'download', text: '下载模板', icon: 'icon-xiazai', theme: 'success' },
  export: { key: 'export', text: '导出', icon: 'icon-daochu', theme: 'warning' },
  expendToggle: { key: 'expendToggle', text: '展开搜索', icon: 'icon-CZ_016', theme: 'danger' },
  edit: { key: 'edit', text: '编辑', icon: 'icon-edit', theme: 'error' },
  delete: { key: 'delete', text: '删除', icon: 'icon-remove', theme: 'info' }
}

export const TableEventBtnList = Object.values(TableEventBtnEnum)

/**
 * @author: hm, 2022/4/8
 * des: 左侧按钮列表
 */
export const TableOperateBtnEnum = {
  detail: { key: 'detail', text: '详情', icon: 'icon-chakan' },
  create: { key: 'create', text: '新增', icon: 'icon-tianjia' },
  download: { key: 'download', text: '下载模板', icon: 'icon-xiazai' },
  export: { key: 'export', text: '导出', icon: 'icon-daochu' },
  edit: { key: 'edit', text: '编辑', icon: 'icon-edit' },
  delete: { key: 'delete', text: '删除', icon: 'icon-remove', theme: 'danger' },
  upload: { key: 'upload', text: '上传', icon: 'icon-31huidaodingbu' },
  on: { key: 'on', text: '上线', icon: 'icon-31huidaodingbu' },
  off: { key: 'off', text: '下线', icon: 'icon-remove' }

}

export const TableOperateBtnList = Object.values(TableOperateBtnEnum)
