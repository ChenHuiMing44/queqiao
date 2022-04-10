import routes from '@/router/routes'
import EmptyView from '@/layout/emptyView'
import Layout from '@/layout/layout'

const layouts = {
  Layout: Layout,
  Empty: EmptyView
}
/**
 * @author: hm, 2022/4/6
 * des: 将后端返回的格式设置前端需要的
 */
export const setSourceRouter = (routes, root) => {
  const list = routes.map(route => {
    const children = route.children && route.children.length ? setSourceRouter(route.children) : undefined
    return {
      name: route.key,
      path: route.path,
      redirect: route.redirect,
      component: route.component,
      meta: {
        name: route.name,
        title: route.title,
        path: route.path,
        key: route.key
      },
      children: children
    }
  })
  !root && list.length === 1 && list.forEach(item => {
    item.meta = item.meta || {}
    item.meta.activeForbid = true
  })
  return list
}

export const setMenuRoutes = (routes) => {
  const list = []
  routes.forEach((route) => {
    if (!route.hidden) {
      const children = route.children && route.children.length ? setMenuRoutes(route.children) : undefined
      list.push({
        ...route,
        children: children
      })
    }
  })
  return list
}

/**
 * @author: hm, 2022/4/6
 * des: 递归处理后端数据
 */
export const filterAsyncRouter = (asyncRouterMap) => {
  return asyncRouterMap.filter((route) => {
    // 去除以 /开头的错误路径
    route.path = route.path.replace(/^\//, '')
    if (route.layout) {
      route.component = layouts[route.layout] || Layout
    } else {
      route.component = routes[route.key]?.component || EmptyView
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const getRoutesTree = (routes) => {
  const children = setSourceRouter(routes, true)
  setDefaultRoute(children)
  const treeRoot = {
    name: 'Root',
    path: '/',
    component: EmptyView,
    children: children
  }
  return treeRoot
}

export const setDefaultRoute = (routes) => {
  routes.filter(v => !v.hidden).forEach((v, i) => {
    if (v.children && v.children.length > 0) {
      v.redirect = { name: v.children[0].name }
      setDefaultRoute(v.children)
    }
  })
}
