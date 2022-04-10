import path from 'path-browserify'

function doLowerLine (val, index) {
  if (/[A-Z]/.test(val)) {
    if (index === 0) {
      return val.toLowerCase()
    }
    return '-' + val.toLowerCase()
  }
  return val
}

// 驼峰转下划线
function toLowerLine (arr) {
  if (typeof arr === 'string') {
    return [].map.call(arr, doLowerLine).join('')
  }
  return arr.map(doLowerLine).join('')
}

// 得到 页面的name 方式是 / 去掉，如 /test/menuDetail 得到  TestMenuDetail
const replaceUnderLine = val => {
  const arr = val.split('')
  let index = arr.indexOf('/')
  while (index !== -1) {
    arr.splice(index, 2, arr[index + 1].toUpperCase())
    index = arr.indexOf('/')
  }
  val = arr.join('')
  return val
}

export default (menuList, modulePath) => {
  const map = {}
  menuList.keys().forEach(key => {
    console.log(key)
    const filePath = path.join(modulePath, key).replace('.vue', '')
    const pagePath = path.join('./', key).replace('.vue', '')
    const routeName = replaceUnderLine(filePath).replace(/\/index\.vue$/, '')
    map[routeName] = { name: routeName, path: pagePath, component: () => menuList(key) }
  })
  return map
}
