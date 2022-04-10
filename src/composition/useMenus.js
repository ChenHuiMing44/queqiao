import StateSubscribe from '@/composition/StateSubscribe'
import { onUnmounted, reactive } from 'vue'
import { setMenuRoutes } from '@/utils/routerUtils'

// 因为我们并不需要两个menu 故而menu 也是同一套
class MenusState extends StateSubscribe {
  menus = []
  sidebarCollapse = false
  currentMenu = ''
  crumbList = []
  addMenus (menus) {
    this.menus.push(...setMenuRoutes(menus))
    super.update()
  }

  setCurrentMenu (currentMenu) {
    this.currentMenu = currentMenu
    super.update()
  }

  setCrumbList (crumbList) {
    this.crumbList = crumbList
    super.update()
  }

  toggleCollapse () {
    this.sidebarCollapse = !this.sidebarCollapse
    this.update()
  }

  closeCollapse () {
    !this.sidebarCollapse && this.toggleCollapse()
  }

  openCollapse () {
    this.sidebarCollapse && this.toggleCollapse()
  }
}

export const menusState = new MenusState()

export default function useMenus () {
  const state = reactive({
    crumbList: menusState.crumbList,
    menus: menusState.menus,
    sidebarCollapse: menusState.sidebarCollapse,
    currentMenu: menusState.currentMenu
  })
  const toggleCollapse = () => {
    menusState.toggleCollapse()
  }
  const closeCollapse = () => {
    menusState.closeCollapse()
  }
  const openCollapse = () => {
    menusState.openCollapse()
  }
  const addMenus = (menus) => {
    menusState.addMenus(menus)
  }

  const setCurrentMenu = (currentMenu) => {
    menusState.setCurrentMenu(currentMenu)
  }

  const handleChange = () => {
    state.crumbList = menusState.crumbList
    state.menus = menusState.menus
    state.sidebarCollapse = menusState.sidebarCollapse
    state.currentMenu = menusState.currentMenu
  }
  menusState.subscribe(handleChange)

  onUnmounted(() => {
    menusState.unSubscribe(handleChange)
  })

  return { state, toggleCollapse, openCollapse, closeCollapse, setCurrentMenu, addMenus }
}
