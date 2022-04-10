import StateSubscribe from '@/composition/StateSubscribe'
import { onUnmounted, reactive } from 'vue'
import { menusState } from '@/composition/useMenus'
import routeMenus from '@/router/routeMenus'

export const tokenKey = 'user_token'

/**
 * @author: hm, 2021/10/27
 * des: 用户状态类 或者对象
 */
class UserState extends StateSubscribe {
  token = '';

  login = false;

  name = 'admin';

  userInfoStatus = false;

  updateTime = Date.now();

  items = ['token', 'login', 'userInfoStatus'];

  constructor () {
    super()
    const token = localStorage.getItem(tokenKey)
    if (token) {
      this.token = token
      this.login = true
    }
  }

  userLogin (token) {
    this.token = token
    this.login = true
    this.update()
  }

  // 权限很关键的一个方法 虽然这里感觉有点奇怪，但是不想用 vuex 付出点代价吧
  async genUserInfo () {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        this.userInfoStatus = true
        resolve(routeMenus)
        menusState.addMenus(routeMenus)
        this.update()
      }, 100)
    })
    return await promise
  }

  userLogout () {
    this.token = ''
    this.login = false
    this.userInfoStatus = false
    this.update()
  }

  setItem (key, value) {
    if (this.items.includes(key)) {
      this[key] = value
    }
  }

  // override
  update () {
    super.update()
    // 更新到 localStorage
    localStorage.setItem(tokenKey, this.token)
  }
}

export const userState = new UserState()

const useUserStatus = () => {
  const state = reactive({
    name: userState.name,
    token: userState.token,
    login: userState.login,
    userInfoStatus: userState.userInfoStatus
  })

  const userLogin = (token) => {
    if (token) {
      userState.userLogin(token)
    }
  }

  const userLogout = () => {
    userState.userLogout()
    // 简单粗暴reload  清空app数据
    location.reload()
  }
  function handleStatusChange () {
    state.name = userState.name
    state.token = userState.token
    state.login = userState.login
    state.userInfoStatus = userState.userInfoStatus
  }

  userState.subscribe(handleStatusChange)

  onUnmounted(() => {
    userState.unSubscribe(handleStatusChange)
  })

  return { state, userLogin, userLogout }
}

export default useUserStatus
