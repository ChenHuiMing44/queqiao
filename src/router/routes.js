import resolveModules from './resolveModule'

/**
 * @author: hm, 2022/4/6
 * des: 首页模块
 */
const homeRoutes = resolveModules(require.context('@/views/home', false, /.vue$/, 'lazy-once'), '/home')
/**
 * @author: hm, 2022/4/6
 * des: 登录模块
 */
const loginRoutes = resolveModules(require.context('@/views/login', false, /.vue$/, 'lazy-once'), '/login')
/**
 * @author: hm, 4/16/21
 * des: 测试模块
 */
// 这个地方为lazy 则 每个文件单独打一个包
const testRoutes = resolveModules(require.context('@/views/test', false, /.vue$/, 'lazy-once'), '/test')

const test1Routes = resolveModules(require.context('@/views/test1', false, /.vue$/, 'lazy-once'), '/test1')

console.log(testRoutes, test1Routes)

// const routes = [...testRoutes]

// if (!Env.pro) {
//   routes.push(...testRoutes)
// }

export default Object.assign(homeRoutes, test1Routes, testRoutes, loginRoutes)
