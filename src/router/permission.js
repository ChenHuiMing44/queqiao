import router from '@/router'
import NProgress from 'nprogress' // progress bar
import { userState } from '@/composition/useUserStatus'
import { getRoutesTree, filterAsyncRouter } from '@/utils/routerUtils'
import { menusState } from '@/composition/useMenus'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
    NProgress.done()
  } else if (userState.login) {
    if (!userState.userInfoStatus) {
      userState.genUserInfo().then(routes => {
        const query = to.query
        const routerTree = getRoutesTree(filterAsyncRouter(routes))
        router.addRoute(routerTree)
        next({ path: to.path, replace: true, query: query })
      }).catch(err => {
        userState.userLogout()
        console.error(err)
        next({ path: '/login' })
      })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from, next) => {
  NProgress.done()
  try {
    // 设置标题
    if (to.meta.name) {
      document.title = to.meta.name
    }
  } catch (err) {}
  const routerList = to.matched
  menusState.setCrumbList(routerList)
  if (to.meta && to.meta.activeForbid) {
    const target = routerList.length > 1 ? routerList[routerList.length - 2] : ''
    menusState.setCurrentMenu(target?.name)
  } else {
    menusState.setCurrentMenu(to.name)
  }
})
