/**
 * @author: hm,
 * des: 这个类本身没什么大用，用于作为基类
 */
class StateSubscribe {
  subscribeSet = new Set();

  update () {
    this.subscribeSet.forEach((fn) => {
      fn()
    })
  }

  subscribe (handle) {
    this.subscribeSet.add(handle)
  }

  unSubscribe (handle) {
    if (this.subscribeSet.has(handle)) {
      this.subscribeSet.delete(handle)
    }
  }
}

export default StateSubscribe
