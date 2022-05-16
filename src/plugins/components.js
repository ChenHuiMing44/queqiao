
/**
 * @author: hm, 2022/4/12
 * des: 添加一些全局组件
 */

const VSlot = {
  functional: true,
  render: (h, ctx) => ctx.props.vnodes
}

export default {
  install (app) {
    app.component('VSlot', VSlot)
  }
}
