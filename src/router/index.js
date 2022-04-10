import { createRouter, createWebHistory } from 'vue-router'
import routes from './staticRoutes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, form, next) => {
  // todo 增加拿取用户数据逻辑
  next()
})

export default router
