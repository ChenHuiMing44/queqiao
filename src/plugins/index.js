import elementPlugin from "@/plugins/element"

import router from '@/router'
import '@/router/permission'


import './style'


export default {
  install (app) {
    app.use(router).use(elementPlugin)
  }
}
