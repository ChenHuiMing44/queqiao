import { reactive, onUnmounted } from 'vue'
import { themeMix } from '@/utils/theme'
import StateSubscribe from '@/composition/StateSubscribe'
import defaultSidebar from '@/assets/imgs/siderImages/sidebar-1.jpg'

const pre = '--el-color-primary'
// 白色混合色
const mixWhite = '#ffffff'
// 黑色混合色
const mixBlack = '#000000'
// 默认主题
const defaultTheme = '#4ab7bd'

const defaultContent = '#f6f7f8'

const node = document.querySelector(':root')

const primaryThemeStoreKey = 'primaryThemeStoreKey'

const sidebarThemeStoreKey = 'sidebarThemeStoreKey'

const contentBackgroundKey = 'contentBackgroundKey'

class ThemeColor extends StateSubscribe {
  color = localStorage.getItem(primaryThemeStoreKey) || defaultTheme

  sideBack = localStorage.getItem(sidebarThemeStoreKey) || defaultSidebar

  contentBack = localStorage.getItem(contentBackgroundKey) || defaultContent

  constructor () {
    super()
    this.changeTheme()
  }

  /**
   * @author: hm, 2022/4/2
   * des: 修改当前主题颜色
   */
  changeTheme (color = this.color) {
    node.style.setProperty?.(pre, color)

    localStorage?.setItem(primaryThemeStoreKey, color)
    // 这里是覆盖原有颜色的核心代码
    for (let i = 1; i < 10; i += 1) {
      node.style.setProperty(`${pre}-light-${i}`, themeMix(color, mixWhite, i * 0.1))
      node.style.setProperty(`${pre}-dark-${i}`, themeMix(color, mixBlack, i * 0.1))
    }
    node.style.setProperty('--el-color-primary-dark', themeMix(color, mixBlack, 0.1))
    this.color = color
    super.update()
  }

  changeSidebar (img = this.sideBack) {
    localStorage?.setItem(sidebarThemeStoreKey, img)
    this.sideBack = img
    super.update()
  }

  changeContentBack (color = this.contentBack) {
    localStorage?.setItem(contentBackgroundKey, color)
    this.contentBack = color
    super.update()
  }

  /**
   * @author: hm, 2022/4/2
   * des: 重置为默认颜色
   */
  resetTheme () {
    localStorage.removeItem(primaryThemeStoreKey)

    localStorage.removeItem(sidebarThemeStoreKey)

    node.style.cssText = ''

    this.color = defaultTheme

    super.update()
  }
}

const themeColor = new ThemeColor()

export default function useTheme () {
  const state = reactive({
    contentBack: themeColor.contentBack,
    color: themeColor.color,
    sidebar: themeColor.sideBack
  })

  const changeTheme = (color) => {
    themeColor.changeTheme(color)
  }

  const changeSidebar = (img) => {
    themeColor.changeSidebar(img)
  }

  const changeContentBack = (color) => {
    themeColor.changeContentBack(color)
  }

  function handleStatusChange () {
    state.color = themeColor.color
    state.sidebar = themeColor.sideBack
    state.contentBack = themeColor.contentBack
  }

  themeColor.subscribe(handleStatusChange)

  onUnmounted(() => {
    themeColor.unSubscribe(handleStatusChange)
  })

  return { state, changeTheme, changeSidebar, changeContentBack }
}
